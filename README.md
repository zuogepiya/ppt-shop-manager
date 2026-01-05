# PPT制作店铺员工管理系统

一个功能完善的PPT制作店铺员工管理系统，支持多角色权限管理、订单管理、财务管理等核心功能。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)

## ✨ 特性

### 🎯 核心功能
- **多角色管理**：总台管理、管理者、客服、设计师四种角色
- **员工管理**：员工信息、工资、提成、部门管理
- **订单管理**：订单创建、分配、进度跟踪、审核流程
- **财务管理**：收支记录、统计分析、报表导出
- **客户管理**：客户档案、沟通记录、来源追踪

### 🛠 技术特性
- **现代化架构**：Next.js 16 + React 19 + TypeScript 5
- **响应式设计**：Tailwind CSS 4，支持手机、平板、电脑
- **类型安全**：完整的TypeScript类型定义
- **数据库集成**：PostgreSQL + Drizzle ORM
- **RESTful API**：完整的后端API接口

### 🚀 部署支持
- ✅ Vercel 一键部署
- ✅ 云服务器部署
- ✅ Docker 容器化部署
- ✅ 内网穿透（测试用）

## 📦 快速开始

### 前置要求
- Node.js 20+
- pnpm 或 npm
- PostgreSQL 数据库

### 本地开发

```bash
# 1. 克隆项目
git clone https://github.com/your-username/ppt-shop-manager.git
cd ppt-shop-manager

# 2. 安装依赖
pnpm install

# 3. 配置环境变量
cp .env.example .env.local

# 编辑 .env.local 文件，设置数据库连接
# DATABASE_URL="postgresql://username:password@localhost:5432/dbname"

# 4. 启动开发服务器
pnpm dev
```

访问 http://localhost:5000

### 初始化数据库

```bash
# 初始化数据库表结构
curl -X POST http://localhost:5000/api/db-init

# 插入测试数据
curl -X POST http://localhost:5000/api/test-data
```

## 🌐 公网部署

### 🚀 新手？从这里开始！

如果你是第一次部署，请按照以下指南操作：

1. **[新手完全指南](./新手完全指南.md)** - 最详细的手把手教程，从零开始（推荐新手）
2. **[快速部署指南](./快速部署指南.md)** - 5分钟快速部署（适合有一定基础）
3. **[Vercel+Supabase部署准备完成](./Vercel+Supabase部署准备完成.md)** - 部署前检查和准备

### 📚 完整部署文档

- **[VERCEL_SUPABASE_部署指南.md](./VERCEL_SUPABASE_部署指南.md)** - Vercel + Supabase详细部署教程
- **[部署检查清单.md](./部署检查清单.md)** - 逐步检查确保部署成功
- **[常见问题解决方案.md](./常见问题解决方案.md)** - 排查和解决部署问题
- **[快速参考.md](./快速参考.md)** - 部署关键步骤速查表

### 方案一：Vercel + Supabase（推荐）

最简单、最快、免费的方式。详见：[VERCEL_SUPABASE_部署指南.md](VERCEL_SUPABASE_部署指南.md)

### 方案二：云服务器

适合长期使用、完全控制。详见：[部署指南.md](部署指南.md)

### 方案三：Docker

容器化部署，易于迁移。详见：[部署指南.md](部署指南.md)

## 👥 演示账号

| 角色 | 用户名 | 密码 | 权限 |
|------|--------|------|------|
| 总台管理 | admin | admin123 | 全面管理所有功能 |
| 管理者 | manager | manager123 | 审核订单、分配任务 |
| 客服 | cs | cs123 | 创建订单、跟进客户 |
| 设计师 | designer | designer123 | 接收任务、更新进度 |

⚠️ **重要**：生产环境中请修改默认密码！

## 📁 项目结构

```
ppt-shop-manager/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API 路由
│   │   │   ├── auth/          # 认证相关API
│   │   │   ├── employees/     # 员工管理API
│   │   │   ├── orders/        # 订单管理API
│   │   │   └── financial/     # 财务管理API
│   │   ├── dashboard/         # 管理后台页面
│   │   │   ├── admin/         # 总台管理
│   │   │   ├── manager/       # 管理者
│   │   │   ├── cs/            # 客服
│   │   │   └── designer/      # 设计师
│   │   ├── layout.tsx         # 全局布局
│   │   └── page.tsx           # 登录页
│   ├── lib/                    # 工具库
│   │   └── db.ts             # 数据库配置
│   └── storage/               # 数据层
│       └── database/          # 数据库管理
│           ├── init.ts        # 数据库初始化
│           ├── userManager.ts # 用户管理
│           ├── employeeManager.ts
│           ├── orderManager.ts
│           └── financialManager.ts
├── public/                     # 静态资源
├── .env.example               # 环境变量示例
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 API 接口

### 认证相关
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/logout` - 用户登出
- `GET /api/auth/me` - 获取当前用户信息

### 员工管理
- `GET /api/employees` - 获取员工列表
- `POST /api/employees` - 创建员工
- `GET /api/employees/[id]` - 获取员工详情
- `PUT /api/employees/[id]` - 更新员工信息
- `DELETE /api/employees/[id]` - 删除员工

### 订单管理
- `GET /api/orders` - 获取订单列表
- `POST /api/orders` - 创建订单
- `GET /api/orders/[id]` - 获取订单详情
- `PUT /api/orders/[id]` - 更新订单信息
- `DELETE /api/orders/[id]` - 删除订单

### 财务管理
- `GET /api/financial` - 获取财务记录
- `POST /api/financial` - 创建财务记录
- `GET /api/financial/[id]` - 获取财务记录详情
- `PUT /api/financial/[id]` - 更新财务记录
- `DELETE /api/financial/[id]` - 删除财务记录
- `GET /api/financial/stats` - 获取财务统计

更多API详情，请查看源代码中的实现。

## 📊 工作流程

### 订单处理流程
```
客服创建订单 → 管理者审核 → 分配设计师 → 设计师制作 → 提交审核 → 最终确认 → 财务记录
```

### 角色职责
- **总台管理**：系统配置、用户管理、全局数据查看
- **管理者**：订单审核、任务分配、进度监控
- **客服**：客户沟通、订单创建、信息更新
- **设计师**：任务接收、PPT制作、进度更新

## 🔐 安全建议

1. **修改默认密码**：首次登录后立即修改所有演示账号密码
2. **环境变量**：不要将 `.env` 文件提交到Git
3. **HTTPS**：生产环境必须使用HTTPS
4. **数据库备份**：定期备份数据库
5. **权限控制**：合理分配角色权限

## 📝 使用说明

详细的使用说明请查看：[使用说明.md](使用说明.md)

## 🚀 部署指南

详细的部署指南请查看：
- [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) - 快速部署清单（Vercel）
- [部署指南.md](部署指南.md) - 完整部署指南（多种方案）

## 🛠 技术栈

| 类别 | 技术 |
|------|------|
| 前端框架 | Next.js 16, React 19 |
| 语言 | TypeScript 5 |
| 样式 | Tailwind CSS 4 |
| 数据库 | PostgreSQL |
| ORM | Drizzle ORM |
| 部署平台 | Vercel, 云服务器 |
| 开发工具 | pnpm, ESLint, TypeScript |

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📧 联系方式

如有问题或建议，请通过以下方式联系：
- 提交 GitHub Issue
- 发送邮件

---

**Made with ❤️ for PPT制作店铺管理**
