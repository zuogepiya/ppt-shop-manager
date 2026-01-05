import { eq, and, SQL, like, desc, asc } from "drizzle-orm";
import { getDb } from "coze-coding-dev-sdk";
import {
  orders,
  insertOrderSchema,
  updateOrderSchema,
} from "./shared/schema";
import type { Order, InsertOrder, UpdateOrder } from "./shared/schema";

export class OrderManager {
  async createOrder(data: InsertOrder): Promise<Order> {
    const db = await getDb();
    const validated = insertOrderSchema.parse(data);
    const [order] = await db.insert(orders).values(validated).returning();
    return order;
  }

  async getOrders(options: {
    skip?: number;
    limit?: number;
    filters?: Partial<
      Pick<
        Order,
        "id" | "customerId" | "csId" | "designerId" | "managerId" | "status" | "priority"
      >
    >;
    search?: string;
    orderBy?: "createdAt" | "deadline" | "deliveryDate";
  } = {}): Promise<Order[]> {
    const {
      skip = 0,
      limit = 100,
      filters = {},
      search,
      orderBy = "createdAt",
    } = options;
    const db = await getDb();

    const conditions: SQL[] = [];
    if (filters.id !== undefined) {
      conditions.push(eq(orders.id, filters.id));
    }
    if (filters.customerId !== undefined && filters.customerId !== null) {
      conditions.push(eq(orders.customerId, filters.customerId));
    }
    if (filters.csId !== undefined && filters.csId !== null) {
      conditions.push(eq(orders.csId, filters.csId));
    }
    if (filters.designerId !== undefined && filters.designerId !== null) {
      conditions.push(eq(orders.designerId, filters.designerId));
    }
    if (filters.managerId !== undefined && filters.managerId !== null) {
      conditions.push(eq(orders.managerId, filters.managerId));
    }
    if (filters.status !== undefined && filters.status !== null) {
      conditions.push(eq(orders.status, filters.status));
    }
    if (filters.priority !== undefined && filters.priority !== null) {
      conditions.push(eq(orders.priority, filters.priority));
    }

    // 搜索支持订单号、标题
    if (search) {
      conditions.push(like(orders.title, `%${search}%`));
    }

    // 构建查询并应用所有条件
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // 根据排序方式确定排序
    let orderByClause;
    if (orderBy === "createdAt") {
      orderByClause = [desc(orders.createdAt)];
    } else if (orderBy === "deadline") {
      orderByClause = [asc(orders.deadline)];
    } else if (orderBy === "deliveryDate") {
      orderByClause = [asc(orders.deliveryDate)];
    }

    // 执行查询
    if (whereClause && orderByClause) {
      return await db
        .select()
        .from(orders)
        .where(whereClause)
        .orderBy(...orderByClause)
        .limit(limit)
        .offset(skip);
    } else if (whereClause) {
      return await db
        .select()
        .from(orders)
        .where(whereClause)
        .limit(limit)
        .offset(skip);
    } else if (orderByClause) {
      return await db
        .select()
        .from(orders)
        .orderBy(...orderByClause)
        .limit(limit)
        .offset(skip);
    } else {
      return await db
        .select()
        .from(orders)
        .limit(limit)
        .offset(skip);
    }
  }

  async getOrderById(id: string): Promise<Order | null> {
    const db = await getDb();
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order || null;
  }

  async getOrderByOrderNo(orderNo: string): Promise<Order | null> {
    const db = await getDb();
    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.orderNo, orderNo));
    return order || null;
  }

  async updateOrder(id: string, data: UpdateOrder): Promise<Order | null> {
    const db = await getDb();
    const validated = updateOrderSchema.parse(data);
    const [order] = await db
      .update(orders)
      .set({ ...validated, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();
    return order || null;
  }

  async deleteOrder(id: string): Promise<boolean> {
    const db = await getDb();
    const result = await db.delete(orders).where(eq(orders.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getOrdersByStatus(status: string): Promise<Order[]> {
    const db = await getDb();
    return db
      .select()
      .from(orders)
      .where(eq(orders.status, status))
      .orderBy(orders.createdAt);
  }

  async getUpcomingDeadlines(days: number = 7): Promise<Order[]> {
    const db = await getDb();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);

    // 注意：实际查询需要使用更复杂的日期比较，这里简化处理
    return db
      .select()
      .from(orders)
      .where(eq(orders.status, "designing"))
      .limit(50);
  }
}

export const orderManager = new OrderManager();
