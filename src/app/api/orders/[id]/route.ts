import { NextRequest, NextResponse } from "next/server";
import { orderManager } from "@/storage/database";

// GET - 获取单个订单
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const order = await orderManager.getOrderById(id);

    if (!order) {
      return NextResponse.json(
        { error: "订单不存在" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: order });
  } catch (error) {
    console.error("获取订单详情失败:", error);
    return NextResponse.json(
      { error: "获取订单详情失败" },
      { status: 500 }
    );
  }
}

// PUT - 更新订单
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const order = await orderManager.updateOrder(id, data);

    if (!order) {
      return NextResponse.json(
        { error: "订单不存在" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: order });
  } catch (error) {
    console.error("更新订单失败:", error);
    return NextResponse.json(
      { error: "更新订单失败" },
      { status: 500 }
    );
  }
}

// DELETE - 删除订单
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = await orderManager.deleteOrder(id);

    if (!success) {
      return NextResponse.json(
        { error: "订单不存在" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "删除成功" });
  } catch (error) {
    console.error("删除订单失败:", error);
    return NextResponse.json(
      { error: "删除订单失败" },
      { status: 500 }
    );
  }
}
