// Example Components for ChainJump Gaming Smart Contract Hooks

'use client';

import React, { useState, useEffect } from 'react';
import {
  useMyContractData,
  useLeaderboardData,
  useContractStats,
  useSetScoreWithValidation,
  useUserRanking,
  useContract,
} from './index';

/**
 * Simple Score Display Component
 */
export function ScoreDisplay() {
  const { score, rank, hasScore, isLoading } = useMyContractData();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-2"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (!hasScore) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-lg">
        <p className="text-black">No score recorded yet!</p>
        <p className="text-sm text-black mt-2">Play a game to set your first score</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-black mb-2">
        Score: {score.toLocaleString()}
      </h2>
      <p className="text-lg text-black">
        Rank: #{rank}
      </p>
    </div>
  );
}

/**
 * Leaderboard Component with Refresh
 */
export function Leaderboard() {
  const { topScores, isLoading, refreshTopScores } = useLeaderboardData();

  return (
    <div className="text-black bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">Top Players</h2>
        <button
          onClick={refreshTopScores}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Refresh'}
        </button>
      </div>
      
      <div className="p-4">
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse flex space-x-4">
                <div className="w-8 h-6 bg-gray-200 rounded"></div>
                <div className="flex-1 h-6 bg-gray-200 rounded"></div>
                <div className="w-20 h-6 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : topScores.length > 0 ? (
          <div className="space-y-2">
            {topScores.map((player) => (
              <div
                key={player.user}
                className="flex justify-between items-center p-3 bg-gray-50 rounded"
              >
                <div className="flex items-center space-x-3">
                  <span className="font-bold text-black">#{player.rank}</span>
                  <span className="font-mono text-sm text-black">
                    {player.user.slice(0, 6)}...{player.user.slice(-4)}
                  </span>
                </div>
                <span className="font-bold text-lg">
                  {player.score.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-black">No scores yet!</p>
        )}
      </div>
    </div>
  );
}

/**
 * Score Submission Form with Validation
 */
export function ScoreSubmissionForm() {
  const [inputScore, setInputScore] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const { 
    setValidatedScore, 
    isValidating, 
    validationError 
  } = useSetScoreWithValidation(
    (data) => {
      setSuccessMessage('Score updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    },
    (error) => {
      console.error('Failed to set score:', error);
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const score = parseInt(inputScore);
    
    if (isNaN(score) || score < 0) {
      return;
    }
    
    try {
      await setValidatedScore(score);
      setInputScore('');
    } catch (error) {
      console.error('Failed to submit score:', error);
    }
  };

  return (
    <div className="text-black bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Submit New Score</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="number"
            value={inputScore}
            onChange={(e) => setInputScore(e.target.value)}
            placeholder="Enter your score"
            disabled={isValidating}
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 text-black placeholder-black"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isValidating || !inputScore}
          className="w-full px-4 py-2 bg-green-500 text-black rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isValidating ? 'Submitting...' : 'Submit Score'}
        </button>
      </form>
      
      {validationError && (
        <div className="mt-3 p-3 bg-red-100 border border-red-400 text-black rounded">
          {validationError}
        </div>
      )}
      
      {successMessage && (
        <div className="mt-3 p-3 bg-green-100 border border-green-400 text-black rounded">
          {successMessage}
        </div>
      )}
    </div>
  );
}

/**
 * Game Statistics Dashboard
 */
export function GameStatsDashboard() {
  const stats = useContractStats();
  const { score, rank } = useMyContractData();

  const statCards = [
    { label: 'Total Players', value: stats.totalUsers, color: 'blue' },
    { label: 'Highest Score', value: stats.highestScore, color: 'green' },
    { label: 'Average Score', value: stats.averageScore, color: 'yellow' },
    { label: 'My Score', value: score, color: 'purple' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat) => (
        <div key={stat.label} className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-black">{stat.label}</p>
              <p className="text-2xl font-bold text-black">
                {stat.value.toLocaleString()}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-full bg-${stat.color}-100 flex items-center justify-center`}>
              <div className={`w-6 h-6 rounded-full bg-${stat.color}-500`}></div>
            </div>
          </div>
        </div>
      ))}
      
      {rank > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-black">My Rank</p>
              <p className="text-2xl font-bold text-black">#{rank}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-indigo-500"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * User Profile Component
 */
export function UserProfile({ address }: { address?: string }) {
  const ranking = useUserRanking(address);
  
  if (!ranking) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-black">User not found or no score recorded</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-lg font-bold text-black">
            {address?.slice(2, 4).toUpperCase()}
          </span>
        </div>
        <div>
          <p className="font-mono text-sm text-black">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
          <div className="flex space-x-4 mt-1">
            {ranking.isTopPlayer && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                Top Player
              </span>
            )}
            {ranking.isTopPercent && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Top 10%
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-black">Score</p>
          <p className="text-xl font-bold text-black">{ranking.score.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-black">Rank</p>
          <p className="text-xl font-bold text-black">#{ranking.rank}</p>
        </div>
        <div>
          <p className="text-sm text-black">Percentile</p>
          <p className="text-xl font-bold text-black">{ranking.percentile}%</p>
        </div>
        <div>
          <p className="text-sm text-black">Total Players</p>
          <p className="text-xl font-bold text-black">{ranking.totalPlayers}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Real-time Score Updates Component
 */
export function RealTimeScores() {
  const { topScores, refreshTopScores } = useContract();
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    
    const interval = setInterval(() => {
      refreshTopScores();
      setLastUpdate(new Date());
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [mounted, refreshTopScores]);

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-black text-xl font-bold">Live Leaderboard</h2>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-black">
              Last updated: {mounted ? lastUpdate.toLocaleTimeString() : '--:--:--'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-4 space-y-2">
        {topScores.slice(0, 5).map((player) => (
          <div
            key={player.user}
            className="flex justify-between items-center p-3 bg-gray-50 rounded transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <span className="font-bold text-black">#{player.rank}</span>
              <span className="font-mono text-sm text-black">
                {player.user.slice(0, 6)}...{player.user.slice(-4)}
              </span>
            </div>
            <div className="text-right">
              <span className="font-bold text-lg">
                {player.score.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Complete Game Dashboard
 */
export function GameDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ScoreDisplay />
        <ScoreSubmissionForm />
      </div>
      
      <GameStatsDashboard />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Leaderboard />
        <RealTimeScores />
      </div>
    </div>
  );
}

export default {
  ScoreDisplay,
  Leaderboard,
  ScoreSubmissionForm,
  GameStatsDashboard,
  UserProfile,
  RealTimeScores,
  GameDashboard,
};
