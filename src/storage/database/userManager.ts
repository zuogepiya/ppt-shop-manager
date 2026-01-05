import { eq, and, SQL, like, or } from "drizzle-orm";
import { getDb } from "coze-coding-dev-sdk";
import {
  users,
  insertUserSchema,
  updateUserSchema,
} from "./shared/schema";
import type { User, InsertUser, UpdateUser } from "./shared/schema";

export class UserManager {
  async createUser(data: InsertUser): Promise<User> {
    const db = await getDb();
    const validated = insertUserSchema.parse(data);
    const [user] = await db.insert(users).values(validated).returning();
    return user;
  }

  async getUsers(options: {
    skip?: number;
    limit?: number;
    filters?: Partial<Pick<User, "id" | "role" | "isActive" | "username">>;
    search?: string;
  } = {}): Promise<User[]> {
    const { skip = 0, limit = 100, filters = {}, search } = options;
    const db = await getDb();

    const conditions: SQL[] = [];
    if (filters.id !== undefined) {
      conditions.push(eq(users.id, filters.id));
    }
    if (filters.username !== undefined) {
      conditions.push(eq(users.username, filters.username));
    }
    if (filters.role !== undefined && filters.role !== null) {
      conditions.push(eq(users.role, filters.role));
    }
    if (filters.isActive !== undefined) {
      conditions.push(eq(users.isActive, filters.isActive));
    }

    // 搜索支持用户名
    if (search) {
      conditions.push(like(users.username, `%${search}%`));
    }

    const query = db.select().from(users);
    if (conditions.length > 0) {
      query.where(and(...conditions));
    }

    return query.limit(limit).offset(skip);
  }

  async getUserById(id: string): Promise<User | null> {
    const db = await getDb();
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || null;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const db = await getDb();
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    return user || null;
  }

  async updateUser(id: string, data: UpdateUser): Promise<User | null> {
    const db = await getDb();
    const validated = updateUserSchema.parse(data);
    const [user] = await db
      .update(users)
      .set({ ...validated, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user || null;
  }

  async updateLastLogin(id: string): Promise<void> {
    const db = await getDb();
    await db
      .update(users)
      .set({ lastLoginAt: new Date(), updatedAt: new Date() })
      .where(eq(users.id, id));
  }

  async deleteUser(id: string): Promise<boolean> {
    const db = await getDb();
    const result = await db.delete(users).where(eq(users.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getUserOptions(): Promise<{ id: string; username: string }[]> {
    const db = await getDb();
    return db
      .select({
        id: users.id,
        username: users.username,
      })
      .from(users)
      .orderBy(users.username);
  }
}

export const userManager = new UserManager();
