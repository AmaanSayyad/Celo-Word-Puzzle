import { APP_URL } from "../lib/constants";
import type { Metadata } from 'next'
import { useEffect } from 'react'
import App from '../components/pages/app'


const frame = {
  version: 'next',
  imageUrl: `https://t3.ftcdn.net/jpg/02/95/89/76/360_F_295897680_UR9pY3i9H2XccDSZuscuOYy2ZWjoim82.jpg`,
  button: {
    title: 'Play Celo Jump',
    action: {
      type: 'launch_frame',
      name: 'Celo jump',
      url: APP_URL,
      splashImageUrl: `https://t3.ftcdn.net/jpg/02/95/89/76/360_F_295897680_UR9pY3i9H2XccDSZuscuOYy2ZWjoim82.jpg`,
      splashBackgroundColor: '#ff69b4',
    },
  },
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Celo jump',
    openGraph: {
      title: 'Celo jump',
      description: '',
    },
    other: {
      'fc:frame': JSON.stringify(frame),
    },
  }
}


export default function Home() {
  return <App />
}
