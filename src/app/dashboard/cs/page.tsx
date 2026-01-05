export default function CsDashboard() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">客服工作台</h2>
        <p className="mt-1 text-sm text-gray-600">客户沟通与订单跟进</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">待跟进客户</p>
              <p className="mt-2 text-3xl font-bold text-orange-600">8</p>
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600">
              💬
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500">需要及时回复</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">负责订单</p>
              <p className="mt-2 text-3xl font-bold text-blue-600">12</p>
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              📦
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500">进行中：8 | 已完成：4</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">本月新增客户</p>
              <p className="mt-2 text-3xl font-bold text-green-600">15</p>
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
              👥
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500">较上月 +25%</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">客户满意度</p>
              <p className="mt-2 text-3xl font-bold text-purple-600">4.8</p>
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
              ⭐
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500">满分 5.0</p>
        </div>
      </div>

      {/* 快速操作 */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">快速操作</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <button className="flex rounded-lg bg-white p-6 shadow-sm hover:shadow-md transition-shadow text-left">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              ➕
            </div>
            <div className="ml-4">
              <h4 className="font-medium text-gray-900">新增客户</h4>
              <p className="mt-1 text-sm text-gray-600">添加新客户信息</p>
            </div>
          </button>

          <button className="flex rounded-lg bg-white p-6 shadow-sm hover:shadow-md transition-shadow text-left">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
              📝
            </div>
            <div className="ml-4">
              <h4 className="font-medium text-gray-900">创建订单</h4>
              <p className="mt-1 text-sm text-gray-600">为客户创建新订单</p>
            </div>
          </button>

          <button className="flex rounded-lg bg-white p-6 shadow-sm hover:shadow-md transition-shadow text-left">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
              📞
            </div>
            <div className="ml-4">
              <h4 className="font-medium text-gray-900">跟进记录</h4>
              <p className="mt-1 text-sm text-gray-600">记录客户沟通</p>
            </div>
          </button>
        </div>
      </div>

      {/* 负责的订单 */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">负责的订单</h3>
          <a
            href="#"
            className="text-sm text-blue-600 hover:text-blue-900"
          >
            查看全部 →
          </a>
        </div>
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  订单号
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  标题
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  客户
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  截止日期
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  ORD2025010001
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">年度商业计划书PPT</div>
                  <div className="text-xs text-gray-500">20页 | 商务风格</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">张三</div>
                  <div className="text-xs text-gray-500">小红书</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="inline-flex rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800">
                    制作中
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  2025-01-20
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900">
                    跟进
                  </button>
                  <button className="ml-4 text-green-600 hover:text-green-900">
                    查看
                  </button>
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  ORD2025010004
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">公司介绍PPT</div>
                  <div className="text-xs text-gray-500">15页 | 简约风格</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">刘七</div>
                  <div className="text-xs text-gray-500">微信</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                    待确认
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  2025-01-18
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900">
                    跟进
                  </button>
                  <button className="ml-4 text-green-600 hover:text-green-900">
                    查看
                  </button>
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  ORD2025010005
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">培训课件PPT</div>
                  <div className="text-xs text-gray-500">25页 | 创意风格</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">陈八</div>
                  <div className="text-xs text-gray-500">抖音</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                    已完成
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  2025-01-15
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900">
                    跟进
                  </button>
                  <button className="ml-4 text-green-600 hover:text-green-900">
                    查看
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
