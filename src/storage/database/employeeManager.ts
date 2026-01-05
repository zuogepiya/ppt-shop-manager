import { eq, and, SQL, like } from "drizzle-orm";
import { getDb } from "./dbAdapter";
import {
  employees,
  insertEmployeeSchema,
  updateEmployeeSchema,
} from "./shared/schema";
import type { Employee, InsertEmployee, UpdateEmployee } from "./shared/schema";

export class EmployeeManager {
  async createEmployee(data: InsertEmployee): Promise<Employee> {
    const db = await getDb();
    const validated = insertEmployeeSchema.parse(data);
    const [employee] = await db.insert(employees).values(validated).returning();
    return employee;
  }

  async getEmployees(options: {
    skip?: number;
    limit?: number;
    filters?: Partial<
      Pick<Employee, "id" | "department" | "position" | "status">
    >;
    search?: string;
  } = {}): Promise<Employee[]> {
    const { skip = 0, limit = 100, filters = {}, search } = options;
    const db = await getDb();

    const conditions: SQL[] = [];
    if (filters.id !== undefined) {
      conditions.push(eq(employees.id, filters.id));
    }
    if (filters.department !== undefined && filters.department !== null) {
      conditions.push(eq(employees.department, filters.department));
    }
    if (filters.position !== undefined && filters.position !== null) {
      conditions.push(eq(employees.position, filters.position));
    }
    if (filters.status !== undefined && filters.status !== null) {
      conditions.push(eq(employees.status, filters.status));
    }

    // 搜索支持姓名、电话、邮箱
    if (search) {
      conditions.push(
        like(employees.name, `%${search}%`)
      );
    }

    const query = db.select().from(employees);
    if (conditions.length > 0) {
      query.where(and(...conditions));
    }

    return query.limit(limit).offset(skip);
  }

  async getEmployeeById(id: string): Promise<Employee | null> {
    const db = await getDb();
    const [employee] = await db
      .select()
      .from(employees)
      .where(eq(employees.id, id));
    return employee || null;
  }

  async updateEmployee(id: string, data: UpdateEmployee): Promise<Employee | null> {
    const db = await getDb();
    const validated = updateEmployeeSchema.parse(data);
    const [employee] = await db
      .update(employees)
      .set({ ...validated, updatedAt: new Date() })
      .where(eq(employees.id, id))
      .returning();
    return employee || null;
  }

  async deleteEmployee(id: string): Promise<boolean> {
    const db = await getDb();
    const result = await db.delete(employees).where(eq(employees.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getEmployeeOptions(): Promise<{ id: string; name: string }[]> {
    const db = await getDb();
    return db
      .select({
        id: employees.id,
        name: employees.name,
      })
      .from(employees)
      .where(eq(employees.status, "active"))
      .orderBy(employees.name);
  }
}

export const employeeManager = new EmployeeManager();
