// Smart Contract Write Hooks for ChainJump Gaming

import { useState, useCallback } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { parseEventLogs } from 'viem';
import { 
  UseContractWriteResult,
  NewUserAddedEvent,
  ScoreUpdatedEvent 
} from './types';
import { 
  CONTRACT_CONFIG, 
  CONTRACT_FUNCTIONS, 
  CONTRACT_EVENTS,
  VALIDATION,
  ERROR_MESSAGES 
} from './config';

/**
 * Generic hook for contract write operations
 */
function useContractWrite(
  functionName: string,
  onSuccess?: (data: any) => void,
  onError?: (error: Error) => void
): UseContractWriteResult {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);

  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed, error: confirmError } = 
    useWaitForTransactionReceipt({
      hash,
    });

  // Update loading state
  useState(() => {
    setIsLoading(isPending || isConfirming);
  });

  // Handle success
  useState(() => {
    if (isConfirmed) {
      setIsSuccess(true);
      setIsError(false);
      setError(null);
      onSuccess?.(hash);
    }
  });

  // Handle errors
  useState(() => {
    const currentError = writeError || confirmError;
    if (currentError) {
      setIsError(true);
      setIsSuccess(false);
      setError(currentError as Error);
      onError?.(currentError as Error);
    }
  });

  const write = useCallback(async (args: any[] = []) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setError(null);

      await writeContract({
        address: CONTRACT_CONFIG.address,
        abi: CONTRACT_CONFIG.abi,
        functionName,
        args,
      });
    } catch (err) {
      setIsError(true);
      setError(err as Error);
      setIsLoading(false);
      onError?.(err as Error);
    }
  }, [writeContract, functionName, onError]);

  const writeAsync = useCallback(async (args: any[] = []) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setError(null);

      const result = await writeContract({
        address: CONTRACT_CONFIG.address,
        abi: CONTRACT_CONFIG.abi,
        functionName,
        args,
      });

      return result;
    } catch (err) {
      setIsError(true);
      setError(err as Error);
      setIsLoading(false);
      throw err;
    }
  }, [writeContract, functionName]);

  const reset = useCallback(() => {
    setIsLoading(false);
    setIsSuccess(false);
    setIsError(false);
    setError(null);
    setData(null);
  }, []);

  return {
    write,
    writeAsync,
    isLoading,
    isSuccess,
    isError,
    error,
    data: hash,
    reset,
  };
}

/**
 * Hook to set/update user score
 */
export function useSetScore(
  onSuccess?: (data: any, events?: { newUserAdded?: NewUserAddedEvent; scoreUpdated?: ScoreUpdatedEvent }) => void,
  onError?: (error: Error) => void
): UseContractWriteResult & {
  setScore: (score: number) => Promise<void>;
  setScoreAsync: (score: number) => Promise<any>;
} {
  const { address } = useAccount();

  const handleSuccess = useCallback((data: any) => {
    // Parse events from transaction receipt if available
    try {
      // This would need the actual transaction receipt to parse events
      // For now, we'll just call the success callback
      onSuccess?.(data);
    } catch (err) {
      console.warn('Failed to parse transaction events:', err);
      onSuccess?.(data);
    }
  }, [onSuccess]);

  const handleError = useCallback((error: Error) => {
    console.error('Set score transaction failed:', error);
    onError?.(error);
  }, [onError]);

  const contractWrite = useContractWrite(
    CONTRACT_FUNCTIONS.WRITE.SET_SCORE,
    handleSuccess,
    handleError
  );

  const setScore = useCallback(async (score: number) => {
    if (!address) {
      throw new Error(ERROR_MESSAGES.WALLET_NOT_CONNECTED);
    }

    if (!VALIDATION.isValidScore(score)) {
      throw new Error(ERROR_MESSAGES.INVALID_SCORE);
    }

    await contractWrite.write([BigInt(score)]);
  }, [address, contractWrite.write]);

  const setScoreAsync = useCallback(async (score: number) => {
    if (!address) {
      throw new Error(ERROR_MESSAGES.WALLET_NOT_CONNECTED);
    }

    if (!VALIDATION.isValidScore(score)) {
      throw new Error(ERROR_MESSAGES.INVALID_SCORE);
    }

    return await contractWrite.writeAsync([BigInt(score)]);
  }, [address, contractWrite.writeAsync]);

  return {
    ...contractWrite,
    setScore,
    setScoreAsync,
  };
}

/**
 * Hook to set score with automatic retry logic
 */
