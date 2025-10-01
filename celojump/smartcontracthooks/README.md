# ChainJump Gaming Smart Contract Hooks

A comprehensive React hooks library for interacting with the ChainJump Gaming smart contract. This library provides type-safe, easy-to-use hooks for reading and writing to the smart contract, along with a powerful React context for state management.

## 🚀 Features

- **🔍 Read Hooks**: Get user scores, leaderboards, rankings, and statistics
- **✍️ Write Hooks**: Set scores with validation, retry logic, and gas estimation
- **⚡ React Context**: Centralized state management with auto-refresh capabilities
- **🎯 TypeScript**: Full type safety with comprehensive interfaces
- **🔄 Auto-refresh**: Optional automatic data refreshing
- **📊 Real-time Updates**: Event-based updates (extensible)
- **🛡️ Error Handling**: Comprehensive error handling and validation
- **🎨 Developer-Friendly**: Easy-to-use API with great DX

## 📦 Installation

The hooks are already included in your project. Make sure you have the required dependencies:

```bash
pnpm install wagmi viem @tanstack/react-query
```

## 🏗️ Setup

### 1. Wrap your app with the ContractProvider

```tsx
// app/layout.tsx or your root component
import { ContractProvider } from '@/smartcontracthooks';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <ContractProvider 
              autoRefresh={true}
              refreshInterval={30000}
              topScoresLimit={10}
            >
              {children}
            </ContractProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
```

### 2. Use hooks in your components

```tsx
// components/GameScore.tsx
import { useMyContractData, useLeaderboardData } from '@/smartcontracthooks';

export function GameScore() {
  const { score, rank, setScore, isSettingScore } = useMyContractData();
  const { topScores } = useLeaderboardData();

  const handleSetScore = async (newScore: number) => {
    try {
      await setScore(newScore);
      console.log('Score updated successfully!');
    } catch (error) {
      console.error('Failed to update score:', error);
    }
  };

  return (
    <div>
      <h2>My Score: {score}</h2>
      <p>My Rank: #{rank}</p>
      <button 
        onClick={() => handleSetScore(1500)}
        disabled={isSettingScore}
      >
        {isSettingScore ? 'Updating...' : 'Set Score to 1500'}
      </button>
    </div>
  );
}
```

## 📚 API Reference

### 🔍 Read Hooks

#### `useMyScore(options?)`
Get the current user's score.

```tsx
const { data: score, isLoading, error, refetch } = useMyScore({
  enabled: true,
  refetchInterval: 0,
  onSuccess: (score) => console.log('My score:', score),
});
```

#### `useUserScore(address, options?)`
Get a specific user's score.

```tsx
const { data: score } = useUserScore('0x123...', {
  enabled: !!address,
});
```

#### `useTopScores(limit?, options?)`
Get top scores with ranking.

```tsx
const { data: topScores } = useTopScores(10, {
  includeRank: true,
  formatScores: true,
});
```

#### `useAllScores(options?)`
Get all scores in descending order.

```tsx
const { data: allScores, isLoading } = useAllScores({
  includeRank: true,
});
```

#### `useTotalUsers(options?)`
Get total number of users.

```tsx
const { data: totalUsers } = useTotalUsers();
```

#### `useMyRank(options?)`
Get current user's rank.

```tsx
const { data: rank } = useMyRank();
```

#### `useUserRank(address, options?)`
Get a specific user's rank.

```tsx
const { data: rank } = useUserRank('0x123...');
```

#### `useHasScore(options?)`
Check if current user has a score.

```tsx
const { data: hasScore } = useHasScore();
```

#### `useLeaderboard(page, limit, options?)`
Get paginated leaderboard.

```tsx
const { data: leaderboard } = useLeaderboard(1, 10);
// Returns: { scores, currentPage, totalPages, hasNextPage, hasPreviousPage }
```

#### `useUserStats(address?, options?)`
Get combined user statistics.

```tsx
const { data: stats } = useUserStats('0x123...');
// Returns: { score, rank, hasScore }
```

### ✍️ Write Hooks

#### `useSetScore(onSuccess?, onError?)`
Basic score setting hook.

```tsx
const { setScore, isLoading, isSuccess, error } = useSetScore(
  (data) => console.log('Success:', data),
  (error) => console.error('Error:', error)
);

await setScore(1500);
```

