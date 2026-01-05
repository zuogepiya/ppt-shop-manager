import { NextRequest, NextResponse } from "next/server";
import { financialManager } from "@/storage/database";

// GET - 获取单个财务记录
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const record = await financialManager.getFinancialRecordById(id);

    if (!record) {
      return NextResponse.json(
        { error: "财务记录不存在" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: record });
  } catch (error) {
    console.error("获取财务记录详情失败:", error);
    return NextResponse.json(
      { error: "获取财务记录详情失败" },
      { status: 500 }
    );
  }
}

// PUT - 更新财务记录
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const record = await financialManager.updateFinancialRecord(id, data);

    if (!record) {
      return NextResponse.json(
        { error: "财务记录不存在" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: record });
  } catch (error) {
    console.error("更新财务记录失败:", error);
    return NextResponse.json(
      { error: "更新财务记录失败" },
      { status: 500 }
    );
  }
}

// DELETE - 删除财务记录
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = await financialManager.deleteFinancialRecord(id);

    if (!success) {
      return NextResponse.json(
        { error: "财务记录不存在" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "删除成功" });
  } catch (error) {
    console.error("删除财务记录失败:", error);
    return NextResponse.json(
      { error: "删除财务记录失败" },
      { status: 500 }
    );
  }
}
