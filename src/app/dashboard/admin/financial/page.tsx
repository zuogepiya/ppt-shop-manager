export default function FinancialPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">财务管理</h2>
          <p className="mt-1 text-sm text-gray-600">查看财务记录和报表</p>
        </div>
        <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
          + 新增记录
        </button>
      </div>

      {/* 统计卡片 */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-600">本月收入</div>
              <div className="mt-2 text-2xl font-bold text-green-600">
                ¥28,500
              </div>
            </div>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              ↗
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">较上月 +12.5%</div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-600">本月支出</div>
              <div className="mt-2 text-2xl font-bold text-red-600">
                ¥18,200
              </div>
            </div>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              ↘
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">较上月 -5.2%</div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-600">本月净利润</div>
              <div className="mt-2 text-2xl font-bold text-blue-600">
                ¥10,300
              </div>
            </div>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              💰
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">净利润率 36.1%</div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-600">年度累计</div>
              <div className="mt-2 text-2xl font-bold text-purple-600">
                ¥328,000
              </div>
            </div>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
              📊
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">全年收入</div>
        </div>
      </div>

      {/* 筛选栏 */}
      <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <input
              type="date"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <input
              type="date"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <select className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option value="">所有类型</option>
            <option value="income">收入</option>
            <option value="expense">支出</option>
            <option value="commission">提成</option>
            <option value="salary">工资</option>
          </select>
          <select className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option value="">所有方向</option>
            <option value="in">收入</option>
            <option value="out">支出</option>
          </select>
          <button className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
            搜索
          </button>
          <button className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            导出Excel
          </button>
        </div>
      </div>

      {/* 财务记录列表 */}
      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                记录号
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                类型
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                描述
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                金额
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                方向
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                日期
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                状态
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            <tr>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                FIN2025010001
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                  收入
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">订单收入 - ORD2025010001</div>
                <div className="text-xs text-gray-500">年度商业计划书PPT</div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-green-600">
                +¥5,000
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                  收入
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                2025-01-15
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                  已完成
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900">
                  查看
                </button>
                <button className="ml-4 text-red-600 hover:text-red-900">
                  删除
                </button>
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                FIN2025010002
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <span className="inline-flex rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-800">
                  支出
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">员工工资 - 张三</div>
                <div className="text-xs text-gray-500">2025年1月份工资</div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-red-600">
                -¥5,000
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <span className="inline-flex rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-800">
                  支出
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                2025-01-15
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                  已完成
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900">
                  查看
                </button>
                <button className="ml-4 text-red-600 hover:text-red-900">
                  删除
                </button>
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                FIN2025010003
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <span className="inline-flex rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800">
                  提成
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">设计师提成 - 李四</div>
                <div className="text-xs text-gray-500">订单 ORD2025010002 提成</div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-yellow-600">
                +¥640
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                  收入
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                2025-01-16
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                  已完成
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900">
                  查看
                </button>
                <button className="ml-4 text-red-600 hover:text-red-900">
                  删除
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        {/* 分页 */}
        <div className="border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              显示 <span className="font-medium">1</span> 到{" "}
              <span className="font-medium">10</span> 条，共{" "}
              <span className="font-medium">156</span> 条记录
            </div>
            <div className="flex gap-2">
              <button className="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">
                上一页
              </button>
              <button className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white">
                1
              </button>
              <button className="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">
                2
              </button>
              <button className="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">
                3
              </button>
              <button className="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">
                下一页
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