#### `useSetScoreWithRetry(maxRetries?, retryDelay?, onSuccess?, onError?)`
Score setting with automatic retry logic.

```tsx
const { setScoreWithRetry, retryCount } = useSetScoreWithRetry(3, 1000);

await setScoreWithRetry(1500);
```

#### `useSetScoreWithValidation(onSuccess?, onError?)`
Score setting with client-side validation.

```tsx
const { 
  setValidatedScore, 
  isValidating, 
  validationError 
} = useSetScoreWithValidation();

await setValidatedScore(1500);
```

#### `useBatchSetScores(onSuccess?, onError?)`
Set multiple scores sequentially.

```tsx
const { setBatchScores, isLoading } = useBatchSetScores();

await setBatchScores([1000, 1500, 2000]);
```

#### `useSetScoreWithGasEstimation(onSuccess?, onError?)`
Score setting with gas estimation.

```tsx
const { 
  setScoreWithGasEstimation, 
  estimatedGas 
} = useSetScoreWithGasEstimation();

await setScoreWithGasEstimation(1500);
```

### 🎯 Context Hooks

#### `useContract()`
Get all contract data and functions.

```tsx
const {
  myScore,
  myRank,
  hasScore,
  totalUsers,
  topScores,
  allScores,
  isLoadingMyScore,
  refreshAll,
  setScore,
} = useContract();
```

#### `useMyContractData()`
Get only user-specific data.

```tsx
const { 
  score, 
  rank, 
  hasScore, 
  setScore, 
  isSettingScore 
} = useMyContractData();
```

#### `useLeaderboardData()`
Get only leaderboard data.

```tsx
const { 
  topScores, 
  allScores, 
  totalUsers, 
  refreshTopScores 
} = useLeaderboardData();
```

#### `useContractStats()`
Get contract statistics.

```tsx
const { 
  totalUsers, 
  totalScores, 
  averageScore, 
  highestScore, 
  lowestScore 
} = useContractStats();
```

#### `useUserRanking(address?)`
Get detailed user ranking information.

```tsx
const ranking = useUserRanking('0x123...');
// Returns: { rank, score, totalPlayers, percentile, isTopPlayer, isTopPercent }
```

## 🎨 Usage Examples

### Basic Game Score Display

```tsx
import { useMyContractData } from '@/smartcontracthooks';

export function ScoreDisplay() {
  const { score, rank, hasScore, isLoading } = useMyContractData();

  if (isLoading) return <div>Loading...</div>;
  if (!hasScore) return <div>No score yet!</div>;

  return (
    <div className="score-display">
      <h2>Score: {score.toLocaleString()}</h2>
      <p>Rank: #{rank}</p>
    </div>
  );
}
```

### Leaderboard Component

```tsx
import { useLeaderboardData } from '@/smartcontracthooks';

export function Leaderboard() {
  const { topScores, isLoading, refreshTopScores } = useLeaderboardData();

  return (
    <div className="leaderboard">
      <div className="header">
        <h2>Top Players</h2>
        <button onClick={refreshTopScores}>Refresh</button>
      </div>
      
      {isLoading ? (
        <div>Loading leaderboard...</div>
      ) : (
        <div className="scores">
          {topScores.map((player) => (
            <div key={player.user} className="player-row">
              <span>#{player.rank}</span>
              <span>{player.user}</span>
              <span>{player.score.toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Score Submission Form

```tsx
import { useState } from 'react';
import { useSetScoreWithValidation } from '@/smartcontracthooks';

