import { NextRequest, NextResponse } from "next/server";
import {
  userManager,
  employeeManager,
  customerManager,
  orderManager,
  financialManager,
} from "@/storage/database";

export async function POST() {
  try {
    // 创建员工
    const emp1 = await employeeManager.createEmployee({
      name: "张三",
      phone: "13800138001",
      email: "zhangsan@example.com",
      department: "客服部",
      position: "客服",
      baseSalary: "5000.00",
      commissionRate: "0.0500",
      joinDate: new Date("2023-01-15"),
      status: "active",
    });

    const emp2 = await employeeManager.createEmployee({
      name: "李四",
      phone: "13800138002",
      email: "lisi@example.com",
      department: "设计部",
      position: "设计师",
      baseSalary: "8000.00",
      commissionRate: "0.0800",
      joinDate: new Date("2023-03-20"),
      status: "active",
    });

    const emp3 = await employeeManager.createEmployee({
      name: "王五",
      phone: "13800138003",
      email: "wangwu@example.com",
      department: "管理部",
      position: "管理者",
      baseSalary: "15000.00",
      commissionRate: "0.1000",
      joinDate: new Date("2022-06-10"),
      status: "active",
    });

    const emp4 = await employeeManager.createEmployee({
      name: "赵六",
      phone: "13800138004",
      email: "zhaoliu@example.com",
      department: "设计部",
      position: "设计师",
      baseSalary: "7500.00",
      commissionRate: "0.0800",
      joinDate: new Date("2023-05-12"),
      status: "active",
    });

    // 创建用户
    await userManager.createUser({
      username: "admin",
      password: "admin123",
      role: "admin",
    });

    await userManager.createUser({
      username: "manager",
      password: "manager123",
      role: "manager",
      employeeId: emp3.id,
    });

    await userManager.createUser({
      username: "cs",
      password: "cs123",
      role: "cs",
      employeeId: emp1.id,
    });

    await userManager.createUser({
      username: "designer",
      password: "designer123",
      role: "designer",
      employeeId: emp2.id,
    });

    // 创建客户
    const cust1 = await customerManager.createCustomer({
      name: "张三",
      contact: "13900139001",
      platform: "xiaohongshu",
      platformId: "xhs001",
      source: "小红书私信",
      status: "active",
    });

    const cust2 = await customerManager.createCustomer({
      name: "李四",
      contact: "13900139002",
      platform: "douyin",
      platformId: "dy001",
      source: "抖音直播",
      status: "active",
    });

    const cust3 = await customerManager.createCustomer({
      name: "王五",
      contact: "13900139003",
      platform: "wechat",
      platformId: "wx001",
      source: "微信朋友圈",
      status: "active",
    });

    // 获取CS和管理者用户ID（用于分配订单）
    const csUser = await userManager.getUserByUsername("cs");
    const managerUser = await userManager.getUserByUsername("manager");
    const designerUser = await userManager.getUserByUsername("designer");

    // 创建订单
    const order1 = await orderManager.createOrder({
      orderNo: "ORD2025010001",
      customerId: cust1.id,
      csId: csUser?.id,
      designerId: emp2.id,
      managerId: managerUser?.id,
      title: "年度商业计划书PPT",
      description: "制作一份专业的年度商业计划书PPT，包含公司简介、业务分析、发展规划等内容",
      slidesCount: 20,
      style: "商务",
      requirements: "需要高端大气的设计风格，数据可视化清晰",
      totalAmount: "5000.00",
      paidAmount: "5000.00",
      commissionAmount: "250.00",
      designerFee: "400.00",
      deadline: new Date("2025-01-20"),
      status: "designing",
      priority: "urgent",
    });

    const order2 = await orderManager.createOrder({
      orderNo: "ORD2025010002",
      customerId: cust2.id,
      csId: csUser?.id,
      designerId: emp4.id,
      managerId: managerUser?.id,
      title: "产品发布会PPT",
      description: "新品发布会的演示PPT，需要创意的设计风格",
      slidesCount: 30,
      style: "创意",
      requirements: "需要包含产品展示、功能介绍和市场定位等内容，要求动态效果",
      totalAmount: "8000.00",
      paidAmount: "8000.00",
      commissionAmount: "400.00",
      designerFee: "640.00",
      deadline: new Date("2025-01-18"),
      status: "completed",
      priority: "normal",
    });

    const order3 = await orderManager.createOrder({
      orderNo: "ORD2025010003",
      customerId: cust3.id,
      csId: csUser?.id,
      designerId: emp2.id,
      managerId: managerUser?.id,
      title: "融资路演PPT",
      description: "专业的投融资路演PPT，突出项目核心竞争力",
      slidesCount: 40,
      style: "简约",
      requirements: "需要高端大气的设计，数据可视化清晰",
      totalAmount: "12000.00",
      paidAmount: "6000.00",
      commissionAmount: "600.00",
      designerFee: "960.00",
      deadline: new Date("2025-01-22"),
      status: "reviewing",
      priority: "high",
    });

    // 创建财务记录
    await financialManager.createFinancialRecord({
      recordNo: "FIN2025010001",
      orderId: order1.id,
      type: "income",
      category: "订单收入",
      amount: "5000.00",
      direction: "in",
      description: "订单收入 - ORD2025010001 年度商业计划书PPT",
      status: "completed",
    });

    await financialManager.createFinancialRecord({
      recordNo: "FIN2025010002",
      employeeId: emp1.id,
      type: "salary",
      category: "员工工资",
      amount: "5000.00",
      direction: "out",
      description: "员工工资 - 张三 2025年1月份工资",
      status: "completed",
    });

    await financialManager.createFinancialRecord({
      recordNo: "FIN2025010003",
      orderId: order2.id,
      employeeId: emp2.id,
      type: "commission",
      category: "设计师提成",
      amount: "640.00",
      direction: "out",
      description: "设计师提成 - 李四 订单 ORD2025010002 提成",
      status: "completed",
    });

    await financialManager.createFinancialRecord({
      recordNo: "FIN2025010004",
      orderId: order2.id,
      type: "income",
      category: "订单收入",
      amount: "8000.00",
      direction: "in",
      description: "订单收入 - ORD2025010002 产品发布会PPT",
      status: "completed",
    });

    return NextResponse.json({
      success: true,
      message: "演示数据初始化成功",
      data: {
        users: 4,
        employees: 4,
        customers: 3,
        orders: 3,
        financialRecords: 4,
      },
    });
  } catch (error) {
    console.error("初始化数据错误:", error);
    return NextResponse.json(
      { error: "初始化数据失败", details: String(error) },
      { status: 500 }
    );
  }
}
