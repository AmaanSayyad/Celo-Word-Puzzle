import { NextResponse } from "next/server";
import { APP_URL } from "../../lib/constants";

export async function GET() {
  const farcasterConfig = {
    
      "accountAssociation": {
        "header": "",
        "payload": "",
        "signature": ""
      },
    
    frame: {
      version: "1",
      name: "Celo Jump",
      iconUrl: `https://pbs.twimg.com/profile_images/1911481458729857024/mFA1NRn2_400x400.jpg`,
      homeUrl: `${APP_URL}`,
      imageUrl: `https://pbs.twimg.com/profile_images/1911481458729857024/mFA1NRn2_400x400.jpg`,
      screenshotUrls: [],
      tags: ["celo", "farcaster", "miniapp", "games"],
      primaryCategory: "games",
      buttonTitle: "Play Now",
      splashImageUrl: `https://pbs.twimg.com/profile_images/1911481458729857024/mFA1NRn2_400x400.jpg`,
      splashBackgroundColor: "#ffffff",
      webhookUrl: `${APP_URL}/api/webhook`,
      subtitle: "Celo Jump",
      description: "Celo Jump",
      tagline:"Celo Jump",
      ogTitle:"Celo Jump",
      ogDescription: "Celo Jump",
      ogImageUrl: `https://pbs.twimg.com/profile_images/1911481458729857024/mFA1NRn2_400x400.jpg`,
      heroImageUrl: `https://pbs.twimg.com/profile_images/1911481458729857024/mFA1NRn2_400x400.jpg`,
      requiredChains: ["eip155:42220"],
    },

  };

  return NextResponse.json(farcasterConfig);
}
