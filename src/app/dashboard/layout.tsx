import { redirect } from "next/navigation";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-xl">
              📊
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                PPT制作店铺管理系统
              </h1>
              <p className="text-xs text-gray-500">员工管理 · 订单跟踪 · 财务统计</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                退出登录
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* 侧边栏 */}
        <aside className="w-64 flex-shrink-0">
          <nav className="space-y-1">
            <Link
              href="/dashboard/admin"
              className="block rounded-md px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              🏢 总台管理
            </Link>
            <Link
              href="/dashboard/manager"
              className="block rounded-md px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              👔 管理者
            </Link>
            <Link
              href="/dashboard/cs"
              className="block rounded-md px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              🎧 客服
            </Link>
            <Link
              href="/dashboard/designer"
              className="block rounded-md px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              🎨 设计师
            </Link>
          </nav>

          <div className="mt-8 rounded-lg bg-blue-50 p-4">
            <h3 className="mb-3 text-sm font-semibold text-blue-900">
              快捷操作
            </h3>
            <div className="space-y-2">
              <Link
                href="/dashboard/admin/employees"
                className="block rounded-md px-3 py-2 text-xs text-blue-700 hover:bg-blue-100"
              >
                👥 员工管理
              </Link>
              <Link
                href="/dashboard/admin/orders"
                className="block rounded-md px-3 py-2 text-xs text-blue-700 hover:bg-blue-100"
              >
                📦 订单管理
              </Link>
              <Link
                href="/dashboard/admin/financial"
                className="block rounded-md px-3 py-2 text-xs text-blue-700 hover:bg-blue-100"
              >
                💰 财务管理
              </Link>
            </div>
          </div>
        </aside>

        {/* 主内容区 */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