export function useSetScoreWithRetry(
  maxRetries: number = 3,
  retryDelay: number = 1000,
  onSuccess?: (data: any) => void,
  onError?: (error: Error) => void
): UseContractWriteResult & {
  setScoreWithRetry: (score: number) => Promise<void>;
  retryCount: number;
} {
  const [retryCount, setRetryCount] = useState(0);

  const setScoreHook = useSetScore(onSuccess, onError);

  const setScoreWithRetry = useCallback(async (score: number) => {
    let attempts = 0;
    let lastError: Error | null = null;

    while (attempts < maxRetries) {
      try {
        setRetryCount(attempts + 1);
        await setScoreHook.setScoreAsync(score);
        setRetryCount(0); // Reset on success
        return;
      } catch (error) {
        lastError = error as Error;
        attempts++;
        
        if (attempts < maxRetries) {
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, retryDelay * attempts));
        }
      }
    }

    setRetryCount(0);
    throw lastError || new Error('Max retries exceeded');
  }, [maxRetries, retryDelay, setScoreHook]);

  return {
    ...setScoreHook,
    setScoreWithRetry,
    retryCount,
  };
}

/**
 * Hook to set score with validation and confirmation
 */
export function useSetScoreWithValidation(
  onSuccess?: (data: any, newScore: number, oldScore?: number) => void,
  onError?: (error: Error) => void
): UseContractWriteResult & {
  setValidatedScore: (score: number) => Promise<void>;
  isValidating: boolean;
  validationError: string | null;
} {
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSuccess = useCallback((data: any) => {
    setValidationError(null);
    onSuccess?.(data, 0); // You might want to get the actual new/old scores
  }, [onSuccess]);

  const handleError = useCallback((error: Error) => {
    setValidationError(error.message);
    onError?.(error);
  }, [onError]);

  const setScoreHook = useSetScore(handleSuccess, handleError);

  const setValidatedScore = useCallback(async (score: number) => {
    setIsValidating(true);
    setValidationError(null);

    try {
      // Client-side validation
      if (!VALIDATION.isValidScore(score)) {
        throw new Error(ERROR_MESSAGES.INVALID_SCORE);
      }

      // Additional business logic validation can be added here
      if (score < 0) {
        throw new Error('Score cannot be negative');
      }

      if (score > 1000000) {
        throw new Error('Score seems too high, please verify');
      }

      await setScoreHook.setScoreAsync(score);
    } catch (error) {
      setValidationError((error as Error).message);
      throw error;
    } finally {
      setIsValidating(false);
    }
  }, [setScoreHook]);

  return {
    ...setScoreHook,
    setValidatedScore,
    isValidating: isValidating || setScoreHook.isLoading,
    validationError,
  };
}

/**
 * Hook for batch operations (if you want to set multiple scores)
 * Note: This would require a batch function in your smart contract
 */
export function useBatchSetScores(
  onSuccess?: (data: any) => void,
  onError?: (error: Error) => void
): {
  setBatchScores: (scores: number[]) => Promise<void>;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
  reset: () => void;
} {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const setScoreHook = useSetScore();

  const setBatchScores = useCallback(async (scores: number[]) => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      // Since the contract doesn't have batch functionality,
      // we'll set scores sequentially
      for (const score of scores) {
        await setScoreHook.setScoreAsync(score);
        // Add a small delay between transactions
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      setIsSuccess(true);
      onSuccess?.('Batch operation completed');
    } catch (err) {
      setIsError(true);
      setError(err as Error);
      onError?.(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [setScoreHook, onSuccess, onError]);

  const reset = useCallback(() => {
    setIsLoading(false);
    setIsSuccess(false);
    setIsError(false);
    setError(null);
  }, []);

  return {
    setBatchScores,
    isLoading,
    isSuccess,
    isError,
    error,
    reset,
  };
}

/**
 * Hook to set score with gas estimation
 */
export function useSetScoreWithGasEstimation(
  onSuccess?: (data: any) => void,
  onError?: (error: Error) => void
): UseContractWriteResult & {
  setScoreWithGasEstimation: (score: number) => Promise<void>;
  estimatedGas: bigint | null;
  isEstimatingGas: boolean;
  gasEstimationError: Error | null;
} {
  const [estimatedGas, setEstimatedGas] = useState<bigint | null>(null);
  const [isEstimatingGas, setIsEstimatingGas] = useState(false);
  const [gasEstimationError, setGasEstimationError] = useState<Error | null>(null);

  const setScoreHook = useSetScore(onSuccess, onError);

  const setScoreWithGasEstimation = useCallback(async (score: number) => {
    setIsEstimatingGas(true);
    setGasEstimationError(null);

    try {
      // Gas estimation would be implemented here
      // This is a placeholder as it requires additional setup
      setEstimatedGas(BigInt(21000)); // Placeholder gas estimate

      await setScoreHook.setScoreAsync(score);
    } catch (error) {
      setGasEstimationError(error as Error);
      throw error;
    } finally {
      setIsEstimatingGas(false);
    }
  }, [setScoreHook]);

  return {
    ...setScoreHook,
    setScoreWithGasEstimation,
    estimatedGas,
    isEstimatingGas,
    gasEstimationError,
  };
}
