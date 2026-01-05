/**
 * 数据库适配器
 * 支持不同环境的数据库连接方式
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// 判断当前环境
const isCozeEnvironment = typeof getDb !== 'undefined' || !!process.env.COZE_WORKSPACE_PATH;

/**
 * 获取数据库连接
 * 优先使用 coze-coding-dev-sdk（沙箱环境）
 * 否则使用标准 postgres 连接（Vercel、云服务器等）
 */
export async function getDatabaseConnection() {
  // 沙箱环境：使用 coze-coding-dev-sdk
  if (isCozeEnvironment) {
    try {
      // 动态导入 coze-coding-dev-sdk
      const { getDb } = await import("coze-coding-dev-sdk");
      return getDb();
    } catch (error) {
      console.error("Failed to load coze-coding-dev-sdk:", error);
      // 降级使用标准连接
      return getStandardConnection();
    }
  }

  // 外部环境：使用标准 PostgreSQL 连接
  return getStandardConnection();
}

/**
 * 获取标准 PostgreSQL 连接
 * 用于 Vercel、云服务器等外部部署环境
 */
function getStandardConnection() {
  const DATABASE_URL = process.env.DATABASE_URL;

  if (!DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is not defined. Please set it in your environment variables."
    );
  }

  const client = postgres(DATABASE_URL, {
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10,
  });

  return drizzle(client);
}

/**
 * 兼容 coze-coding-dev-sdk 的 getDb 函数
 */
export async function getDb() {
  return getDatabaseConnection();
}
