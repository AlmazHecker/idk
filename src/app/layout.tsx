import type { Metadata } from "next";
import "./globals.css";
import Providers from "@app/Providers";
import { cookies } from "next/headers";

const FAVICON_SIZES = [16, 32, 48, 96, 128, 256];

export const metadata: Metadata = {
  title: "IDK",
  description: "IDK app",
  icons: FAVICON_SIZES.map((size) => {
    return {
      rel: "icon",
      type: "image/png",
      sizes: `${size}x${size}`,
      url: `/favicon/favicon-${size}.png`,
    };
  }),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = (await cookies()).get("theme");

  return (
    <html lang="en" className={theme?.value === "light" ? "light" : "dark"}>
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={`font-mono antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
