import withAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["./src", "./app", "./components"],
  },
  reactStrictMode: false,
};

export default withAnalyzer({ enabled: true })(nextConfig);
