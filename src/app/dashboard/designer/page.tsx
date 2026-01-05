export default function DesignerDashboard() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">设计师工作台</h2>
        <p className="mt-1 text-sm text-gray-600">任务接收与进度更新</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">待接单</p>
              <p className="mt-2 text-3xl font-bold text-blue-600">2</p>
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              📥
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500">等待您的接单</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">制作中</p>
              <p className="mt-2 text-3xl font-bold text-yellow-600">4</p>
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
              📝
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500">正在制作的订单</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">本月完成</p>
              <p className="mt-2 text-3xl font-bold text-green-600">18</p>
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
              ✅
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500">本月已交付订单</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">本月收入</p>
              <p className="mt-2 text-3xl font-bold text-purple-600">¥8,500</p>
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
              💰
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500">含提成收入</p>
        </div>
      </div>

      {/* 待接单任务 */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">待接单任务</h3>
        <div className="space-y-4">
          <div className="rounded-lg bg-white p-6 shadow-sm border-l-4 border-blue-500">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h4 className="text-lg font-medium text-gray-900">
                    ORD2025010006
                  </h4>
                  <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                    待接单
                  </span>
                  <span className="inline-flex rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-800">
                    紧急
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-900">
                  投融资路演PPT
                </p>
                <div className="mt-2 flex gap-4 text-xs text-gray-500">
                  <span>客户：周九</span>
                  <span>页数：40页</span>
                  <span>风格：商务简约</span>
                  <span>金额：¥15,000</span>
                </div>
                <div className="mt-3 p-3 bg-gray-50 rounded text-sm text-gray-700">
                  <span className="font-medium">需求描述：</span>
                  需要一份专业的投融资路演PPT，重点突出项目的核心竞争力、市场前景和团队优势，要求设计高端大气，数据可视化清晰。
                </div>
              </div>
              <div className="ml-4">
                <button className="rounded-md bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                  接单
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm border-l-4 border-blue-500">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h4 className="text-lg font-medium text-gray-900">
                    ORD2025010007
                  </h4>
                  <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                    待接单
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-900">
                  产品发布会PPT
                </p>
                <div className="mt-2 flex gap-4 text-xs text-gray-500">
                  <span>客户：吴十</span>
                  <span>页数：25页</span>
                  <span>风格：创意动感</span>
                  <span>金额：¥6,000</span>
                </div>
                <div className="mt-3 p-3 bg-gray-50 rounded text-sm text-gray-700">
                  <span className="font-medium">需求描述：</span>
                  新品发布会的演示PPT，需要有创意的设计风格，包含产品展示、功能介绍和市场定位等内容，要求动态效果。
                </div>
              </div>
              <div className="ml-4">
                <button className="rounded-md bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                  接单
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 制作中的任务 */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">制作中任务</h3>
        <div className="space-y-4">
          <div className="rounded-lg bg-white p-6 shadow-sm border-l-4 border-yellow-500">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h4 className="text-lg font-medium text-gray-900">
                    ORD2025010001
                  </h4>
                  <span className="inline-flex rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800">
                    制作中
                  </span>
                  <span className="inline-flex rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-800">
                    60%
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-900">
                  年度商业计划书PPT
                </p>
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-600">制作进度</span>
                    <span className="text-xs font-medium text-gray-900">60%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </div>
                <div className="mt-3 flex gap-4 text-xs text-gray-500">
                  <span>截止日期：2025-01-20</span>
                  <span>剩余：5天</span>
                </div>
              </div>
              <div className="ml-4 flex gap-2">
                <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                  更新进度
                </button>
                <button className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">
                  提交审核
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm border-l-4 border-yellow-500">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h4 className="text-lg font-medium text-gray-900">
                    ORD2025010003
                  </h4>
                  <span className="inline-flex rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800">
                    制作中
                  </span>
                  <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                    80%
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-900">
                  融资路演PPT
                </p>
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-600">制作进度</span>
                    <span className="text-xs font-medium text-gray-900">80%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-600 rounded-full"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                </div>
                <div className="mt-3 flex gap-4 text-xs text-gray-500">
                  <span>截止日期：2025-01-22</span>
                  <span>剩余：7天</span>
                </div>
              </div>
              <div className="ml-4 flex gap-2">
                <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                  更新进度
                </button>
                <button className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">
                  提交审核
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
