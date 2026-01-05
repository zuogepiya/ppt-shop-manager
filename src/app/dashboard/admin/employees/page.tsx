"use client";

import { useState, useEffect } from "react";

interface Employee {
  id: string;
  name: string;
  phone: string;
  email: string;
  department: string;
  position: string;
  baseSalary: string;
  commissionRate: string;
  joinDate: Date;
  status: string;
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  // 加载员工列表
  useEffect(() => {
    loadEmployees();
  }, [search, department, position]);

  async function loadEmployees() {
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (department) params.append("department", department);
      if (position) params.append("position", position);

      const response = await fetch(`/api/employees?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setEmployees(data.data);
      }
    } catch (error) {
      console.error("加载员工列表失败:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("确定要删除这个员工吗？")) return;

    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success) {
        alert("删除成功");
        loadEmployees();
      } else {
        alert(data.error || "删除失败");
      }
    } catch (error) {
      console.error("删除员工失败:", error);
      alert("删除失败");
    }
  }

  function handleEdit(employee: Employee) {
    setEditingEmployee(employee);
    setShowModal(true);
  }

  function handleAdd() {
    setEditingEmployee(null);
    setShowModal(true);
  }

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-blue-100 text-blue-600",
      "bg-purple-100 text-purple-600",
      "bg-green-100 text-green-600",
      "bg-orange-100 text-orange-600",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">员工管理</h2>
          <p className="mt-1 text-sm text-gray-600">管理所有员工信息</p>
        </div>
        <button
          onClick={handleAdd}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">所有部门</option>
            <option value="客服部">客服部</option>
            <option value="设计部">设计部</option>
            <option value="管理部">管理部</option>
          </select>
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">所有职位</option>
            <option value="客服">客服</option>
            <option value="设计师">设计师</option>
            <option value="管理者">管理者</option>
          </select>
        </div>
      </div>

      {/* 员工列表 */}
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
              {employees.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    暂无数据
                  </td>
                </tr>
              ) : (
                employees.map((employee) => (
                  <tr key={employee.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${getAvatarColor(
                              employee.name
                            )}`}
                          >
                            {employee.name[0]}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {employee.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(employee.joinDate).toLocaleDateString()} 入职
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {employee.department}
                      </div>
                      <div className="text-sm text-gray-500">
                        {employee.position}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {employee.phone}
                      </div>
                      <div className="text-sm text-gray-500">
                        {employee.email}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      ¥{parseFloat(employee.baseSalary).toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {(parseFloat(employee.commissionRate) * 100).toFixed(0)}%
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {employee.status === "active" ? (
                        <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                          在职
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-800">
                          离职
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                      <button
                        onClick={() => handleEdit(employee)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => handleDelete(employee.id)}
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
        <EmployeeModal
          employee={editingEmployee}
          onClose={() => setShowModal(false)}
          onSave={() => {
            setShowModal(false);
            loadEmployees();
          }}
        />
      )}
    </div>
  );
}

function EmployeeModal({
  employee,
  onClose,
  onSave,
}: {
  employee: Employee | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const [formData, setFormData] = useState({
    name: employee?.name || "",
    phone: employee?.phone || "",
    email: employee?.email || "",
    department: employee?.department || "",
    position: employee?.position || "",
    baseSalary: employee?.baseSalary || "",
    commissionRate: employee?.commissionRate || "",
    status: employee?.status || "active",
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const url = employee
        ? `/api/employees/${employee.id}`
        : "/api/employees";
      const method = employee ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert(employee ? "更新成功" : "创建成功");
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
          {employee ? "编辑员工" : "新增员工"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              姓名 *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              电话 *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              邮箱 *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                部门
              </label>
              <select
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="客服部">客服部</option>
                <option value="设计部">设计部</option>
                <option value="管理部">管理部</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                职位
              </label>
              <select
                value={formData.position}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="客服">客服</option>
                <option value="设计师">设计师</option>
                <option value="管理者">管理者</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                基本薪资
              </label>
              <input
                type="number"
                value={formData.baseSalary}
                onChange={(e) =>
                  setFormData({ ...formData, baseSalary: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                提成比例
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.commissionRate}
                onChange={(e) =>
                  setFormData({ ...formData, commissionRate: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
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
              <option value="active">在职</option>
              <option value="inactive">离职</option>
            </select>
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
