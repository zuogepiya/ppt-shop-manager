import { NextRequest, NextResponse } from "next/server";
import { employeeManager } from "@/storage/database";

// GET - 获取员工列表
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const department = searchParams.get("department") || undefined;
    const position = searchParams.get("position") || undefined;
    const status = searchParams.get("status") || undefined;
    const search = searchParams.get("search") || undefined;

    const employees = await employeeManager.getEmployees({
      filters: {
        department: department as any,
        position: position as any,
        status: status as any,
      },
      search,
    });

    return NextResponse.json({ success: true, data: employees });
  } catch (error) {
    console.error("获取员工列表失败:", error);
    return NextResponse.json(
      { error: "获取员工列表失败" },
      { status: 500 }
    );
  }
}

// POST - 创建员工
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // 验证必填字段
    if (!data.name || !data.phone || !data.email) {
      return NextResponse.json(
        { error: "姓名、电话、邮箱为必填项" },
        { status: 400 }
      );
    }

    const employee = await employeeManager.createEmployee(data);

    return NextResponse.json({ success: true, data: employee });
  } catch (error) {
    console.error("创建员工失败:", error);
    return NextResponse.json(
      { error: "创建员工失败" },
      { status: 500 }
    );
  }
}
