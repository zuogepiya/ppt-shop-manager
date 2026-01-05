import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  varchar,
  timestamp,
  boolean,
  integer,
  decimal,
  jsonb,
  index,
} from "drizzle-orm/pg-core";
import { createSchemaFactory } from "drizzle-zod";
import { z } from "zod";

// 用户表（登录账号）
export const users = pgTable(
  "users",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    username: varchar("username", { length: 50 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    role: varchar("role", { length: 20 })
      .notNull()
      .default("employee"), // admin, manager, cs, designer
    employeeId: varchar("employee_id", { length: 36 }), // 关联员工表
    isActive: boolean("is_active").default(true).notNull(),
    lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => ({
    usernameIdx: index("users_username_idx").on(table.username),
    roleIdx: index("users_role_idx").on(table.role),
  })
);

// 员工表
export const employees = pgTable(
  "employees",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    name: varchar("name", { length: 100 }).notNull(),
    phone: varchar("phone", { length: 20 }),
    email: varchar("email", { length: 100 }),
    department: varchar("department", { length: 50 }),
    position: varchar("position", { length: 50 }),
    baseSalary: decimal("base_salary", { precision: 10, scale: 2 }).default("0"),
    commissionRate: decimal("commission_rate", { precision: 5, scale: 4 }).default(
      "0.0000"
    ),
    joinDate: timestamp("join_date", { withTimezone: true }),
    status: varchar("status", { length: 20 }).default("active"), // active, resigned, suspended
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => ({
    nameIdx: index("employees_name_idx").on(table.name),
    departmentIdx: index("employees_department_idx").on(table.department),
  })
);

// 客户表
export const customers = pgTable(
  "customers",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    name: varchar("name", { length: 100 }).notNull(),
    contact: varchar("contact", { length: 20 }).notNull(),
    platform: varchar("platform", { length: 50 }), // xiaohongshu, douyin, wechat等
    platformId: varchar("platform_id", { length: 100 }),
    source: varchar("source", { length: 50 }), // 客户来源
    notes: text("notes"),
    status: varchar("status", { length: 20 }).default("potential"), // potential, active, inactive
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => ({
    nameIdx: index("customers_name_idx").on(table.name),
    platformIdx: index("customers_platform_idx").on(table.platform),
  })
);

// 订单表
export const orders = pgTable(
  "orders",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    orderNo: varchar("order_no", { length: 50 }).notNull().unique(),
    customerId: varchar("customer_id", { length: 36 }).notNull(),
    csId: varchar("cs_id", { length: 36 }), // 客服负责人
    designerId: varchar("designer_id", { length: 36 }), // 设计师负责人
    managerId: varchar("manager_id", { length: 36 }), // 管理者审核人

    // PPT需求
    title: varchar("title", { length: 200 }).notNull(),
    description: text("description").notNull(),
    slidesCount: integer("slides_count").default(0),
    style: varchar("style", { length: 50 }), // 商务、简约、创意等
    requirements: text("requirements"), // 特殊要求

    // 价格信息
    totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).default(
      "0"
    ),
    paidAmount: decimal("paid_amount", { precision: 10, scale: 2 }).default(
      "0"
    ),
    commissionAmount: decimal("commission_amount", { precision: 10, scale: 2 }),
    designerFee: decimal("designer_fee", { precision: 10, scale: 2 }),

    // 时间信息
    deadline: timestamp("deadline", { withTimezone: true }),
    deliveryDate: timestamp("delivery_date", { withTimezone: true }),

    // 状态
    status: varchar("status", { length: 30 })
      .default("pending")
      .notNull(), // pending, confirmed, designing, reviewing, completed, cancelled
    priority: varchar("priority", { length: 20 }).default("normal"), // low, normal, high, urgent

    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => ({
    orderNoIdx: index("orders_order_no_idx").on(table.orderNo),
    customerIdIdx: index("orders_customer_id_idx").on(table.customerId),
    csIdIdx: index("orders_cs_id_idx").on(table.csId),
    designerIdIdx: index("orders_designer_id_idx").on(table.designerId),
    statusIdx: index("orders_status_idx").on(table.status),
    createdAtIdx: index("orders_created_at_idx").on(table.createdAt),
  })
);

// 财务记录表
export const financialRecords = pgTable(
  "financial_records",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    recordNo: varchar("record_no", { length: 50 }).notNull().unique(),
    orderId: varchar("order_id", { length: 36 }), // 关联订单
    employeeId: varchar("employee_id", { length: 36 }), // 关联员工

    // 财务信息
    type: varchar("type", { length: 20 }).notNull(), // income, expense, commission, salary
    category: varchar("category", { length: 50 }), // 具体分类
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    direction: varchar("direction", { length: 10 }).notNull(), // in, out

    // 日期和描述
    transactionDate: timestamp("transaction_date", { withTimezone: true })
      .defaultNow()
      .notNull(),
    description: text("description").notNull(),
    reference: varchar("reference", { length: 200 }), // 关联参考号

    // 状态
    status: varchar("status", { length: 20 }).default("completed"), // pending, completed, cancelled

    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => ({
    recordNoIdx: index("financial_records_record_no_idx").on(table.recordNo),
    typeIdx: index("financial_records_type_idx").on(table.type),
    transactionDateIdx: index("financial_records_transaction_date_idx").on(
      table.transactionDate
    ),
    orderIdIdx: index("financial_records_order_id_idx").on(table.orderId),
    employeeIdIdx: index("financial_records_employee_id_idx").on(
      table.employeeId
    ),
  })
);

// Zod schemas for validation
const { createInsertSchema: createCoercedInsertSchema } =
  createSchemaFactory({
    coerce: { date: true },
  });

// User schemas
export const insertUserSchema = createCoercedInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
  employeeId: true,
});

