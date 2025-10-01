# 🚀 Space Jump - Next.js Mobile Game

A complete mobile-native Next.js Doodle Jump-style space jumping game featuring an astronaut character.

## Features

- **Next.js 14**: Modern React framework with App Router
- **Mobile-First Design**: Optimized for mobile devices with touch controls
- **Sprite Animation**: 4-frame astronaut sprite animation
- **Multiple Platform Types**:
  - Normal platforms (purple)
  - Moving platforms (yellow) 
  - Breakable platforms (red)
- **Collectibles**: Coins and power-up shoes
- **Sound Effects**: Jump and coin collection sounds
- **Progressive Difficulty**: Game gets harder as you progress
- **Background Transitions**: Dynamic background changes
- **Endless Gameplay**: Infinite vertical scrolling
- **Score System**: Points based on coins collected
- **PWA Ready**: Can be installed as a mobile app

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## Game Mechanics

- **Movement**: Use left/right arrow buttons to move
- **Jumping**: Automatic jumping when landing on platforms
- **Screen Wrapping**: Player wraps around screen edges
- **Camera Follow**: Screen follows player upward
- **Physics**: Realistic gravity and collision detection
- **Coins**: Collect coins for score (20 points each)
- **Power-ups**: Shoes give super jump boost
- **Difficulty**: Platforms become more challenging over time

## How to Play

1. Tap "Start Game" to begin
2. Use the left/right arrow buttons to move
3. Jump on platforms to climb higher
4. Collect coins for points
5. Grab shoes for super jumps
6. Avoid falling off the bottom of the screen
7. Try to achieve the highest score possible!

## Project Structure

```
space-jump-game/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── SpaceJumpGame.tsx  # Main game component
│   └── SpaceJumpGame.module.css # Game styles
├── public/                # Static assets
│   ├── game-engine.js     # Game logic
│   ├── *.png             # Game sprites
│   ├── *.mp3/*.wav       # Sound effects
│   └── manifest.json     # PWA manifest
└── package.json          # Dependencies
```

## Assets Used

- `astronaut.png` - 4-frame sprite sheet (952x238)
- `bg.png`, `space2.png`, `space3.png` - Background images
- `tilePurple.png` - Normal platform
- `tileRed.png` - Breakable platform  
- `tileYellow.png` - Moving platform
- `coin.png` - Collectible coins (4-frame animation)
- `shoes.png` - Power-up shoes (4-frame animation)
- `jump.wav`, `coins.mp3` - Sound effects

## Technical Details

- **Framework**: Next.js 14 with App Router
- **Engine**: HTML5 Canvas with TypeScript
- **Styling**: CSS Modules for component-scoped styles
- **Mobile Optimized**: Touch events and responsive design
- **Performance**: 60 FPS gameplay with efficient rendering
- **PWA**: Progressive Web App capabilities
- **Cross-Platform**: Works on iOS, Android, and desktop browsers

## Deployment

The game can be deployed to any platform that supports Next.js:
- Vercel (recommended)
- Netlify
- AWS
- Self-hosted

For static export (GitHub Pages, etc.):
```bash
npm run build
```

Enjoy jumping through space! 🌟
