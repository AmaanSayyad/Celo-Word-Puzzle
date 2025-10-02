# 🚀 Jump-Jump-Jump - Web3 Gaming Collection

A collection of blockchain-integrated games built with Next.js, featuring exciting Web3 games: **Space Jump** (a Doodle Jump-style platformer) and **Word Play** (a word guessing game with CELO token rewards).

## 🎮 Games Overview

### 1. 🌌 Space Jump Game (`/celojump`)
A mobile-first Doodle Jump-style space jumping game featuring an astronaut character with blockchain score submission and leaderboard functionality.

**Key Features:**
- 🎯 **Mobile-First Design**: Optimized for mobile devices with touch controls
- 🚀 **Sprite Animation**: 4-frame astronaut sprite animation
- 🎨 **Multiple Platform Types**: Normal (purple), Moving (yellow), and Breakable (red) platforms
- ♾️ **Endless Gameplay**: Infinite vertical scrolling with score tracking
- 🏆 **Blockchain Integration**: Submit scores to Base Sepolia testnet
- 📊 **Leaderboard**: View top scores and personal rankings
- 📱 **PWA Ready**: Can be installed as a mobile app

### 2. 🧠 Word Play Game (`/wordgame`)
A strategic word-guessing game where players stake CELO tokens to participate and earn rewards based on speed and accuracy.

**Key Features:**
- 💰 **CELO Token Integration**: Stake tokens to play and earn rewards
- 🎯 **Strategic Gameplay**: 5-letter word guessing with color-coded hints
- ⚡ **Speed Rewards**: Faster guesses = higher multipliers
- 🔗 **Farcaster Integration**: Social sharing capabilities
- 🏆 **On-Chain Rewards**: Deployed on Celo Mainnet
- 🎨 **Modern UI**: Built with React, Next.js, and Tailwind CSS

## 🛠 Tech Stack

### Space Jump Game
- **Frontend**: Next.js 14, React 18, TypeScript
- **Game Engine**: Phaser 3.90.0
- **Blockchain**: Base Sepolia Testnet, Wagmi, Viem
- **Styling**: CSS Modules, Framer Motion
- **Database**: MongoDB for score persistence
- **Wallet**: Farcaster Frame integration

