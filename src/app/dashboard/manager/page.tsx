export default function ManagerDashboard() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">管理者工作台</h2>
        <p className="mt-1 text-sm text-gray-600">
          订单审核与任务分配管理
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">待审核订单</p>
              <p className="mt-2 text-3xl font-bold text-yellow-600">3</p>
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
              ⏳
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500">需要您的审批</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">制作中订单</p>
              <p className="mt-2 text-3xl font-bold text-blue-600">15</p>
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              📝
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500">设计师正在制作</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">今日已完成</p>
              <p className="mt-2 text-3xl font-bold text-green-600">5</p>
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
              ✅
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500">今日交付订单数</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">本月销售额</p>
              <p className="mt-2 text-3xl font-bold text-purple-600">¥85K</p>
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
              📈
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500">目标进度 85%</p>
        </div>
      </div>

      {/* 待审核订单 */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">待审核订单</h3>
          <a
            href="#"
            className="text-sm text-blue-600 hover:text-blue-900"
          >
            查看全部 →
          </a>
        </div>
        <div className="space-y-4">
          <div className="rounded-lg bg-white p-6 shadow-sm border-l-4 border-yellow-500">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h4 className="text-lg font-medium text-gray-900">
                    ORD2025010001
                  </h4>
                  <span className="inline-flex rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800">
                    待审核
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-900">
                  年度商业计划书PPT
                </p>
                <div className="mt-2 flex gap-4 text-xs text-gray-500">
                  <span>客户：张三</span>
                  <span>设计师：李四</span>
                  <span>金额：¥5,000</span>
                  <span>页数：20页</span>
                </div>
              </div>
              <div className="ml-4 flex gap-2">
                <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700">
                  驳回
                </button>
                <button className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">
                  通过
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm border-l-4 border-yellow-500">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h4 className="text-lg font-medium text-gray-900">
                    ORD2025010002
                  </h4>
                  <span className="inline-flex rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800">
                    待审核
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-900">产品发布会PPT</p>
                <div className="mt-2 flex gap-4 text-xs text-gray-500">
                  <span>客户：李四</span>
                  <span>设计师：王五</span>
                  <span>金额：¥8,000</span>
                  <span>页数：30页</span>
                </div>
              </div>
              <div className="ml-4 flex gap-2">
                <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700">
                  驳回
                </button>
                <button className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">
                  通过
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 设计师工作量 */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          设计师工作量
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                  李
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">李四</div>
                <div className="text-xs text-gray-500">高级设计师</div>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>进行中订单</span>
                <span className="font-medium">6</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>本月完成</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>完成率</span>
                <span className="font-medium text-green-600">95%</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  王
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">王五</div>
                <div className="text-xs text-gray-500">设计师</div>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>进行中订单</span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>本月完成</span>
                <span className="font-medium">10</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>完成率</span>
                <span className="font-medium text-green-600">90%</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                  赵
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">赵六</div>
                <div className="text-xs text-gray-500">设计师</div>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>进行中订单</span>
                <span className="font-medium">4</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>本月完成</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>完成率</span>
                <span className="font-medium text-green-600">88%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
