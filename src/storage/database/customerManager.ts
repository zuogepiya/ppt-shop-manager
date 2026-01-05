import { eq, and, SQL, like } from "drizzle-orm";
import { getDb } from "coze-coding-dev-sdk";
import {
  customers,
  insertCustomerSchema,
  updateCustomerSchema,
} from "./shared/schema";
import type { Customer, InsertCustomer, UpdateCustomer } from "./shared/schema";

export class CustomerManager {
  async createCustomer(data: InsertCustomer): Promise<Customer> {
    const db = await getDb();
    const validated = insertCustomerSchema.parse(data);
    const [customer] = await db.insert(customers).values(validated).returning();
    return customer;
  }

  async getCustomers(options: {
    skip?: number;
    limit?: number;
    filters?: Partial<
      Pick<Customer, "id" | "platform" | "source" | "status">
    >;
    search?: string;
  } = {}): Promise<Customer[]> {
    const { skip = 0, limit = 100, filters = {}, search } = options;
    const db = await getDb();

    const conditions: SQL[] = [];
    if (filters.id !== undefined) {
      conditions.push(eq(customers.id, filters.id));
    }
    if (filters.platform !== undefined && filters.platform !== null) {
      conditions.push(eq(customers.platform, filters.platform));
    }
    if (filters.source !== undefined && filters.source !== null) {
      conditions.push(eq(customers.source, filters.source));
    }
    if (filters.status !== undefined && filters.status !== null) {
      conditions.push(eq(customers.status, filters.status));
    }

    // 搜索支持姓名、联系方式
    if (search) {
      conditions.push(like(customers.name, `%${search}%`));
    }

    const query = db.select().from(customers);
    if (conditions.length > 0) {
      query.where(and(...conditions));
    }

    return query.limit(limit).offset(skip);
  }

  async getCustomerById(id: string): Promise<Customer | null> {
    const db = await getDb();
    const [customer] = await db
      .select()
      .from(customers)
      .where(eq(customers.id, id));
    return customer || null;
  }

  async updateCustomer(id: string, data: UpdateCustomer): Promise<Customer | null> {
    const db = await getDb();
    const validated = updateCustomerSchema.parse(data);
    const [customer] = await db
      .update(customers)
      .set({ ...validated, updatedAt: new Date() })
      .where(eq(customers.id, id))
      .returning();
    return customer || null;
  }

  async deleteCustomer(id: string): Promise<boolean> {
    const db = await getDb();
    const result = await db.delete(customers).where(eq(customers.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getCustomerOptions(): Promise<{ id: string; name: string }[]> {
    const db = await getDb();
    return db
      .select({
        id: customers.id,
        name: customers.name,
      })
      .from(customers)
      .where(eq(customers.status, "active"))
      .orderBy(customers.name);
  }
}

export const customerManager = new CustomerManager();
