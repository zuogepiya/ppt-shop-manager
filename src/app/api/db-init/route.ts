import { NextResponse } from "next/server";
import { initDatabase } from "@/storage/database/init";

export async function POST() {
  try {
    await initDatabase();
    return NextResponse.json({
      success: true,
      message: "数据库表结构初始化成功",
    });
  } catch (error) {
    console.error("Database initialization error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "数据库初始化失败",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