export const updateUserSchema = createCoercedInsertSchema(users)
  .pick({
    password: true,
    role: true,
    employeeId: true,
    isActive: true,
    lastLoginAt: true,
  })
  .partial();

// Employee schemas
export const insertEmployeeSchema = createCoercedInsertSchema(employees).pick({
  name: true,
  phone: true,
  email: true,
  department: true,
  position: true,
  baseSalary: true,
  commissionRate: true,
  joinDate: true,
  status: true,
  metadata: true,
});

export const updateEmployeeSchema = createCoercedInsertSchema(employees)
  .pick({
    name: true,
    phone: true,
    email: true,
    department: true,
    position: true,
    baseSalary: true,
    commissionRate: true,
    joinDate: true,
    status: true,
    metadata: true,
  })
  .partial();

// Customer schemas
export const insertCustomerSchema = createCoercedInsertSchema(customers).pick({
  name: true,
  contact: true,
  platform: true,
  platformId: true,
  source: true,
  notes: true,
  status: true,
});

export const updateCustomerSchema = createCoercedInsertSchema(customers)
  .pick({
    name: true,
    contact: true,
    platform: true,
    platformId: true,
    source: true,
    notes: true,
    status: true,
  })
  .partial();

// Order schemas
export const insertOrderSchema = createCoercedInsertSchema(orders).pick({
  orderNo: true,
  customerId: true,
  csId: true,
  designerId: true,
  managerId: true,
  title: true,
  description: true,
  slidesCount: true,
  style: true,
  requirements: true,
  totalAmount: true,
  paidAmount: true,
  commissionAmount: true,
  designerFee: true,
  deadline: true,
  deliveryDate: true,
  status: true,
  priority: true,
  notes: true,
});

export const updateOrderSchema = createCoercedInsertSchema(orders)
  .pick({
    customerId: true,
    csId: true,
    designerId: true,
    managerId: true,
    title: true,
    description: true,
    slidesCount: true,
    style: true,
    requirements: true,
    totalAmount: true,
    paidAmount: true,
    commissionAmount: true,
    designerFee: true,
    deadline: true,
    deliveryDate: true,
    status: true,
    priority: true,
    notes: true,
  })
  .partial();

// Financial record schemas
export const insertFinancialRecordSchema =
  createCoercedInsertSchema(financialRecords).pick({
    recordNo: true,
    orderId: true,
    employeeId: true,
    type: true,
    category: true,
    amount: true,
    direction: true,
    transactionDate: true,
    description: true,
    reference: true,
    status: true,
    notes: true,
  });

export const updateFinancialRecordSchema =
  createCoercedInsertSchema(financialRecords)
    .pick({
      orderId: true,
      employeeId: true,
      type: true,
      category: true,
      amount: true,
      direction: true,
      transactionDate: true,
      description: true,
      reference: true,
      status: true,
      notes: true,
    })
    .partial();

// TypeScript types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;

export type Employee = typeof employees.$inferSelect;
export type InsertEmployee = z.infer<typeof insertEmployeeSchema>;
export type UpdateEmployee = z.infer<typeof updateEmployeeSchema>;

export type Customer = typeof customers.$inferSelect;
export type InsertCustomer = z.infer<typeof insertCustomerSchema>;
export type UpdateCustomer = z.infer<typeof updateCustomerSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type UpdateOrder = z.infer<typeof updateOrderSchema>;

export type FinancialRecord = typeof financialRecords.$inferSelect;
export type InsertFinancialRecord = z.infer<typeof insertFinancialRecordSchema>;
export type UpdateFinancialRecord = z.infer<typeof updateFinancialRecordSchema>;




