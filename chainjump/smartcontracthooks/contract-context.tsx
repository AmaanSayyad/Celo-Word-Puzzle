// React Context for Smart Contract State Management

'use client';

import React, { createContext, useContext, useCallback, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { ContractContextValue, FormattedUserScore } from './types';
import { 
  useMyScore, 
  useMyRank, 
  useHasScore, 
  useTotalUsers, 
  useTopScores, 
  useAllScores 
} from './read-hooks';
import { useSetScore } from './write-hooks';
import { DEFAULT_LEADERBOARD_OPTIONS } from './config';

/**
 * Contract Context
 */
const ContractContext = createContext<ContractContextValue | undefined>(undefined);

/**
 * Contract Provider Props
 */
interface ContractProviderProps {
  children: React.ReactNode;
  autoRefresh?: boolean;
  refreshInterval?: number;
  topScoresLimit?: number;
  enableRealTimeUpdates?: boolean;
}

/**
 * Contract Provider Component
 */
export function ContractProvider({ 
  children, 
  autoRefresh = false,
  refreshInterval = 30000, // 30 seconds
  topScoresLimit = DEFAULT_LEADERBOARD_OPTIONS.limit,
  enableRealTimeUpdates = true,
}: ContractProviderProps) {
  const { address, isConnected } = useAccount();
  const [lastUpdateTimestamp, setLastUpdateTimestamp] = useState<number>(Date.now());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Read hooks with auto-refresh options
  const {
    data: myScore = 0,
    isLoading: isLoadingMyScore,
    error: myScoreError,
    refetch: refetchMyScore,
  } = useMyScore({
    enabled: mounted && isConnected,
    refetchInterval: autoRefresh ? refreshInterval : 0,
  });

  const {
    data: myRank = 0,
    isLoading: isLoadingMyRank,
    error: myRankError,
    refetch: refetchMyRank,
  } = useMyRank({
    enabled: mounted && isConnected,
    refetchInterval: autoRefresh ? refreshInterval : 0,
  });

  const {
    data: hasScore = false,
    isLoading: isLoadingHasScore,
    error: hasScoreError,
    refetch: refetchHasScore,
  } = useHasScore({
    enabled: mounted && isConnected,
    refetchInterval: autoRefresh ? refreshInterval : 0,
  });

  const {
    data: totalUsers = 0,
    isLoading: isLoadingTotalUsers,
    error: totalUsersError,
    refetch: refetchTotalUsers,
  } = useTotalUsers({
    refetchInterval: autoRefresh ? refreshInterval : 0,
  });

  const {
    data: topScores = [],
    isLoading: isLoadingTopScores,
    error: topScoresError,
    refetch: refetchTopScores,
  } = useTopScores(topScoresLimit, {
    refetchInterval: autoRefresh ? refreshInterval : 0,
  });

  const {
    data: allScores = [],
    isLoading: isLoadingAllScores,
    error: allScoresError,
    refetch: refetchAllScores,
  } = useAllScores({
    refetchInterval: autoRefresh ? refreshInterval : 0,
  });

  // Write hook
  const {
    setScore,
    isLoading: isSettingScore,
    error: setScoreError,
    isSuccess: setScoreSuccess,
    reset: resetSetScore,
  } = useSetScore(
    () => {
      // On successful score update, refresh all data
      handleRefreshAll();
    },
    (error) => {
      console.error('Failed to set score:', error);
    }
  );

  // Combined error state
  const error = myScoreError || myRankError || hasScoreError || totalUsersError || 
                 topScoresError || allScoresError || setScoreError;

  // Refresh functions
  const refreshMyScore = useCallback(async () => {
    if (mounted && isConnected) {
      await Promise.all([
        refetchMyScore(),
        refetchMyRank(),
        refetchHasScore(),
      ]);
    }
  }, [mounted, isConnected, refetchMyScore, refetchMyRank, refetchHasScore]);

  const refreshTopScores = useCallback(async () => {
    await refetchTopScores();
  }, [refetchTopScores]);

  const refreshAllScores = useCallback(async () => {
    await refetchAllScores();
  }, [refetchAllScores]);

  const refreshTotalUsers = useCallback(async () => {
    await refetchTotalUsers();
  }, [refetchTotalUsers]);

  const refreshAll = useCallback(async () => {
    await Promise.all([
      refreshMyScore(),
      refreshTopScores(),
      refreshAllScores(),
      refreshTotalUsers(),
    ]);
    setLastUpdateTimestamp(Date.now());
  }, [refreshMyScore, refreshTopScores, refreshAllScores, refreshTotalUsers]);

  const handleRefreshAll = useCallback(() => {
    refreshAll().catch(console.error);
  }, [refreshAll]);

  // Enhanced setScore function that refreshes data after success
  const handleSetScore = useCallback(async (score: number) => {
    try {
      await setScore(score);
      // Data will be refreshed automatically by the success callback
    } catch (error) {
      throw error;
    }
  }, [setScore]);

  // Auto-refresh effect
  useEffect(() => {
    if (autoRefresh && refreshInterval > 0) {
      const interval = setInterval(handleRefreshAll, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval, handleRefreshAll]);

  // Refresh when account changes
  useEffect(() => {
    if (mounted && address) {
      handleRefreshAll();
    }
  }, [mounted, address, handleRefreshAll]);

  // Real-time updates effect (placeholder for future WebSocket implementation)
  useEffect(() => {
    if (enableRealTimeUpdates) {
      // This could be enhanced with WebSocket connections or event listeners
      // For now, it's just a placeholder
      console.log('Real-time updates enabled');
    }
  }, [enableRealTimeUpdates]);

  const contextValue: ContractContextValue = {
    // User data
    myScore,
    myRank,
    hasScore,
    
    // Global data
    totalUsers,
    topScores,
    allScores,
    
    // Loading states
    isLoadingMyScore: isLoadingMyScore || isLoadingMyRank || isLoadingHasScore,
    isLoadingTopScores,
    isLoadingAllScores,
    isLoadingTotalUsers,
    
    // Error state
    error,
    
    // Refresh functions
    refreshMyScore,
    refreshTopScores,
    refreshAllScores,
    refreshTotalUsers,
    refreshAll,
    
    // Write operations
    setScore: handleSetScore,
    isSettingScore,
    setScoreError,
  };

  return (
    <ContractContext.Provider value={contextValue}>
      {children}
    </ContractContext.Provider>
  );
}

/**
 * Hook to use the contract context
 */
export function useContract(): ContractContextValue {
  const context = useContext(ContractContext);
  if (context === undefined) {
    throw new Error('useContract must be used within a ContractProvider');
  }
  return context;
}

/**
 * Hook to use only user-specific contract data
 */
export function useMyContractData() {
  const { 
    myScore, 
    myRank, 
    hasScore, 
    isLoadingMyScore, 
    refreshMyScore,
    setScore,
    isSettingScore,
    setScoreError,
  } = useContract();

  return {
    score: myScore,
    rank: myRank,
    hasScore,
    isLoading: isLoadingMyScore,
    refresh: refreshMyScore,
    setScore,
    isSettingScore,
    setScoreError,
  };
}

/**
 * Hook to use only leaderboard data
 */
export function useLeaderboardData() {
  const { 
    topScores, 
    allScores, 
    totalUsers, 
    isLoadingTopScores, 
    isLoadingAllScores,
    isLoadingTotalUsers,
    refreshTopScores,
    refreshAllScores,
    refreshTotalUsers,
  } = useContract();

  return {
    topScores,
    allScores,
    totalUsers,
    isLoading: isLoadingTopScores || isLoadingAllScores || isLoadingTotalUsers,
    refreshTopScores,
    refreshAllScores,
    refreshTotalUsers,
  };
}

/**
 * Hook for contract statistics
 */
export function useContractStats() {
  const { totalUsers, topScores, allScores } = useContract();

  const stats = React.useMemo(() => {
    const totalScores = allScores.length;
    const averageScore = totalScores > 0 
      ? allScores.reduce((sum, score) => sum + score.score, 0) / totalScores 
      : 0;
    const highestScore = topScores[0]?.score || 0;
    const lowestScore = allScores[allScores.length - 1]?.score || 0;

    return {
      totalUsers,
      totalScores,
      averageScore: Math.round(averageScore),
      highestScore,
      lowestScore,
    };
  }, [totalUsers, topScores, allScores]);

  return stats;
}

/**
 * Hook for user ranking information
 */
export function useUserRanking(userAddress?: string) {
  const { allScores } = useContract();
  
  const ranking = React.useMemo(() => {
    if (!userAddress || !allScores.length) return null;

    const userScore = allScores.find(
      score => score.user.toLowerCase() === userAddress.toLowerCase()
    );

    if (!userScore) return null;

    const rank = userScore.rank || 0;
    const totalPlayers = allScores.length;
    const percentile = totalPlayers > 0 ? ((totalPlayers - rank + 1) / totalPlayers) * 100 : 0;

    return {
      rank,
      score: userScore.score,
      totalPlayers,
      percentile: Math.round(percentile),
      isTopPlayer: rank <= 10,
      isTopPercent: percentile >= 90,
    };
  }, [userAddress, allScores]);

  return ranking;
}

/**
 * Hook for contract event listening (placeholder for future implementation)
 */
export function useContractEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [isListening, setIsListening] = useState(false);

  const startListening = useCallback(() => {
    setIsListening(true);
    // Implement event listening logic here
    console.log('Started listening to contract events');
  }, []);

  const stopListening = useCallback(() => {
    setIsListening(false);
    // Implement stop listening logic here
    console.log('Stopped listening to contract events');
  }, []);

  return {
    events,
    isListening,
    startListening,
    stopListening,
  };
}

export default ContractContext;
