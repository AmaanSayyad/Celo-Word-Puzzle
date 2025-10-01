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
      iconUrl: `https://t3.ftcdn.net/jpg/02/95/89/76/360_F_295897680_UR9pY3i9H2XccDSZuscuOYy2ZWjoim82.jpg`,
      homeUrl: `${APP_URL}`,
      imageUrl: `https://t3.ftcdn.net/jpg/02/95/89/76/360_F_295897680_UR9pY3i9H2XccDSZuscuOYy2ZWjoim82.jpg`,
      screenshotUrls: [],
      tags: ["celo", "farcaster", "miniapp", "games"],
      primaryCategory: "games",
      buttonTitle: "Play Now",
      splashImageUrl: `https://t3.ftcdn.net/jpg/02/95/89/76/360_F_295897680_UR9pY3i9H2XccDSZuscuOYy2ZWjoim82.jpg`,
      splashBackgroundColor: "#ffffff",
      webhookUrl: `${APP_URL}/api/webhook`,
      subtitle: "Celo Jump",
      description: "Celo Jump",
      tagline:"Celo Jump",
      ogTitle:"Celo Jump",
      ogDescription: "Celo Jump",
      ogImageUrl: `https://t3.ftcdn.net/jpg/02/95/89/76/360_F_295897680_UR9pY3i9H2XccDSZuscuOYy2ZWjoim82.jpg`,
      heroImageUrl: `https://t3.ftcdn.net/jpg/02/95/89/76/360_F_295897680_UR9pY3i9H2XccDSZuscuOYy2ZWjoim82.jpg`,
      requiredChains: ["eip155:42220"],
    },

  };

  return NextResponse.json(farcasterConfig);
}
