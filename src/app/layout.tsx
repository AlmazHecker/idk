import type { Metadata } from "next";
import "./globals.css";
import ThemeLoader from "./registry/ThemeLoader";

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
      <body className="font-mono antialiased">
        <ThemeLoader>{children}</ThemeLoader>
      </body>
    </html>
  );
}
