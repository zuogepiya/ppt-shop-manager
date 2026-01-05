"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        // 根据角色跳转到对应页面
        const role = data.user.role;
        if (role === "admin") {
          router.push("/dashboard/admin");
        } else if (role === "manager") {
          router.push("/dashboard/manager");
        } else if (role === "cs") {
          router.push("/dashboard/cs");
        } else if (role === "designer") {
          router.push("/dashboard/designer");
        } else {
          router.push("/dashboard");
        }
      } else {
        setError(data.error || "登录失败");
      }
    } catch (err) {
      setError("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md">
        {/* Logo 和标题 */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-3xl">
            📊
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            PPT制作店铺管理系统
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            员工管理 · 订单跟踪 · 财务统计
          </p>
        </div>

        {/* 登录表单 */}
        <div className="rounded-lg bg-white p-8 shadow-xl">
          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-800">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  用户名
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="请输入用户名"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  密码
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="请输入密码"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "登录中..." : "登录"}
              </button>
            </div>
          </form>

          {/* 角色说明 */}
          <div className="mt-8 rounded-md bg-gray-50 p-4">
            <h3 className="mb-3 text-sm font-medium text-gray-700">
              系统角色说明：
            </h3>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-start gap-2">
                <span className="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                <div>
                  <span className="font-medium">总台管理：</span>
                  全面管理员工、财务、订单
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-green-600"></span>
                <div>
                  <span className="font-medium">管理者：</span>
                  审核订单、分配任务
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-orange-600"></span>
                <div>
                  <span className="font-medium">客服：</span>
                  沟通客户、跟进订单
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-purple-600"></span>
                <div>
                  <span className="font-medium">设计师：</span>
                  制作PPT、更新进度
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部提示 */}
        <p className="mt-6 text-center text-sm text-gray-600">
          演示账号：admin/admin123 | manager/manager123 | cs/cs123 |
          designer/designer123
        </p>
      </div>
    </div>
  );
}