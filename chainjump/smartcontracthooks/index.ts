// ChainJump Gaming Smart Contract Hooks
// Main export file for all hooks and utilities

// Types
export type {
  UserScore,
  FormattedUserScore,
  NewUserAddedEvent,
  ScoreUpdatedEvent,
  UseContractReadResult,
  UseContractWriteResult,
  ContractState,
  ContractActions,
  ContractContextValue,
  ContractConfig,
  HookOptions,
  LeaderboardOptions,
} from './types';

// Configuration
export {
  CONTRACT_CONFIG,
  CONTRACT_FUNCTIONS,
  CONTRACT_EVENTS,
  CONTRACT_ADDRESSES,
  DEFAULT_HOOK_OPTIONS,
  DEFAULT_LEADERBOARD_OPTIONS,
  VALIDATION,
  ERROR_MESSAGES,
  getContractConfig,
} from './config';

// Read Hooks
export {
  useMyScore,
  useUserScore,
  useTopScores,
  useAllScores,
  useTotalUsers,
  useMyRank,
  useUserRank,
  useHasScore,
  useUserHasScore,
  useLeaderboard,
  useUserStats,
} from './read-hooks';

// Write Hooks
export {
  useSetScore,
  useSetScoreWithRetry,
  useSetScoreWithValidation,
  useBatchSetScores,
  useSetScoreWithGasEstimation,
} from './write-hooks';

// Context and Providers
export {
  ContractProvider,
  useContract,
  useMyContractData,
  useLeaderboardData,
  useContractStats,
  useUserRanking,
  useContractEvents,
} from './contract-context';

// Re-export default contract context
export { default as ContractContext } from './contract-context';
