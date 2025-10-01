# Blockchain Integration - Score Submission & Leaderboard

This document explains the blockchain integration features added to the Space Jump game.

## Features Added

### 1. Score Submission to Blockchain
- **Location**: Game Over screen
- **Button**: "Submit Score to Chain"
- **Requirements**: 
  - Wallet must be connected
  - Valid score (> 0)
  - User confirmation for transaction

### 2. Leaderboard
- **Access**: 
  - "Leaderboard" button on Game Over screen
  - "Leaderboard" button on Start screen
- **Features**:
  - View top scores from blockchain
  - See your personal stats (score & rank)
  - Adjustable limit (5, 10, 20, 50 players)
  - Real-time refresh functionality
  - Highlight your own score

## How It Works

### Smart Contract Integration
- **Contract**: `UserScoreManager` deployed on Base Sepolia
- **Address**: `0xf21de389278EAf3aC631e1327712F70949BAb150`
- **Network**: Base Sepolia Testnet
- **RPC**: https://sepolia.base.org
- **Functions Used**:
  - `setScore(uint256 _score)` - Submit new score
  - `getTopScores(uint256 _limit)` - Get leaderboard
  - `getMyScore()` - Get user's score
  - `getMyRank()` - Get user's rank

### User Flow
1. **Play Game**: Complete a game session
2. **Game Over**: See final score
3. **Submit Score**: Click "Submit Score to Chain"
4. **Wallet Connection**: Ensure wallet is connected
5. **Confirm Transaction**: Approve blockchain transaction
6. **Success**: Score is recorded on-chain
7. **View Leaderboard**: Check rankings

### Technical Components

#### New Components
- `Leaderboard.tsx` - Modal component for displaying scores
- `Leaderboard.module.css` - Styling for leaderboard
- `CustomModal.tsx` - Custom modal component for alerts/confirmations
- `CustomModal.module.css` - Styling for custom modal
- `LoadingSpinner.tsx` - Reusable loading spinner component
- `LoadingSpinner.module.css` - Spinner animations and styling

#### Enhanced Components
- `SpaceJumpGame.tsx` - Added score submission logic and fixed all button event handlers
- `SpaceJumpGame.module.css` - Added disabled button styles and loading/success/error animations

#### Smart Contract Hooks
- Uses existing hooks from `/smartcontracthooks/`
- `useSetScore` - For submitting scores
- `useTopScores` - For fetching leaderboard
- `useMyScore` & `useMyRank` - For user stats

## User Experience Features

### Visual Feedback
- **Loading Spinner**: Animated spinner during transaction submission
- **Success Animation**: Green checkmark with pulse animation on success
- **Error Animation**: Red X with shake animation on failure
- **Button States**: Dynamic button text and styling based on transaction status
- **Success Message**: Celebratory message that appears after successful submission
- Custom modal dialogs (works in sandboxed environments)
- Disabled states for buttons
- Real-time leaderboard updates

### Error Handling
- Wallet connection checks
- Network validation (Base Sepolia required)
- Score validation
- Transaction failure handling
- User-friendly error messages with retry functionality
- Contract interaction error display

### UI/UX Improvements
- Confirmation dialogs for transactions
- Automatic leaderboard display after successful submission
- Responsive design for mobile
- Smooth animations and transitions

## Gas Optimization
- Only submit scores when explicitly requested
- No automatic submissions
- User confirmation before transactions
- Efficient contract calls

## Future Enhancements
- Real-time score updates via WebSocket
- Achievement system
- Score history
- Social features (friends leaderboard)
- NFT rewards for top players