export function ScoreSubmissionForm() {
  const [inputScore, setInputScore] = useState('');
  const { 
    setValidatedScore, 
    isValidating, 
    validationError 
  } = useSetScoreWithValidation(
    () => alert('Score updated successfully!'),
    (error) => alert(`Error: ${error.message}`)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const score = parseInt(inputScore);
    if (isNaN(score)) return;
    
    try {
      await setValidatedScore(score);
      setInputScore('');
    } catch (error) {
      console.error('Failed to submit score:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="score-form">
      <div>
        <input
          type="number"
          value={inputScore}
          onChange={(e) => setInputScore(e.target.value)}
          placeholder="Enter your score"
          disabled={isValidating}
        />
        <button type="submit" disabled={isValidating}>
          {isValidating ? 'Submitting...' : 'Submit Score'}
        </button>
      </div>
      {validationError && (
        <div className="error">{validationError}</div>
      )}
    </form>
  );
}
```

### Game Statistics Dashboard

```tsx
import { useContractStats, useMyContractData } from '@/smartcontracthooks';

export function GameStatsDashboard() {
  const stats = useContractStats();
  const { score, rank } = useMyContractData();

  return (
    <div className="stats-dashboard">
      <div className="stat-card">
        <h3>Total Players</h3>
        <p>{stats.totalUsers.toLocaleString()}</p>
      </div>
      
      <div className="stat-card">
        <h3>Highest Score</h3>
        <p>{stats.highestScore.toLocaleString()}</p>
      </div>
      
      <div className="stat-card">
        <h3>Average Score</h3>
        <p>{stats.averageScore.toLocaleString()}</p>
      </div>
      
      <div className="stat-card">
        <h3>My Performance</h3>
        <p>Score: {score.toLocaleString()}</p>
        <p>Rank: #{rank}</p>
      </div>
    </div>
  );
}
```

### Real-time Score Updates

```tsx
import { useEffect } from 'react';
import { useContract } from '@/smartcontracthooks';

export function RealTimeScores() {
  const { topScores, refreshTopScores } = useContract();

  // Refresh every 10 seconds for demo purposes
  useEffect(() => {
    const interval = setInterval(refreshTopScores, 10000);
    return () => clearInterval(interval);
  }, [refreshTopScores]);

  return (
    <div className="real-time-scores">
      <h2>Live Leaderboard</h2>
      {topScores.map((player) => (
        <div key={player.user} className="score-item">
          #{player.rank} - {player.score.toLocaleString()} points
        </div>
      ))}
    </div>
  );
}
```

## ⚙️ Configuration

### ContractProvider Props

```tsx
interface ContractProviderProps {
  children: React.ReactNode;
  autoRefresh?: boolean;        // Enable automatic data refresh
  refreshInterval?: number;     // Refresh interval in milliseconds
  topScoresLimit?: number;      // Number of top scores to fetch
  enableRealTimeUpdates?: boolean; // Enable real-time updates
}
```

### Hook Options

```tsx
interface HookOptions {
  enabled?: boolean;           // Enable/disable the hook
  refetchInterval?: number;    // Auto-refetch interval
  onSuccess?: (data: any) => void;  // Success callback
  onError?: (error: Error) => void; // Error callback
}
```

## 🛡️ Error Handling

All hooks include comprehensive error handling:

```tsx
const { data, error, isError } = useMyScore({
  onError: (error) => {
    console.error('Failed to fetch score:', error);
    // Handle error (show toast, log, etc.)
  }
});

if (isError && error) {
  return <div>Error: {error.message}</div>;
}
```

## 🔧 Validation

The library includes built-in validation:

```tsx
import { VALIDATION, ERROR_MESSAGES } from '@/smartcontracthooks';

// Validate score before submission
if (!VALIDATION.isValidScore(score)) {
  throw new Error(ERROR_MESSAGES.INVALID_SCORE);
}
```

## 📊 Type Safety

All hooks are fully typed:

```tsx
import type { 
  FormattedUserScore, 
  ContractContextValue,
  UseContractReadResult 
} from '@/smartcontracthooks';

const scores: FormattedUserScore[] = topScores;
const context: ContractContextValue = useContract();
```

## 🚀 Performance Tips

1. **Use specific hooks**: Use `useMyContractData()` instead of `useContract()` when you only need user data
2. **Enable selectively**: Disable hooks when not needed with `enabled: false`
3. **Batch updates**: Use the context provider's refresh functions for efficient updates
4. **Optimize re-renders**: Use React.memo() for components that display leaderboard data

## 🔮 Future Enhancements

- WebSocket integration for real-time updates
- Caching strategies for better performance
- Optimistic updates for better UX
- Event filtering and processing
- Multi-contract support
- Advanced error recovery

## 🐛 Troubleshooting

### Common Issues

1. **Hook not updating**: Make sure the ContractProvider is properly set up
2. **Wallet not connected**: Check if the user's wallet is connected
3. **Invalid contract address**: Verify the contract address in `lib/contract.ts`
4. **Network mismatch**: Ensure you're on the correct network

### Debug Mode

Enable debug logging:

```tsx
<ContractProvider autoRefresh={true}>
  {/* Your app */}
</ContractProvider>
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please read the contributing guidelines before submitting PRs.

---

**Happy Gaming! 🎮**
