import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/Providers";
import { Toaster } from "react-hot-toast";
import "@rainbow-me/rainbowkit/styles.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Celo Word Game",
  description: "Word puzzle game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        <meta
          name="fc:frame"
          content='{
      "version": "1",
      "imageUrl": "https://cdn-icons-gif.flaticon.com/15689/15689514.gif",
       "button": {
          "title": "Celo Word Puzzle",
          "action": {
            "type": "launch_frame",
            "name": "Celo Word Puzzle",
            "url": "https://wordgame-nine.vercel.app/",
            "splashImageUrl": "https://cdn-icons-gif.flaticon.com/15689/15689514.gif",
            "splashBackgroundColor": "white"
          }
        }
     }'
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
