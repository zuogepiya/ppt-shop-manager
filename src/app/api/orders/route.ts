import { NextRequest, NextResponse } from "next/server";
import { orderManager } from "@/storage/database";

// GET - 获取订单列表
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const customerId = searchParams.get("customerId") || undefined;
    const csId = searchParams.get("csId") || undefined;
    const designerId = searchParams.get("designerId") || undefined;
    const managerId = searchParams.get("managerId") || undefined;
    const status = searchParams.get("status") || undefined;
    const priority = searchParams.get("priority") || undefined;
    const search = searchParams.get("search") || undefined;
    const orderBy = (searchParams.get("orderBy") as any) || undefined;

    const orders = await orderManager.getOrders({
      filters: {
        customerId,
        csId,
        designerId,
        managerId,
        status: status as any,
        priority: priority as any,
      },
      search,
      orderBy,
    });

    return NextResponse.json({ success: true, data: orders });
  } catch (error) {
    console.error("获取订单列表失败:", error);
    return NextResponse.json(
      { error: "获取订单列表失败" },
      { status: 500 }
    );
  }
}

// POST - 创建订单
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // 验证必填字段
    if (!data.orderNo || !data.customerId || !data.title) {
      return NextResponse.json(
        { error: "订单号、客户、标题为必填项" },
        { status: 400 }
      );
    }

    const order = await orderManager.createOrder(data);

    return NextResponse.json({ success: true, data: order });
  } catch (error) {
    console.error("创建订单失败:", error);
    return NextResponse.json(
      { error: "创建订单失败" },
      { status: 500 }
    );
  }
}
