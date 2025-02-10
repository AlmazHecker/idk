// Next.js doesn't allow to use synchronous scripts.
// It's Script compoonent causes theme flash, that's why I used native script tag
/* eslint-disable @next/next/no-sync-scripts */
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IDK",
  description: "IDK app",
  icons: {
    apple: "/apple-touch-icon.png",
    icon: "/favicon.svg",
    shortcut: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="/toggle-theme.js" />
      </head>
      <body className="font-mono antialiased">{children}</body>
    </html>
  );
}
