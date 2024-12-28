import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/app/Providers";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "IDK",
  description: "IDK app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = (await cookies()).get("theme");

  return (
    <html lang="en" className={theme?.value === "light" ? "light" : "dark"}>
      <body className={`font-mono antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
