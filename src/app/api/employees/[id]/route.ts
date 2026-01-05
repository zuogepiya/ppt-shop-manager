import { NextRequest, NextResponse } from "next/server";
import { employeeManager } from "@/storage/database";

// GET - 获取单个员工
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const employee = await employeeManager.getEmployeeById(id);

    if (!employee) {
      return NextResponse.json(
        { error: "员工不存在" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: employee });
  } catch (error) {
    console.error("获取员工详情失败:", error);
    return NextResponse.json(
      { error: "获取员工详情失败" },
      { status: 500 }
    );
  }
}

// PUT - 更新员工
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const employee = await employeeManager.updateEmployee(id, data);

    if (!employee) {
      return NextResponse.json(
        { error: "员工不存在" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: employee });
  } catch (error) {
    console.error("更新员工失败:", error);
    return NextResponse.json(
      { error: "更新员工失败" },
      { status: 500 }
    );
  }
}

// DELETE - 删除员工
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = await employeeManager.deleteEmployee(id);

    if (!success) {
      return NextResponse.json(
        { error: "员工不存在" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "删除成功" });
  } catch (error) {
    console.error("删除员工失败:", error);
    return NextResponse.json(
      { error: "删除员工失败" },
      { status: 500 }
    );
  }
}
