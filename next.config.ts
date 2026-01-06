import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // 图片优化
  images: {
    domains: [],
    unoptimized: true,
  },

  // 服务器外部包（Next.js 16 的正确配置）
  serverExternalPackages: ['postgres'],
};

export default nextConfig;
