import { APP_URL } from "../lib/constants";
import type { Metadata } from 'next'
import App from '../components/pages/app'
const frame = {
  version: 'next',
  imageUrl: `https://pbs.twimg.com/profile_images/1911481458729857024/mFA1NRn2_400x400.jpg`,
  button: {
    title: 'Play Celo Jump',
    action: {
      type: 'launch_frame',
      name: 'Celo jump',
      url: APP_URL,
      splashImageUrl: `https://pbs.twimg.com/profile_images/1911481458729857024/mFA1NRn2_400x400.jpg`,
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
