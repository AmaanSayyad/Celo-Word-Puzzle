import { APP_URL } from "../lib/constants";
import type { Metadata } from 'next'
import { useEffect } from 'react'
import App from '../components/pages/app'


const frame = {
  version: 'next',
  imageUrl: `${APP_URL}/images/feed.png`,
  button: {
    title: 'Play Chain jump',
    action: {
      type: 'launch_frame',
      name: 'Chain jump',
      url: APP_URL,
      splashImageUrl: `${APP_URL}/images/splash.png`,
      splashBackgroundColor: '#ff69b4',
    },
  },
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Chain jump',
    openGraph: {
      title: 'Chain jump',
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
