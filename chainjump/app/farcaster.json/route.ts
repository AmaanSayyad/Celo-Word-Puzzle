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
      name: "Chain Jump",
      iconUrl: `${APP_URL}/images/icon.png`,
      homeUrl: `${APP_URL}`,
      imageUrl: `${APP_URL}/images/feed.png`,
      screenshotUrls: [],
      tags: ["arbitrum", "farcaster", "miniapp", "games"],
      primaryCategory: "games",
      buttonTitle: "Play Now",
      splashImageUrl: `${APP_URL}/images/splash.png`,
      splashBackgroundColor: "#ffffff",
      webhookUrl: `${APP_URL}/api/webhook`,
      subtitle: "Chain Jump",
      description: "Chain Jump",
      tagline:"Chain Jump",
      ogTitle:"Chain Jump",
      ogDescription: "Chain Jump",
      ogImageUrl: `${APP_URL}/images/feed.png`,
      heroImageUrl: `${APP_URL}/images/feed.png`,
      requiredChains: ["eip155:42161"],
    },

  };

  return NextResponse.json(farcasterConfig);
}