### Word Play Game
- **Frontend**: Next.js 15, React 19, TypeScript
- **Blockchain**: Celo Mainnet, Wagmi, Ethers.js
- **Styling**: Tailwind CSS 4, Framer Motion
- **Wallet**: RainbowKit integration
- **Social**: Farcaster Frame SDK
- **Smart Contract**: Solidity (WordPuzzle.sol)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- Web3 wallet (MetaMask, Rainbow, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/jump-jump-jump.git
   cd jump-jump-jump
   ```

2. **Install dependencies for Space Jump**
   ```bash
   cd celojump
   pnpm install
   ```

3. **Install dependencies for Word Play**
   ```bash
   cd ../wordgame
   pnpm install
   ```

### Running the Games

#### Space Jump Game
```bash
cd celojump
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Word Play Game
```bash
cd wordgame
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 How to Play

### Space Jump Game
1. **Start Playing**: Tap "Start Game" to begin
2. **Movement**: Use left/right arrow buttons to move the astronaut
3. **Jumping**: Land on platforms to jump higher
4. **Platforms**: 
   - 🟣 Purple: Normal platforms
   - 🟡 Yellow: Moving platforms
   - 🔴 Red: Breakable platforms
5. **Scoring**: Points based on height climbed
6. **Submit Score**: Connect wallet and submit your score to the blockchain
7. **Leaderboard**: View top scores and your ranking

### Word Play Game
1. **Connect Wallet**: Connect your Web3 wallet
2. **Deposit CELO**: Stake CELO tokens to start playing
3. **Guess the Word**: You'll get a 5-letter word to guess
4. **Color Hints**:
   - 🟩 Green: Correct letter in correct position
   - 🟨 Yellow: Correct letter in wrong position
5. **Earn Rewards**: Faster guesses = higher multipliers
6. **Share**: Share your victory on Farcaster

## 🔗 Blockchain Integration

### Space Jump - Base Sepolia
- **Contract**: UserScoreManager
- **Address**: `0xf21de389278EAf3aC631e1327712F70949BAb150`
- **Network**: Base Sepolia Testnet
- **Features**: Score submission, leaderboard, personal stats

### Word Play - Celo Mainnet
- **Contract**: WordPuzzle
- **Address**: `0x1daBC80337bF2d85d496c4eD9cE63a1b16Fbd539`
- **Network**: Celo Mainnet
- **Features**: Token staking, reward distribution, game state management


# Jump-Jump-Jump - Architecture Diagram

## System Architecture Overview

```mermaid
graph TB
    subgraph "User Interface Layer"
        A[Space Jump Game] --> B[Mobile Web App]
        C[Word Play Game] --> D[Desktop/Mobile Web App]
    end
    
    subgraph "Frontend Framework"
        B --> E[Next.js 14 + React 18]
        D --> F[Next.js 15 + React 19]
        E --> G[Phaser.js Game Engine]
        F --> H[Tailwind CSS + Framer Motion]
    end
    
    subgraph "Blockchain Integration"
        G --> I[Wagmi + Viem]
        H --> J[Wagmi + Ethers.js]
        I --> K[Base Sepolia Testnet]
        J --> L[Celo Mainnet]
    end
    
    subgraph "Smart Contracts"
        K --> M[UserScoreManager Contract]
        L --> N[WordPuzzle Contract]
        M --> O[Score Submission & Leaderboard]
        N --> P[Token Staking & Rewards]
    end
    
    subgraph "External Services"
        E --> Q[MongoDB Database]
        F --> R[Farcaster Integration]
        Q --> S[Score Persistence]
        R --> T[Social Sharing]
    end
    
    subgraph "Game Features"
        G --> U[Physics Engine]
        G --> V[Sprite Animation]
        G --> W[Platform Generation]
        H --> X[Word Validation]
        H --> Y[Color Hints System]
        H --> Z[Reward Calculation]
    end
    
    style A fill:#e1f5fe
    style C fill:#f3e5f5
    style K fill:#fff3e0
    style L fill:#e8f5e8
    style M fill:#fff3e0
    style N fill:#e8f5e8
```

## Game Flow Diagrams

### Space Jump Game Flow
```mermaid
flowchart TD
    A[Start Game] --> B[Initialize Physics Engine]
    B --> C[Load Assets & Sprites]
    C --> D[Generate Platforms]
    D --> E[Player Movement Controls]
    E --> F{Land on Platform?}
    F -->|Yes| G[Calculate Jump Physics]
    F -->|No| H[Apply Gravity]
    G --> I[Update Score]
    H --> J{Player Fall?}
    J -->|Yes| K[Game Over Screen]
    J -->|No| E
    I --> L{New High Score?}
    L -->|Yes| M[Show Score Submission]
    L -->|No| N[Continue Playing]
    M --> O[Connect Wallet]
    O --> P[Submit to Blockchain]
    P --> Q[Update Leaderboard]
    K --> R[View Leaderboard]
    Q --> S[Share Achievement]
    R --> S
    N --> E
```

### Word Play Game Flow
```mermaid
flowchart TD
    A[Connect Wallet] --> B[Deposit CELO Tokens]
    B --> C[Start New Game]
    C --> D[Generate 5-Letter Word]
    D --> E[Player Input Guess]
    E --> F[Validate Word]
    F --> G{Correct Word?}
    G -->|Yes| H[Calculate Multiplier]
    G -->|No| I[Show Color Hints]
    I --> J{Attempts Left?}
    J -->|Yes| E
    J -->|No| K[Game Over - No Rewards]
    H --> L[Calculate Rewards]
    L --> M[Distribute CELO Tokens]
    M --> N[Share on Farcaster]
    K --> O[Try Again?]
    O -->|Yes| C
    O -->|No| P[End Session]
    N --> Q[View Statistics]
    Q --> R[Play Again?]
    R -->|Yes| C
    R -->|No| P
```

## Technology Stack Diagram
```mermaid
graph LR
    subgraph "Frontend Technologies"
        A[React 18/19] --> B[Next.js 14/15]
        B --> C[TypeScript]
        C --> D[CSS Modules / Tailwind]
    end
    
    subgraph "Game Development"
        E[Phaser.js 3.90] --> F[Canvas Rendering]
        F --> G[Physics Engine]
        G --> H[Sprite Animation]
    end
    
    subgraph "Blockchain Stack"
        I[Wagmi v2] --> J[Viem / Ethers.js]
        J --> K[Web3 Wallets]
        K --> L[Smart Contracts]
    end
    
    subgraph "Data Layer"
        M[MongoDB] --> N[Score Storage]
        O[Farcaster SDK] --> P[Social Integration]
    end
    
    subgraph "Deployment"
        Q[Vercel] --> R[Edge Functions]
        S[Base Sepolia] --> T[Testnet]
        U[Celo Mainnet] --> V[Production]
    end
    
    A --> E
    B --> I
    E --> M
    I --> S
    I --> U
    M --> Q
    O --> Q
```

## Smart Contract Integration
```mermaid
sequenceDiagram
    participant U as User
    participant G as Game Frontend
    participant W as Wallet
    participant C as Smart Contract
    participant B as Blockchain
    
    Note over U,B: Space Jump Score Submission
    U->>G: Complete Game
    G->>U: Show Score
    U->>G: Click "Submit Score"
    G->>W: Request Transaction
    W->>U: Approve Transaction
    U->>W: Confirm
    W->>C: Submit Score Transaction
    C->>B: Store Score On-Chain
    B->>C: Transaction Confirmed
    C->>G: Score Submitted
    G->>U: Show Success + Leaderboard
    
    Note over U,B: Word Play Token Staking
    U->>G: Connect Wallet
    G->>W: Request Connection
    W->>U: Approve Connection
    U->>W: Confirm
    W->>G: Wallet Connected
    U->>G: Enter Stake Amount
    G->>W: Request CELO Transfer
    W->>U: Approve Transfer
    U->>W: Confirm
    W->>C: Transfer CELO to Contract
    C->>B: Store Stake
    B->>C: Transfer Confirmed
    C->>G: Stake Confirmed
    G->>U: Start Game
```

## Mobile Architecture
```mermaid
graph TB
    subgraph "Mobile Web App"
        A[Progressive Web App] --> B[Service Worker]
        B --> C[Offline Caching]
        A --> D[Touch Controls]
        D --> E[Gesture Recognition]
        A --> F[Responsive Design]
        F --> G[Viewport Optimization]
    end
    
    subgraph "Game Engine"
        H[Phaser.js] --> I[WebGL Rendering]
        I --> J[Hardware Acceleration]
        H --> K[Physics Simulation]
        K --> L[Collision Detection]
    end
    
    subgraph "Performance"
        M[Frame Rate Optimization] --> N[60 FPS Target]
        O[Memory Management] --> P[Asset Loading]
        Q[Network Optimization] --> R[CDN Delivery]
    end
    
    A --> H
    H --> M
    M --> O
    O --> Q
```

This comprehensive architecture diagram shows:

1. **System Overview**: The overall structure of both games and their components
2. **Game Flows**: Step-by-step user interactions for both games
3. **Technology Stack**: All the technologies used in the project
4. **Smart Contract Integration**: How the games interact with blockchain
5. **Mobile Architecture**: Mobile-specific optimizations and features

The diagrams illustrate how your Jump-Jump-Jump project integrates Web3 technologies with traditional game development to create engaging blockchain-based gaming experiences.


## 📱 Mobile Support

Both games are fully optimized for mobile devices:
- **Responsive Design**: Works on all screen sizes
- **Touch Controls**: Optimized for mobile interaction
- **PWA Support**: Can be installed as mobile apps
- **Portrait Orientation**: Locked for optimal mobile experience

## 🏗 Project Structure

```
jump-jump-jump/
├── celojump/                 # Space Jump Game
│   ├── app/                  # Next.js app directory
│   ├── components/           # React components
│   ├── assets/              # Game assets (sprites, sounds)
│   ├── smartcontracthooks/  # Blockchain integration hooks
│   ├── lib/                 # Utilities and constants
│   └── game.js              # Core game logic
├── wordgame/                # Word Play Game
│   ├── src/
│   │   ├── app/             # Next.js app directory
│   │   ├── components/      # React components
│   │   ├── context/         # React context providers
│   │   └── utils/           # Utility functions
│   └── contracts/           # Solidity smart contracts
└── README.md               # This file
```

## 🎨 Assets

### Space Jump Assets
- `astronaut.png` - 4-frame sprite sheet (952x238)
- `bg.png`, `bg2.png` - Background images
- `tilePurple.png`, `tileRed.png`, `tileYellow.png` - Platform sprites
- `coin.png` - Collectible items
- `jump.wav`, `coins.mp3` - Sound effects

### Word Play Assets
- Custom fonts and icons
- Responsive UI components
- Animated transitions

## 🔧 Development

### Available Scripts

#### Space Jump
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

#### Word Play
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Environment Variables

Create `.env.local` files in each game directory with the required environment variables for blockchain integration.

## 🚀 Deployment

### Space Jump
- Deployed on Vercel/Netlify
- Base Sepolia testnet integration
- MongoDB for score persistence

### Word Play
- Deployed on Vercel/Netlify
- Celo Mainnet integration
- Smart contract deployed and verified

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- **Phaser.js** for the game engine
- **Farcaster** for social integration
- **Celo** and **Base** for blockchain infrastructure
- **Next.js** and **React** for the web framework
- **Tailwind CSS** for styling

## Check
- **Farcaster Mini App Link:** https://farcaster.xyz/miniapps/vpxzhkMpuBnT/celo-word-puzzle
- **Deployment Link:** https://celo-word-puzzle.vercel.app/
- **Project Link**: [https://github.com/yourusername/jump-jump-jump](https://github.com/yourusername/jump-jump-jump)
- **Word Play Contract**: [Celo Explorer](https://celoscan.io/address/0x1daBC80337bF2d85d496c4eD9cE63a1b16Fbd539)

---

**Ready to jump into Web3 gaming? Start playing now! 🎮✨**