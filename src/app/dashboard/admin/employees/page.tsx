export default function EmployeesPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">员工管理</h2>
          <p className="mt-1 text-sm text-gray-600">管理所有员工信息</p>
        </div>
        <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
          + 新增员工
        </button>
      </div>

      {/* 筛选栏 */}
      <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="搜索员工姓名、电话、邮箱..."
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <select className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option value="">所有部门</option>
            <option value="客服部">客服部</option>
            <option value="设计部">设计部</option>
            <option value="管理部">管理部</option>
          </select>
          <select className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option value="">所有职位</option>
            <option value="客服">客服</option>
            <option value="设计师">设计师</option>
            <option value="管理者">管理者</option>
          </select>
          <button className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
            搜索
          </button>
        </div>
      </div>

      {/* 员工列表 */}
      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                员工信息
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                部门/职位
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                联系方式
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                基本薪资
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                提成比例
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
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      张
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      张三
                    </div>
                    <div className="text-sm text-gray-500">2023-01-15 入职</div>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-sm text-gray-900">客服部</div>
                <div className="text-sm text-gray-500">客服</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">13800138001</div>
                <div className="text-sm text-gray-500">zhangsan@example.com</div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                ¥5,000
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                5%
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                  在职
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900">
                  编辑
                </button>
                <button className="ml-4 text-red-600 hover:text-red-900">
                  删除
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                      李
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      李四
                    </div>
                    <div className="text-sm text-gray-500">2023-03-20 入职</div>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-sm text-gray-900">设计部</div>
                <div className="text-sm text-gray-500">设计师</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">13800138002</div>
                <div className="text-sm text-gray-500">lisi@example.com</div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                ¥8,000
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                8%
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                  在职
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900">
                  编辑
                </button>
                <button className="ml-4 text-red-600 hover:text-red-900">
                  删除
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                      王
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      王五
                    </div>
                    <div className="text-sm text-gray-500">2022-06-10 入职</div>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-sm text-gray-900">管理部</div>
                <div className="text-sm text-gray-500">管理者</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">13800138003</div>
                <div className="text-sm text-gray-500">wangwu@example.com</div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                ¥15,000
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                10%
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                  在职
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900">
                  编辑
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
              <span className="font-medium">12</span> 条记录
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
                下一页
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
