import { NextRequest, NextResponse } from "next/server";
import { financialManager } from "@/storage/database";

// GET - 获取财务统计数据
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get("startDate") || undefined;
    const endDate = searchParams.get("endDate") || undefined;
    const type = searchParams.get("type") || undefined;

    // 转换日期字符串为Date对象
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;

    const stats = await financialManager.getFinancialStatistics({
      startDate: start,
      endDate: end,
      type: type as any,
    });

    return NextResponse.json({ success: true, data: stats });
  } catch (error) {
    console.error("获取财务统计失败:", error);
    return NextResponse.json(
      { error: "获取财务统计失败" },
      { status: 500 }
    );
  }
}
