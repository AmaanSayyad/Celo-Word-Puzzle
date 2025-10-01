// Smart Contract Read Hooks for ChainJump Gaming

import { useEffect, useState, useCallback } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { Address } from 'viem';
import { 
  UserScore, 
  FormattedUserScore, 
  UseContractReadResult, 
  HookOptions,
  LeaderboardOptions 
} from './types';
import { 
  CONTRACT_CONFIG, 
  CONTRACT_FUNCTIONS, 
  DEFAULT_HOOK_OPTIONS,
  DEFAULT_LEADERBOARD_OPTIONS,
  VALIDATION,
  ERROR_MESSAGES 
} from './config';

/**
 * Utility function to format user scores
 */
function formatUserScores(scores: UserScore[], includeRank = true): FormattedUserScore[] {
  return scores.map((score, index) => ({
    user: score.user,
    score: Number(score.score),
    ...(includeRank && { rank: index + 1 }),
  }));
}

/**
 * Generic hook for contract read operations
 */
function useContractRead<T>(
  functionName: string,
  args: any[] = [],
  options: HookOptions = {}
): UseContractReadResult<T> {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { enabled = true, refetchInterval, onSuccess, onError } = {
    ...DEFAULT_HOOK_OPTIONS,
    ...options,
  };

  const {
    data: contractData,
    isLoading: contractLoading,
    isError: contractError,
    error: contractErrorData,
    refetch: contractRefetch,
  } = useReadContract({
    address: CONTRACT_CONFIG.address,
    abi: CONTRACT_CONFIG.abi,
    functionName,
    args,
    query: {
      enabled,
      refetchInterval,
    },
  });

  // Debug logging (remove in production)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Contract Read Debug [${functionName}]:`, {
        address: CONTRACT_CONFIG.address,
        functionName,
        args,
        enabled,
        contractData,
        contractLoading,
        contractError,
        contractErrorData: contractErrorData?.message
      });
    }
  }, [functionName, args, enabled, contractData, contractLoading, contractError, contractErrorData]);

  useEffect(() => {
    setIsLoading(contractLoading);
    setIsError(contractError);
    setError(contractErrorData as Error | null);

    if (contractData !== undefined) {
      setData(contractData as T);
      onSuccess?.(contractData);
    }

    if (contractError && onError) {
      onError(contractErrorData as Error);
    }
  }, [contractData, contractLoading, contractError, contractErrorData, onSuccess, onError]);

  const refetch = useCallback(async () => {
    try {
      await contractRefetch();
    } catch (err) {
      setError(err as Error);
      setIsError(true);
    }
  }, [contractRefetch]);

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
}

/**
 * Hook to get the current user's score
 */
export function useMyScore(options: HookOptions = {}): UseContractReadResult<number> {
  const { address } = useAccount();
  
  const result = useContractRead<bigint>(
    CONTRACT_FUNCTIONS.READ.GET_MY_SCORE,
    [],
    {
      ...options,
      enabled: options.enabled !== false && !!address,
    }
  );

  return {
    ...result,
    data: result.data !== undefined ? Number(result.data) : undefined,
  };
}

/**
 * Hook to get a specific user's score
 */
export function useUserScore(
  userAddress: Address | undefined,
  options: HookOptions = {}
): UseContractReadResult<number> {
  const result = useContractRead<bigint>(
    CONTRACT_FUNCTIONS.READ.GET_SCORE,
    userAddress ? [userAddress] : [],
    {
      ...options,
      enabled: options.enabled !== false && !!userAddress && VALIDATION.isValidAddress(userAddress),
    }
  );

  return {
    ...result,
    data: result.data !== undefined ? Number(result.data) : undefined,
  };
}

/**
 * Hook to get top scores with limit
 */
export function useTopScores(
  limit: number = DEFAULT_LEADERBOARD_OPTIONS.limit,
  options: LeaderboardOptions & HookOptions = {}
): UseContractReadResult<FormattedUserScore[]> {
  const { includeRank = true, formatScores = true, ...hookOptions } = options;

  const result = useContractRead<UserScore[]>(
    CONTRACT_FUNCTIONS.READ.GET_TOP_SCORES,
    [BigInt(limit)],
    {
      ...hookOptions,
      enabled: hookOptions.enabled !== false && VALIDATION.isValidLimit(limit),
    }
  );

  return {
    ...result,
    data: result.data && formatScores 
      ? formatUserScores(result.data, includeRank)
      : result.data?.map(score => ({ user: score.user, score: Number(score.score) })),
  };
}

/**
 * Hook to get all scores in descending order
 */
export function useAllScores(
  options: LeaderboardOptions & HookOptions = {}
): UseContractReadResult<FormattedUserScore[]> {
  const { includeRank = true, formatScores = true, ...hookOptions } = options;

  const result = useContractRead<UserScore[]>(
    CONTRACT_FUNCTIONS.READ.GET_ALL_SCORES_DESCENDING,
    [],
    hookOptions
  );

  return {
    ...result,
    data: result.data && formatScores 
      ? formatUserScores(result.data, includeRank)
      : result.data?.map(score => ({ user: score.user, score: Number(score.score) })),
  };
}

