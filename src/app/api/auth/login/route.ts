import { NextRequest, NextResponse } from "next/server";
import { userManager } from "@/storage/database";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // 验证必填字段
    if (!username || !password) {
      return NextResponse.json(
        { error: "用户名和密码不能为空" },
        { status: 400 }
      );
    }

    // 查找用户
    const user = await userManager.getUserByUsername(username);
    if (!user) {
      return NextResponse.json({ error: "用户名或密码错误" }, { status: 401 });
    }

    // 简单密码验证（生产环境应该使用 bcrypt 等加密方式）
    if (user.password !== password) {
      return NextResponse.json({ error: "用户名或密码错误" }, { status: 401 });
    }

    // 检查用户是否激活
    if (!user.isActive) {
      return NextResponse.json(
        { error: "账号已被停用，请联系管理员" },
        { status: 403 }
      );
    }

    // 更新最后登录时间
    await userManager.updateLastLogin(user.id);

    // 创建响应并设置session（简化版，生产环境应使用 JWT 或 secure session）
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        employeeId: user.employeeId,
      },
    });

    // 设置session cookie
    response.cookies.set("session", JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24小时
    });

    return response;
  } catch (error) {
    console.error("登录错误:", error);
    return NextResponse.json(
      { error: "服务器错误，请稍后重试" },
      { status: 500 }
    );
  }
}
