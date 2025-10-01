// Smart Contract Types and Interfaces for ChainJump Gaming

import { Address } from 'viem';

/**
 * User Score structure from the smart contract
 */
export interface UserScore {
  user: Address;
  score: bigint;
}

/**
 * User Score with additional formatting for display
 */
export interface FormattedUserScore {
  user: Address;
  score: number;
  rank?: number;
}

/**
 * Contract event types
 */
export interface NewUserAddedEvent {
  user: Address;
  score: bigint;
}

export interface ScoreUpdatedEvent {
  user: Address;
  newScore: bigint;
  oldScore: bigint;
}

/**
 * Hook return types for read operations
 */
export interface UseContractReadResult<T> {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Hook return types for write operations
 */
export interface UseContractWriteResult {
  write: (args?: any[]) => Promise<void>;
  writeAsync: (args?: any[]) => Promise<any>;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
  data: any;
  reset: () => void;
}

/**
 * Contract state interface for React context
 */
export interface ContractState {
  // User data
  myScore: number;
  myRank: number;
  hasScore: boolean;
  
  // Global data
  totalUsers: number;
  topScores: FormattedUserScore[];
  allScores: FormattedUserScore[];
  
  // Loading states
  isLoadingMyScore: boolean;
  isLoadingTopScores: boolean;
  isLoadingAllScores: boolean;
  isLoadingTotalUsers: boolean;
  
  // Error states
  error: Error | null;
  
  // Refresh functions
  refreshMyScore: () => Promise<void>;
  refreshTopScores: () => Promise<void>;
  refreshAllScores: () => Promise<void>;
  refreshTotalUsers: () => Promise<void>;
  refreshAll: () => Promise<void>;
}

/**
 * Contract actions interface
 */
export interface ContractActions {
  setScore: (score: number) => Promise<void>;
  isSettingScore: boolean;
  setScoreError: Error | null;
}

/**
 * Combined contract context interface
 */
export interface ContractContextValue extends ContractState, ContractActions {}

/**
 * Contract configuration
 */
export interface ContractConfig {
  address: Address;
  abi: any[];
}

/**
 * Hook configuration options
 */
export interface HookOptions {
  enabled?: boolean;
  refetchInterval?: number;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

/**
 * Leaderboard options
 */
export interface LeaderboardOptions {
  limit?: number;
  includeRank?: boolean;
  formatScores?: boolean;
}
