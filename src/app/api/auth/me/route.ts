import { NextRequest, NextResponse } from "next/server";
import { userManager } from "@/storage/database";

export async function GET(request: NextRequest) {
  try {
    // 获取session
    const session = request.cookies.get("session");

    if (!session) {
      return NextResponse.json({ error: "未登录" }, { status: 401 });
    }

    // 解析session
    let userData;
    try {
      userData = JSON.parse(session.value);
    } catch {
      return NextResponse.json({ error: "无效的session" }, { status: 401 });
    }

    // 获取完整用户信息
    const user = await userManager.getUserById(userData.id);
    if (!user || !user.isActive) {
      return NextResponse.json({ error: "用户不存在或已停用" }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        employeeId: user.employeeId,
      },
    });
  } catch (error) {
    console.error("获取用户信息错误:", error);
    return NextResponse.json(
      { error: "服务器错误，请稍后重试" },
      { status: 500 }
    );
  }
}
