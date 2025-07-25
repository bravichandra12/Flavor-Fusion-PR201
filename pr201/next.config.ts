/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com'],
      remotePatterns: [
        {
          hostname: "pub-31881cc45b684c00abbff36f8d057ffc.r2.dev",
          protocol: "https",
          port: "",
        },
        {
          hostname: "lh3.googleusercontent.com",
          protocol: "https",
          port: "",
        },
      ],
    },
};

export default nextConfig;
