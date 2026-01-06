/**
 * 数据库连接配置
 * 支持不同环境：开发、生产（Vercel）、生产（云服务器）
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// 环境变量
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not defined. Please set it in your environment variables."
  );
}

// 创建PostgreSQL连接
const client = postgres(DATABASE_URL, {
  max: 10, // 最大连接数
  idle_timeout: 20, // 空闲超时
  connect_timeout: 10, // 连接超时
});

// 创建Drizzle实例
export const db = drizzle(client);

// 优雅关闭连接
export async function closeConnection() {
  await client.end();
}
