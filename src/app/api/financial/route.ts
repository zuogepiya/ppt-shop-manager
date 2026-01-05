import { NextRequest, NextResponse } from "next/server";
import { financialManager } from "@/storage/database";

// GET - 获取财务记录列表
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orderId = searchParams.get("orderId") || undefined;
    const employeeId = searchParams.get("employeeId") || undefined;
    const type = searchParams.get("type") || undefined;
    const category = searchParams.get("category") || undefined;
    const direction = searchParams.get("direction") || undefined;
    const status = searchParams.get("status") || undefined;

    const records = await financialManager.getFinancialRecords({
      filters: {
        orderId,
        employeeId,
        type: type as any,
        category,
        direction: direction as any,
        status: status as any,
      },
    });

    return NextResponse.json({ success: true, data: records });
  } catch (error) {
    console.error("获取财务记录失败:", error);
    return NextResponse.json(
      { error: "获取财务记录失败" },
      { status: 500 }
    );
  }
}

// POST - 创建财务记录
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // 验证必填字段
    if (!data.recordNo || !data.type || !data.amount) {
      return NextResponse.json(
        { error: "记录号、类型、金额为必填项" },
        { status: 400 }
      );
    }

    const record = await financialManager.createFinancialRecord(data);

    return NextResponse.json({ success: true, data: record });
  } catch (error) {
    console.error("创建财务记录失败:", error);
    return NextResponse.json(
      { error: "创建财务记录失败" },
      { status: 500 }
    );
  }
}
