"use client";
import Script from "next/script";
import React, { useState } from "react";

type ThemeLoaderProps = {
  children: React.ReactNode;
};

const ThemeLoader: React.FC<ThemeLoaderProps> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <>
      <Script src="/toggle-theme.js" onLoad={() => setIsLoaded(true)} />
      {isLoaded && children}
    </>
  );
};

export default ThemeLoader;