/**
 * Hook to get total number of users
 */
export function useTotalUsers(options: HookOptions = {}): UseContractReadResult<number> {
  const result = useContractRead<bigint>(
    CONTRACT_FUNCTIONS.READ.GET_TOTAL_USERS,
    [],
    options
  );

  return {
    ...result,
    data: result.data !== undefined ? Number(result.data) : undefined,
  };
}

/**
 * Hook to get current user's rank
 */
export function useMyRank(options: HookOptions = {}): UseContractReadResult<number> {
  const { address } = useAccount();

  const result = useContractRead<bigint>(
    CONTRACT_FUNCTIONS.READ.GET_USER_RANK,
    address ? [address] : [],
    {
      ...options,
      enabled: options.enabled !== false && !!address,
    }
  );

  return {
    ...result,
    data: result.data !== undefined ? Number(result.data) : undefined,
  };
}

/**
 * Hook to get a specific user's rank
 */
export function useUserRank(
  userAddress: Address | undefined,
  options: HookOptions = {}
): UseContractReadResult<number> {
  const result = useContractRead<bigint>(
    CONTRACT_FUNCTIONS.READ.GET_USER_RANK,
    userAddress ? [userAddress] : [],
    {
      ...options,
      enabled: options.enabled !== false && !!userAddress && VALIDATION.isValidAddress(userAddress),
    }
  );

  return {
    ...result,
    data: result.data !== undefined ? Number(result.data) : undefined,
  };
}

/**
 * Hook to check if current user has a score
 */
export function useHasScore(options: HookOptions = {}): UseContractReadResult<boolean> {
  const { address } = useAccount();

  return useContractRead<boolean>(
    CONTRACT_FUNCTIONS.READ.HAS_SCORE,
    address ? [address] : [],
    {
      ...options,
      enabled: options.enabled !== false && !!address,
    }
  );
}

/**
 * Hook to check if a specific user has a score
 */
export function useUserHasScore(
  userAddress: Address | undefined,
  options: HookOptions = {}
): UseContractReadResult<boolean> {
  return useContractRead<boolean>(
    CONTRACT_FUNCTIONS.READ.HAS_SCORE,
    userAddress ? [userAddress] : [],
    {
      ...options,
      enabled: options.enabled !== false && !!userAddress && VALIDATION.isValidAddress(userAddress),
    }
  );
}

/**
 * Hook to get leaderboard with pagination
 */
export function useLeaderboard(
  page: number = 1,
  limit: number = DEFAULT_LEADERBOARD_OPTIONS.limit,
  options: LeaderboardOptions & HookOptions = {}
): UseContractReadResult<{
  scores: FormattedUserScore[];
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}> {
  const { data: allScores, ...allScoresResult } = useAllScores(options);
  const { data: totalUsers } = useTotalUsers(options);

  const [paginatedData, setPaginatedData] = useState<{
    scores: FormattedUserScore[];
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  } | undefined>(undefined);

  useEffect(() => {
    if (allScores && totalUsers !== undefined) {
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedScores = allScores.slice(startIndex, endIndex);
      const totalPages = Math.ceil(totalUsers / limit);

      setPaginatedData({
        scores: paginatedScores,
        currentPage: page,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      });
    }
  }, [allScores, totalUsers, page, limit]);

  return {
    ...allScoresResult,
    data: paginatedData,
  };
}

/**
 * Hook for combined user stats (score, rank, hasScore)
 */
export function useUserStats(
  userAddress?: Address,
  options: HookOptions = {}
): UseContractReadResult<{
  score: number;
  rank: number;
  hasScore: boolean;
}> {
  const { data: score, isLoading: scoreLoading, error: scoreError } = useUserScore(userAddress, options);
  const { data: rank, isLoading: rankLoading, error: rankError } = useUserRank(userAddress, options);
  const { data: hasScore, isLoading: hasScoreLoading, error: hasScoreError } = useUserHasScore(userAddress, options);

  const [combinedData, setCombinedData] = useState<{
    score: number;
    rank: number;
    hasScore: boolean;
  } | undefined>(undefined);

  const isLoading = scoreLoading || rankLoading || hasScoreLoading;
  const error = scoreError || rankError || hasScoreError;

  useEffect(() => {
    if (score !== undefined && rank !== undefined && hasScore !== undefined) {
      setCombinedData({
        score,
        rank,
        hasScore,
      });
    }
  }, [score, rank, hasScore]);

  const refetch = useCallback(async () => {
    // This would need to be implemented to refetch all three hooks
    // For now, it's a placeholder
  }, []);

  return {
    data: combinedData,
    isLoading,
    isError: !!error,
    error,
    refetch,
  };
}

