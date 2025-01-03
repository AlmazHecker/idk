/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["./src", "./app", "./components"],
  },
  reactStrictMode: false,
};

export default nextConfig;
