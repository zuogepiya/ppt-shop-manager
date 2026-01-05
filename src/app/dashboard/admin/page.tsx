import { Suspense } from "react";

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">总台管理</h2>
        <p className="mt-1 text-sm text-gray-600">
          欢迎回来，这是您的管理概览
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">总员工数</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">12</p>
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              👥
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500">在职员工：10人 | 离职：2人</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">本月订单</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">48</p>
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
              📦
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500">
            进行中：15 | 已完成：33
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">本月收入</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                ¥28,500
              </p>
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
              💰
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500">较上月增长 +12.5%</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">客户总数</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">156</p>
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
              🎯
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500">
            本月新增：23 | 活跃：89
          </p>
        </div>
      </div>

      {/* 快速操作 */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">快速操作</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <a
            href="/dashboard/admin/employees"
            className="flex rounded-lg bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              👥
            </div>
            <div className="ml-4">
              <h4 className="font-medium text-gray-900">员工管理</h4>
              <p className="mt-1 text-sm text-gray-600">
                查看和管理所有员工信息
              </p>
            </div>
          </a>

          <a
            href="/dashboard/admin/orders"
            className="flex rounded-lg bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
              📦
            </div>
            <div className="ml-4">
              <h4 className="font-medium text-gray-900">订单管理</h4>
              <p className="mt-1 text-sm text-gray-600">
                查看和管理所有订单
              </p>
            </div>
          </a>

          <a
            href="/dashboard/admin/financial"
            className="flex rounded-lg bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
              💰
            </div>
            <div className="ml-4">
              <h4 className="font-medium text-gray-900">财务管理</h4>
              <p className="mt-1 text-sm text-gray-600">
                查看财务记录和报表
              </p>
            </div>
          </a>
        </div>
      </div>

      {/* 最近订单 */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">最近订单</h3>
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  订单号
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  客户
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  标题
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  金额
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  状态
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  ORD2025010001
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  张三
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  年度商业计划书PPT
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  ¥5,000
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="inline-flex rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800">
                    进行中
                  </span>
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  ORD2025010002
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  李四
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  产品发布会PPT
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  ¥8,000
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                    已完成
                  </span>
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  ORD2025010003
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  王五
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  融资路演PPT
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  ¥12,000
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                    待审核
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
