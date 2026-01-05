import { eq, and, SQL, like, desc, sql } from "drizzle-orm";
import { getDb } from "coze-coding-dev-sdk";
import {
  financialRecords,
  insertFinancialRecordSchema,
  updateFinancialRecordSchema,
} from "./shared/schema";
import type {
  FinancialRecord,
  InsertFinancialRecord,
  UpdateFinancialRecord,
} from "./shared/schema";

export class FinancialManager {
  async createFinancialRecord(
    data: InsertFinancialRecord
  ): Promise<FinancialRecord> {
    const db = await getDb();
    const validated = insertFinancialRecordSchema.parse(data);
    const [record] = await db
      .insert(financialRecords)
      .values(validated)
      .returning();
    return record;
  }

  async getFinancialRecords(options: {
    skip?: number;
    limit?: number;
    filters?: Partial<
      Pick<
        FinancialRecord,
        "id" | "orderId" | "employeeId" | "type" | "direction" | "status"
      >
    >;
    search?: string;
    startDate?: Date;
    endDate?: Date;
  } = {}): Promise<FinancialRecord[]> {
    const {
      skip = 0,
      limit = 100,
      filters = {},
      search,
      startDate,
      endDate,
    } = options;
    const db = await getDb();

    const conditions: SQL[] = [];
    if (filters.id !== undefined) {
      conditions.push(eq(financialRecords.id, filters.id));
    }
    if (filters.orderId !== undefined && filters.orderId !== null) {
      conditions.push(eq(financialRecords.orderId, filters.orderId));
    }
    if (filters.employeeId !== undefined && filters.employeeId !== null) {
      conditions.push(eq(financialRecords.employeeId, filters.employeeId));
    }
    if (filters.type !== undefined && filters.type !== null) {
      conditions.push(eq(financialRecords.type, filters.type));
    }
    if (filters.direction !== undefined && filters.direction !== null) {
      conditions.push(eq(financialRecords.direction, filters.direction));
    }
    if (filters.status !== undefined && filters.status !== null) {
      conditions.push(eq(financialRecords.status, filters.status));
    }

    // 日期范围查询
    if (startDate && endDate) {
      conditions.push(
        sql`${financialRecords.transactionDate} >= ${startDate} AND ${financialRecords.transactionDate} <= ${endDate}`
      );
    }

    // 搜索支持描述、记录号
    if (search) {
      conditions.push(like(financialRecords.description, `%${search}%`));
    }

    const query = db.select().from(financialRecords);
    if (conditions.length > 0) {
      query.where(and(...conditions));
    }

    return query
      .orderBy(desc(financialRecords.transactionDate))
      .limit(limit)
      .offset(skip);
  }

  async getFinancialRecordById(id: string): Promise<FinancialRecord | null> {
    const db = await getDb();
    const [record] = await db
      .select()
      .from(financialRecords)
      .where(eq(financialRecords.id, id));
    return record || null;
  }

  async updateFinancialRecord(
    id: string,
    data: UpdateFinancialRecord
  ): Promise<FinancialRecord | null> {
    const db = await getDb();
    const validated = updateFinancialRecordSchema.parse(data);
    const [record] = await db
      .update(financialRecords)
      .set({ ...validated, updatedAt: new Date() })
      .where(eq(financialRecords.id, id))
      .returning();
    return record || null;
  }

  async deleteFinancialRecord(id: string): Promise<boolean> {
    const db = await getDb();
    const result = await db
      .delete(financialRecords)
      .where(eq(financialRecords.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getFinancialSummary(options: {
    startDate?: Date;
    endDate?: Date;
    type?: string;
  } = {}): Promise<{
    totalIncome: string;
    totalExpense: string;
    balance: string;
  }> {
    const db = await getDb();
    const { startDate, endDate, type } = options;

    // 构建查询条件
    const conditions: SQL[] = [];
    if (startDate && endDate) {
      conditions.push(
        sql`${financialRecords.transactionDate} >= ${startDate} AND ${financialRecords.transactionDate} <= ${endDate}`
      );
    }
    if (type) {
      conditions.push(eq(financialRecords.type, type));
    }

    // 获取收入总额
    let incomeQuery = db
      .select({ amount: financialRecords.amount })
      .from(financialRecords);

    // 获取支出总额
    let expenseQuery = db
      .select({ amount: financialRecords.amount })
      .from(financialRecords);

    // 合并方向过滤条件
    const incomeConditions = [eq(financialRecords.direction, "in"), ...conditions];
    const expenseConditions = [eq(financialRecords.direction, "out"), ...conditions];

    incomeQuery = incomeQuery.where(and(...incomeConditions));
    expenseQuery = expenseQuery.where(and(...expenseConditions));

    const incomes = await incomeQuery;
    const expenses = await expenseQuery;

    const totalIncome = incomes.reduce(
      (sum, record) => sum + parseFloat(record.amount || "0"),
      0
    );
    const totalExpense = expenses.reduce(
      (sum, record) => sum + parseFloat(record.amount || "0"),
      0
    );

    return {
      totalIncome: totalIncome.toFixed(2),
      totalExpense: totalExpense.toFixed(2),
      balance: (totalIncome - totalExpense).toFixed(2),
    };
  }

  async getFinancialRecordsByEmployeeId(
    employeeId: string
  ): Promise<FinancialRecord[]> {
    const db = await getDb();
    return db
      .select()
      .from(financialRecords)
      .where(eq(financialRecords.employeeId, employeeId))
      .orderBy(desc(financialRecords.transactionDate));
  }

  async getFinancialRecordsByOrderId(
    orderId: string
  ): Promise<FinancialRecord[]> {
    const db = await getDb();
    return db
      .select()
      .from(financialRecords)
      .where(eq(financialRecords.orderId, orderId))
      .orderBy(desc(financialRecords.transactionDate));
  }
}

export const financialManager = new FinancialManager();
