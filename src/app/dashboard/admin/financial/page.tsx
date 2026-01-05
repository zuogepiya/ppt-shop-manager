"use client";

import { useState, useEffect } from "react";

interface FinancialRecord {
  id: string;
  recordNo: string;
  type: string;
  category: string;
  amount: string;
  direction: string;
  description: string;
  transactionDate: Date;
  status: string;
  orderId?: string;
  employeeId?: string;
}

const typeMap: Record<string, { label: string; color: string }> = {
  income: { label: "收入", color: "bg-green-100 text-green-800" },
  expense: { label: "支出", color: "bg-red-100 text-red-800" },
  commission: { label: "提成", color: "bg-blue-100 text-blue-800" },
  salary: { label: "工资", color: "bg-purple-100 text-purple-800" },
};

const directionMap: Record<string, { label: string; color: string }> = {
  in: { label: "收入", color: "bg-green-100 text-green-800" },
  out: { label: "支出", color: "bg-red-100 text-red-800" },
};

export default function FinancialPage() {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("");
  const [direction, setDirection] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState<FinancialRecord | null>(null);
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    profit: 0,
  });

  useEffect(() => {
    loadRecords();
    loadStats();
  }, [type, direction, startDate, endDate]);

  async function loadRecords() {
    try {
      const params = new URLSearchParams();
      if (type) params.append("type", type);
      if (direction) params.append("direction", direction);

      const response = await fetch(`/api/financial?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setRecords(data.data);
      }
    } catch (error) {
      console.error("加载财务记录失败:", error);
    } finally {
      setLoading(false);
    }
  }

  async function loadStats() {
    try {
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      const response = await fetch(`/api/financial/stats?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error("加载统计数据失败:", error);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("确定要删除这条记录吗？")) return;

    try {
      const response = await fetch(`/api/financial/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success) {
        alert("删除成功");
        loadRecords();
        loadStats();
      } else {
        alert(data.error || "删除失败");
      }
    } catch (error) {
      console.error("删除记录失败:", error);
      alert("删除失败");
    }
  }

  function handleEdit(record: FinancialRecord) {
    setEditingRecord(record);
    setShowModal(true);
  }

  function handleAdd() {
    setEditingRecord(null);
    setShowModal(true);
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">财务管理</h2>
          <p className="mt-1 text-sm text-gray-600">查看财务记录和报表</p>
        </div>
        <button
          onClick={handleAdd}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          + 新增记录
        </button>
      </div>

      {/* 统计卡片 */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-600">总收入</div>
              <div className="mt-2 text-2xl font-bold text-green-600">
                ¥{stats.totalIncome.toLocaleString()}
              </div>
            </div>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              ↗
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-600">总支出</div>
              <div className="mt-2 text-2xl font-bold text-red-600">
                ¥{stats.totalExpense.toLocaleString()}
              </div>
            </div>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              ↘
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-600">净利润</div>
              <div className="mt-2 text-2xl font-bold text-blue-600">
                ¥{stats.profit.toLocaleString()}
              </div>
            </div>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              💰
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-600">记录数量</div>
              <div className="mt-2 text-2xl font-bold text-purple-600">
                {records.length}
              </div>
            </div>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
              📊
            </div>
          </div>
        </div>
      </div>

      {/* 筛选栏 */}
      <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-4">
          <div>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">所有类型</option>
            <option value="income">收入</option>
            <option value="expense">支出</option>
            <option value="commission">提成</option>
            <option value="salary">工资</option>
          </select>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">所有方向</option>
            <option value="in">收入</option>
            <option value="out">支出</option>
          </select>
        </div>
      </div>

      {/* 财务记录列表 */}
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
                  记录号
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  类型
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  方向
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  金额
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  描述
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  日期
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {records.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    暂无数据
                  </td>
                </tr>
              ) : (
                records.map((record) => (
                  <tr key={record.id}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {record.recordNo}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          typeMap[record.type]?.color || "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {typeMap[record.type]?.label || record.type}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          directionMap[record.direction]?.color ||
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {directionMap[record.direction]?.label || record.direction}
                      </span>
                    </td>
                    <td
                      className={`whitespace-nowrap px-6 py-4 text-sm font-medium ${
                        record.direction === "in" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {record.direction === "in" ? "+" : "-"}¥
                      {parseFloat(record.amount).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {record.description}
                      </div>
                      <div className="text-xs text-gray-500">{record.category}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {new Date(record.transactionDate).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                      <button
                        onClick={() => handleEdit(record)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => handleDelete(record.id)}
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
        <FinancialModal
          record={editingRecord}
          onClose={() => setShowModal(false)}
          onSave={() => {
            setShowModal(false);
            loadRecords();
            loadStats();
          }}
        />
      )}
    </div>
  );
}

function FinancialModal({
  record,
  onClose,
  onSave,
}: {
  record: FinancialRecord | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const [formData, setFormData] = useState({
    recordNo: record?.recordNo || `FIN${Date.now()}`,
    type: record?.type || "income",
    category: record?.category || "",
    amount: record?.amount || "",
    direction: record?.direction || "in",
    description: record?.description || "",
    transactionDate: record?.transactionDate
      ? new Date(record.transactionDate).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    status: record?.status || "completed",
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const url = record ? `/api/financial/${record.id}` : "/api/financial";
      const method = record ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          transactionDate: new Date(formData.transactionDate),
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert(record ? "更新成功" : "创建成功");
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
          {record ? "编辑财务记录" : "新增财务记录"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              记录号 *
            </label>
            <input
              type="text"
              required
              value={formData.recordNo}
              onChange={(e) =>
                setFormData({ ...formData, recordNo: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                类型 *
              </label>
              <select
                required
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="income">收入</option>
                <option value="expense">支出</option>
                <option value="commission">提成</option>
                <option value="salary">工资</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                方向 *
              </label>
              <select
                required
                value={formData.direction}
                onChange={(e) =>
                  setFormData({ ...formData, direction: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="in">收入</option>
                <option value="out">支出</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                金额 *
              </label>
              <input
                type="number"
                required
                step="0.01"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                日期 *
              </label>
              <input
                type="date"
                required
                value={formData.transactionDate}
                onChange={(e) =>
                  setFormData({ ...formData, transactionDate: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              分类
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              placeholder="例如：订单收入、员工工资"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              描述 *
            </label>
            <textarea
              rows={3}
              required
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
