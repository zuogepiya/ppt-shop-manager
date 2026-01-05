import { getDb } from "./dbAdapter";
import { sql } from "drizzle-orm";
import {
  users,
  employees,
  customers,
  orders,
  financialRecords,
} from "./shared/schema";

/**
 * 初始化数据库表结构
 */
export async function initDatabase() {
  const db = await getDb();

  try {
    // 创建用户表
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL DEFAULT 'employee',
        employee_id VARCHAR(36),
        is_active BOOLEAN DEFAULT true NOT NULL,
        last_login_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE
      )
    `);
    console.log('✅ Users table created');

    // 创建索引
    await db.execute(sql`CREATE INDEX IF NOT EXISTS users_username_idx ON users(username)`);
    await db.execute(sql`CREATE INDEX IF NOT EXISTS users_role_idx ON users(role)`);

    // 创建员工表
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS employees (
        id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        email VARCHAR(100),
        department VARCHAR(50),
        position VARCHAR(50),
        base_salary DECIMAL(10,2) DEFAULT 0,
        commission_rate DECIMAL(5,4) DEFAULT 0.0000,
        join_date TIMESTAMP WITH TIME ZONE,
        status VARCHAR(20) DEFAULT 'active',
        metadata JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE
      )
    `);
    console.log('✅ Employees table created');

    // 创建索引
    await db.execute(sql`CREATE INDEX IF NOT EXISTS employees_name_idx ON employees(name)`);
    await db.execute(sql`CREATE INDEX IF NOT EXISTS employees_department_idx ON employees(department)`);

    // 创建客户表
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS customers (
        id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL,
        contact VARCHAR(20) NOT NULL,
        platform VARCHAR(50),
        platform_id VARCHAR(100),
        source VARCHAR(50),
        notes TEXT,
        status VARCHAR(20) DEFAULT 'potential',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE
      )
    `);
    console.log('✅ Customers table created');

    // 创建索引
    await db.execute(sql`CREATE INDEX IF NOT EXISTS customers_name_idx ON customers(name)`);
    await db.execute(sql`CREATE INDEX IF NOT EXISTS customers_platform_idx ON customers(platform)`);

    // 创建订单表
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
        order_no VARCHAR(50) NOT NULL UNIQUE,
        customer_id VARCHAR(36) NOT NULL,
        cs_id VARCHAR(36),
        designer_id VARCHAR(36),
        manager_id VARCHAR(36),
        title VARCHAR(200) NOT NULL,
        description TEXT NOT NULL,
        slides_count INTEGER DEFAULT 0,
        style VARCHAR(50),
        requirements TEXT,
        total_amount DECIMAL(10,2) DEFAULT 0,
        paid_amount DECIMAL(10,2) DEFAULT 0,
        commission_amount DECIMAL(10,2),
        designer_fee DECIMAL(10,2),
        deadline TIMESTAMP WITH TIME ZONE,
        delivery_date TIMESTAMP WITH TIME ZONE,
        status VARCHAR(30) DEFAULT 'pending' NOT NULL,
        priority VARCHAR(20) DEFAULT 'normal',
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE
      )
    `);
    console.log('✅ Orders table created');

    // 创建索引
    await db.execute(sql`CREATE INDEX IF NOT EXISTS orders_order_no_idx ON orders(order_no)`);
    await db.execute(sql`CREATE INDEX IF NOT EXISTS orders_customer_id_idx ON orders(customer_id)`);
    await db.execute(sql`CREATE INDEX IF NOT EXISTS orders_cs_id_idx ON orders(cs_id)`);
    await db.execute(sql`CREATE INDEX IF NOT EXISTS orders_designer_id_idx ON orders(designer_id)`);
    await db.execute(sql`CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status)`);
    await db.execute(sql`CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders(created_at)`);

    // 创建财务记录表
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS financial_records (
        id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
        record_no VARCHAR(50) NOT NULL UNIQUE,
        order_id VARCHAR(36),
        employee_id VARCHAR(36),
        type VARCHAR(20) NOT NULL,
        category VARCHAR(50),
        amount DECIMAL(10,2) NOT NULL,
        direction VARCHAR(10) NOT NULL,
        transaction_date TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
        description TEXT NOT NULL,
        reference VARCHAR(200),
        status VARCHAR(20) DEFAULT 'completed',
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE
      )
    `);
    console.log('✅ Financial records table created');

    // 创建索引
    await db.execute(sql`CREATE INDEX IF NOT EXISTS financial_records_record_no_idx ON financial_records(record_no)`);
    await db.execute(sql`CREATE INDEX IF NOT EXISTS financial_records_type_idx ON financial_records(type)`);
    await db.execute(sql`CREATE INDEX IF NOT EXISTS financial_records_transaction_date_idx ON financial_records(transaction_date)`);
    await db.execute(sql`CREATE INDEX IF NOT EXISTS financial_records_order_id_idx ON financial_records(order_id)`);
    await db.execute(sql`CREATE INDEX IF NOT EXISTS financial_records_employee_id_idx ON financial_records(employee_id)`);

    console.log('\n✅ Database initialized successfully!\n');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
}
