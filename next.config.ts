import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // 环境变量（客户端可用）
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },

  // 图片优化
  images: {
    domains: [],
    unoptimized: true, // 如果使用外部图片服务，可以设置为false
  },

  // 输出配置（用于静态导出，可选）
  // output: 'export',

  // 服务器外部包（Next.js 16 的正确配置）
  serverExternalPackages: ['postgres'],
};

export default nextConfig;
