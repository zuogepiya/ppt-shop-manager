"use client";

import { useState, useEffect } from "react";

interface Order {
  id: string;
  orderNo: string;
  title: string;
  customerId: string;
  customerName?: string;
  totalAmount: string;
  status: string;
  priority: string;
  deadline: Date;
  slidesCount: number;
  style: string;
}

const statusMap: Record<string, { label: string; color: string }> = {
  pending: { label: "待确认", color: "bg-gray-100 text-gray-800" },
  confirmed: { label: "已确认", color: "bg-blue-100 text-blue-800" },
  designing: { label: "制作中", color: "bg-yellow-100 text-yellow-800" },
  reviewing: { label: "审核中", color: "bg-purple-100 text-purple-800" },
  completed: { label: "已完成", color: "bg-green-100 text-green-800" },
};

const priorityMap: Record<string, { label: string; color: string }> = {
  low: { label: "低", color: "bg-gray-100 text-gray-800" },
  normal: { label: "普通", color: "bg-blue-100 text-blue-800" },
  high: { label: "高", color: "bg-orange-100 text-orange-800" },
  urgent: { label: "紧急", color: "bg-red-100 text-red-800" },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [stats, setStats] = useState({
    pending: 0,
    designing: 0,
    reviewing: 0,
    completed: 0,
  });

  useEffect(() => {
    loadOrders();
  }, [search, status, priority]);

  async function loadOrders() {
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (status) params.append("status", status);
      if (priority) params.append("priority", priority);

      const response = await fetch(`/api/orders?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setOrders(data.data);
        // 计算统计数据
        const counts = data.data.reduce(
          (acc: any, order: Order) => {
            if (order.status === "pending") acc.pending++;
            if (order.status === "designing") acc.designing++;
            if (order.status === "reviewing") acc.reviewing++;
            if (order.status === "completed") acc.completed++;
            return acc;
          },
          { pending: 0, designing: 0, reviewing: 0, completed: 0 }
        );
        setStats(counts);
      }
    } catch (error) {
      console.error("加载订单列表失败:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("确定要删除这个订单吗？")) return;

    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success) {
        alert("删除成功");
        loadOrders();
      } else {
        alert(data.error || "删除失败");
      }
    } catch (error) {
      console.error("删除订单失败:", error);
      alert("删除失败");
    }
  }

  function handleEdit(order: Order) {
    setEditingOrder(order);
    setShowModal(true);
  }

  function handleAdd() {
    setEditingOrder(null);
    setShowModal(true);
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">订单管理</h2>
          <p className="mt-1 text-sm text-gray-600">管理所有订单信息</p>
        </div>
        <button
          onClick={handleAdd}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          + 新增订单
        </button>
      </div>

      {/* 统计卡片 */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <div className="text-sm font-medium text-gray-600">待确认</div>
          <div className="mt-2 text-2xl font-bold text-gray-600">{stats.pending}</div>
        </div>
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <div className="text-sm font-medium text-gray-600">制作中</div>
          <div className="mt-2 text-2xl font-bold text-blue-600">{stats.designing}</div>
        </div>
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <div className="text-sm font-medium text-gray-600">审核中</div>
          <div className="mt-2 text-2xl font-bold text-purple-600">{stats.reviewing}</div>
        </div>
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <div className="text-sm font-medium text-gray-600">已完成</div>
          <div className="mt-2 text-2xl font-bold text-green-600">{stats.completed}</div>
        </div>
      </div>

      {/* 筛选栏 */}
      <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="搜索订单号、标题、客户..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">所有状态</option>
            <option value="pending">待确认</option>
            <option value="confirmed">已确认</option>
            <option value="designing">制作中</option>
            <option value="reviewing">审核中</option>
            <option value="completed">已完成</option>
          </select>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">所有优先级</option>
            <option value="low">低</option>
            <option value="normal">普通</option>
            <option value="high">高</option>
            <option value="urgent">紧急</option>
          </select>
        </div>
      </div>

      {/* 订单列表 */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-500">加载中...</div>
        </div>
      ) : (
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
                  金额
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  优先级
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
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    暂无数据
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {order.orderNo}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{order.title}</div>
                      <div className="text-xs text-gray-500">
                        {order.slidesCount}页 | {order.style}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      ¥{parseFloat(order.totalAmount).toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          statusMap[order.status]?.color || "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {statusMap[order.status]?.label || order.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          priorityMap[order.priority]?.color || "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {priorityMap[order.priority]?.label || order.priority}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {new Date(order.deadline).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                      <button
                        onClick={() => handleEdit(order)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="ml-4 text-red-600 hover:text-red-900"
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* 编辑/新增弹窗 */}
      {showModal && (
        <OrderModal
          order={editingOrder}
          onClose={() => setShowModal(false)}
          onSave={() => {
            setShowModal(false);
            loadOrders();
          }}
        />
      )}
    </div>
  );
}

function OrderModal({
  order,
  onClose,
  onSave,
}: {
  order: Order | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const [formData, setFormData] = useState({
    orderNo: order?.orderNo || `ORD${Date.now()}`,
    title: order?.title || "",
    customerId: order?.customerId || "",
    totalAmount: order?.totalAmount || "",
    status: order?.status || "pending",
    priority: order?.priority || "normal",
    deadline: order?.deadline
      ? new Date(order.deadline).toISOString().split("T")[0]
      : "",
    slidesCount: order?.slidesCount || 10,
    style: order?.style || "商务",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const url = order ? `/api/orders/${order.id}` : "/api/orders";
      const method = order ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          deadline: new Date(formData.deadline),
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert(order ? "更新成功" : "创建成功");
        onSave();
      } else {
        alert(data.error || "操作失败");
      }
    } catch (error) {
      console.error("操作失败:", error);
      alert("操作失败");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          {order ? "编辑订单" : "新增订单"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              订单号 *
            </label>
            <input
              type="text"
              required
              value={formData.orderNo}
              onChange={(e) =>
                setFormData({ ...formData, orderNo: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              标题 *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              客户ID *
            </label>
            <input
              type="text"
              required
              value={formData.customerId}
              onChange={(e) =>
                setFormData({ ...formData, customerId: e.target.value })
              }
              placeholder="客户ID"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                金额 *
              </label>
              <input
                type="number"
                required
                value={formData.totalAmount}
                onChange={(e) =>
                  setFormData({ ...formData, totalAmount: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                页数
              </label>
              <input
                type="number"
                value={formData.slidesCount}
                onChange={(e) =>
                  setFormData({ ...formData, slidesCount: parseInt(e.target.value) || 10 })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                状态
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="pending">待确认</option>
                <option value="confirmed">已确认</option>
                <option value="designing">制作中</option>
                <option value="reviewing">审核中</option>
                <option value="completed">已完成</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                优先级
              </label>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="low">低</option>
                <option value="normal">普通</option>
                <option value="high">高</option>
                <option value="urgent">紧急</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                截止日期 *
              </label>
              <input
                type="date"
                required
                value={formData.deadline}
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                风格
              </label>
              <select
                value={formData.style}
                onChange={(e) =>
                  setFormData({ ...formData, style: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="商务">商务</option>
                <option value="简约">简约</option>
                <option value="创意">创意</option>
                <option value="时尚">时尚</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              描述
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "保存中..." : "保存"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
