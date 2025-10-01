// Smart Contract Configuration for ChainJump Gaming
// Contract deployed on Base Sepolia testnet

import { Address } from 'viem';
import contractData from '../lib/contract';
import { ContractConfig } from './types';

/**
 * Contract configuration with address and ABI
 */
export const CONTRACT_CONFIG: ContractConfig = {
  address: contractData.contractAddress as Address,
  abi: contractData.abi,
};

/**
 * Contract function names for easy reference
 */
export const CONTRACT_FUNCTIONS = {
  // Read functions
  READ: {
    GET_MY_SCORE: 'getMyScore',
    GET_SCORE: 'getScore',
    GET_TOP_SCORES: 'getTopScores',
    GET_ALL_SCORES_DESCENDING: 'getAllScoresDescending',
    GET_TOTAL_USERS: 'getTotalUsers',
    GET_USER_RANK: 'getUserRank',
    HAS_SCORE: 'hasScore',
  },
  
  // Write functions
  WRITE: {
    SET_SCORE: 'setScore',
  },
} as const;

/**
 * Contract events for listening to changes
 */
export const CONTRACT_EVENTS = {
  NEW_USER_ADDED: 'NewUserAdded',
  SCORE_UPDATED: 'ScoreUpdated',
} as const;

/**
 * Default hook options
 */
export const DEFAULT_HOOK_OPTIONS = {
  enabled: true,
  refetchInterval: 0, // No auto-refetch by default
  onSuccess: undefined,
  onError: undefined,
};

/**
 * Default leaderboard options
 */
export const DEFAULT_LEADERBOARD_OPTIONS = {
  limit: 10,
  includeRank: true,
  formatScores: true,
};

/**
 * Contract addresses for different networks (if needed)
 */
export const CONTRACT_ADDRESSES = {
  // Contract is deployed on Base Sepolia testnet
  BASE_SEPOLIA: contractData.contractAddress as Address,
  TESTNET: contractData.contractAddress as Address,
  LOCAL: contractData.contractAddress as Address,
} as const;

/**
 * Utility function to get contract config for current network
 */
export function getContractConfig(networkId?: number): ContractConfig {
  // You can add network-specific logic here if needed
  return CONTRACT_CONFIG;
}

/**
 * Validation helpers
 */
export const VALIDATION = {
  MIN_SCORE: 0,
  MAX_SCORE: Number.MAX_SAFE_INTEGER,
  
  isValidScore: (score: number): boolean => {
    return score >= VALIDATION.MIN_SCORE && score <= VALIDATION.MAX_SCORE && Number.isInteger(score);
  },
  
  isValidAddress: (address: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  },
  
  isValidLimit: (limit: number): boolean => {
    return limit > 0 && limit <= 1000 && Number.isInteger(limit);
  },
};

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  INVALID_SCORE: 'Score must be a valid positive integer',
  INVALID_ADDRESS: 'Invalid Ethereum address format',
  INVALID_LIMIT: 'Limit must be a positive integer between 1 and 1000',
  CONTRACT_NOT_CONNECTED: 'Contract not connected',
  WALLET_NOT_CONNECTED: 'Wallet not connected',
  TRANSACTION_FAILED: 'Transaction failed',
  READ_FAILED: 'Failed to read from contract',
  NETWORK_ERROR: 'Network error occurred',
} as const;
