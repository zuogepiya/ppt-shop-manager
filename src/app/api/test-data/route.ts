import { NextResponse } from "next/server";
import { getDb } from "coze-coding-dev-sdk";
import { sql } from "drizzle-orm";

export async function POST() {
  try {
    const db = await getDb();

    // 插入测试用户
    await db.execute(sql`
      INSERT INTO users (username, password, role, is_active)
      VALUES
        ('admin', 'admin123', 'admin', true),
        ('manager', 'manager123', 'manager', true),
        ('cs', 'cs123', 'cs', true),
        ('designer', 'designer123', 'designer', true)
      ON CONFLICT (username) DO NOTHING
    `);

    // 插入测试员工
    await db.execute(sql`
      INSERT INTO employees (name, phone, email, department, position, base_salary, commission_rate, join_date, status)
      VALUES
        ('张三', '13800138001', 'zhangsan@example.com', '客服部', '客服', '5000.00', '0.0500', '2023-01-15', 'active'),
        ('李四', '13800138002', 'lisi@example.com', '设计部', '设计师', '8000.00', '0.0800', '2023-03-20', 'active'),
        ('王五', '13800138003', 'wangwu@example.com', '管理部', '管理者', '15000.00', '0.1000', '2022-06-10', 'active'),
        ('赵六', '13800138004', 'zhaoliu@example.com', '设计部', '设计师', '7500.00', '0.0800', '2023-05-12', 'active')
      ON CONFLICT DO NOTHING
    `);

    // 插入测试客户
    await db.execute(sql`
      INSERT INTO customers (name, contact, platform, platform_id, source, status)
      VALUES
        ('张三', '13900139001', 'xiaohongshu', 'xhs001', '小红书私信', 'active'),
        ('李四', '13900139002', 'douyin', 'dy001', '抖音直播', 'active'),
        ('王五', '13900139003', 'wechat', 'wx001', '微信朋友圈', 'active')
      ON CONFLICT DO NOTHING
    `);

    // 插入测试订单
    await db.execute(sql`
      INSERT INTO orders (order_no, customer_id, cs_id, designer_id, manager_id, title, description, slides_count, style, requirements, total_amount, paid_amount, commission_amount, designer_fee, deadline, status, priority)
      VALUES
        ('ORD2025010001', (SELECT id FROM customers WHERE name = '张三' LIMIT 1), (SELECT id FROM users WHERE username = 'cs' LIMIT 1), (SELECT id FROM employees WHERE name = '李四' LIMIT 1), (SELECT id FROM users WHERE username = 'manager' LIMIT 1), '年度商业计划书PPT', '制作一份专业的年度商业计划书PPT，包含公司简介、业务分析、发展规划等内容', 20, '商务', '需要高端大气的设计风格，数据可视化清晰', '5000.00', '5000.00', '250.00', '400.00', '2025-01-20', 'designing', 'urgent'),
        ('ORD2025010002', (SELECT id FROM customers WHERE name = '李四' LIMIT 1), (SELECT id FROM users WHERE username = 'cs' LIMIT 1), (SELECT id FROM employees WHERE name = '赵六' LIMIT 1), (SELECT id FROM users WHERE username = 'manager' LIMIT 1), '产品发布会PPT', '新品发布会的演示PPT，需要创意的设计风格', 30, '创意', '需要包含产品展示、功能介绍和市场定位等内容，要求动态效果', '8000.00', '8000.00', '400.00', '640.00', '2025-01-18', 'completed', 'normal'),
        ('ORD2025010003', (SELECT id FROM customers WHERE name = '王五' LIMIT 1), (SELECT id FROM users WHERE username = 'cs' LIMIT 1), (SELECT id FROM employees WHERE name = '李四' LIMIT 1), (SELECT id FROM users WHERE username = 'manager' LIMIT 1), '融资路演PPT', '专业的投融资路演PPT，突出项目核心竞争力', 40, '简约', '需要高端大气的设计，数据可视化清晰', '12000.00', '6000.00', '600.00', '960.00', '2025-01-22', 'reviewing', 'high')
      ON CONFLICT (order_no) DO NOTHING
    `);

    // 插入测试财务记录
    await db.execute(sql`
      INSERT INTO financial_records (record_no, order_id, type, category, amount, direction, description, status)
      VALUES
        ('FIN2025010001', (SELECT id FROM orders WHERE order_no = 'ORD2025010001' LIMIT 1), 'income', '订单收入', '5000.00', 'in', '订单收入 - ORD2025010001 年度商业计划书PPT', 'completed'),
        ('FIN2025010002', (SELECT id FROM employees WHERE name = '张三' LIMIT 1), 'salary', '员工工资', '5000.00', 'out', '员工工资 - 张三 1月份', 'completed'),
        ('FIN2025010003', (SELECT id FROM orders WHERE order_no = 'ORD2025010002' LIMIT 1), 'income', '订单收入', '8000.00', 'in', '订单收入 - ORD2025010002 产品发布会PPT', 'completed'),
        ('FIN2025010004', (SELECT id FROM orders WHERE order_no = 'ORD2025010003' LIMIT 1), 'income', '订单收入', '6000.00', 'in', '订单收入 - ORD2025010003 融资路演PPT（部分付款）', 'completed')
      ON CONFLICT (record_no) DO NOTHING
    `);

    return NextResponse.json({
      success: true,
      message: "测试数据插入成功",
    });
  } catch (error) {
    console.error("Test data insertion error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "测试数据插入失败",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
