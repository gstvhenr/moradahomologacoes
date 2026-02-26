import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Removed remotePatterns to keep the app 100% offline
  images: {
    remotePatterns: [],
  },
  output: 'standalone',
  transpilePackages: ['motion', 'lucide-react'],
  webpack: (config, { dev }) => {
    // HMR is disabled in certain environments via DISABLE_HMR env var.
    // Do not modify—file watching is disabled to prevent flickering during agent edits.
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
