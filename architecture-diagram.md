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
