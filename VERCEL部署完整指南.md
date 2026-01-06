# Vercel 部署完整指南

## ✅ 已完成的修复

以下配置已优化，确保一次性部署成功：

### 1. 核心配置文件

#### vercel.json (已优化)
```json
{
  "framework": "nextjs",
  "installCommand": "pnpm install",
  "buildCommand": "next build",
  "devCommand": "next dev -p 5000",
  "outputDirectory": ".next"
}
```

#### next.config.ts (已优化)
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [],
    unoptimized: true,
  },
  serverExternalPackages: ['postgres'],
};

export default nextConfig;
```

#### package.json (已优化)
- 脚本命令：`dev`, `build`, `start`, `lint`
- 所有依赖已正确配置
- 使用 pnpm 作为包管理器

### 2. 项目结构
```
项目根目录/
├── public/          # ✅ 已创建（静态资源目录）
├── src/
│   ├── app/        # ✅ Next.js App Router
│   ├── lib/        # ✅ 数据库连接
│   └── storage/    # ✅ 数据管理层
├── .env.example    # ✅ 环境变量模板
├── vercel.json     # ✅ Vercel 配置
├── next.config.ts  # ✅ Next.js 配置
├── package.json    # ✅ 项目配置
└── tsconfig.json   # ✅ TypeScript 配置
```

### 3. 本地构建验证
✅ 构建成功，所有页面正常生成
✅ .next 目录输出正常
✅ 无 TypeScript 错误
✅ 无 ESLint 错误

---

## 🚀 Vercel 部署步骤（一次成功）

### 第一步：推送代码到 GitHub

```bash
# 提交所有修改
git add .
git commit -m "fix: 优化Vercel部署配置，确保一次性部署成功"

# 推送到 GitHub
git push origin main
```

### 第二步：在 Vercel 中导入项目

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 "Add New Project"
3. 选择你的 GitHub 仓库
4. 点击 "Import"

### 第三步：配置项目（关键步骤）

#### 1. Framework Preset（框架预设）
- **Framework**: Next.js (自动检测)
- **Project Name**: ppt-shop-manager
- **Root Directory**: `./` (根目录)

#### 2. Build & Development Settings（构建配置）

**重要：不要手动修改这些设置，使用默认值！**

| 设置项 | 值 | 说明 |
|--------|-----|------|
| Build Command | `next build` | 自动检测，无需修改 |
| Output Directory | `.next` | 自动检测，**不要设置为 public** |
| Install Command | `pnpm install` | 使用 pnpm |
| Dev Command | `next dev -p 5000` | 开发命令 |

**如果 Output Directory 显示为 public，点击 "Reset to Default" 重置！**

#### 3. Environment Variables（环境变量）- **必填**

在 Settings → Environment Variables 中添加以下变量：

```env
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
SESSION_SECRET=your-random-secret-key-here-change-this
NODE_ENV=production
PORT=5000
```

**获取 DATABASE_URL 的方法：**

1. 注册 [Supabase](https://supabase.com/)
2. 创建新项目（免费）
3. Settings → Database → Connection String
4. 选择 "URI" 格式
5. 复制并替换 `[YOUR-PASSWORD]` 为你设置的数据库密码

**生成 SESSION_SECRET 的方法：**

```bash
# 在终端运行以下命令生成随机密钥
openssl rand -base64 32
```

### 第四步：部署

1. 确保所有环境变量已添加（选择 Production, Preview, Development 三个环境）
2. 点击 "Deploy" 按钮
3. 等待约 2-3 分钟，构建完成

---

## 🔍 部署后验证

### 1. 检查部署状态

访问 Vercel 项目页面，确认：
- ✅ Build: Succeeded
- ✅ Deployment: Ready
- ✅ Status: Active

### 2. 访问应用

- 主页: `https://ppt-shop-manager.vercel.app`
- 调试页面: `https://ppt-shop-manager.vercel.app/debug`

### 3. 初始化数据库

访问以下 URL 初始化数据库：
```
https://ppt-shop-manager.vercel.app/api/init-db
```

**预期响应：**
```json
{
  "success": true,
  "message": "数据库初始化成功"
}
```

### 4. 登录系统

- URL: `https://ppt-shop-manager.vercel.app`
- 默认账号: `admin`
- 默认密码: `admin123`

---

## ⚠️ 常见问题排查

### 问题 1: "No Output Directory named 'public' found"

**原因：** Vercel 项目设置中 Output Directory 错误设置为 "public"

**解决方法：**
1. 进入 Vercel 项目 → Settings → General
2. 找到 "Build & Development Settings"
3. 点击 "Output Directory" 旁边的 "Reset to Default"
4. 保存并重新部署

### 问题 2: 构建失败 "Error: DATABASE_URL is not defined"

**原因：** 环境变量未配置或未保存

**解决方法：**
1. Settings → Environment Variables
2. 添加 `DATABASE_URL`
3. 勾选 Production, Preview, Development
4. 保存并重新部署

### 问题 3: 数据库连接失败

**原因：** DATABASE_URL 格式错误或密码错误

**解决方法：**
1. 检查 Supabase 项目状态
2. 确认数据库密码正确
3. 测试连接: `psql $DATABASE_URL` (本地测试)

### 问题 4: 页面 404 Not Found

**原因：** 构建不完整或路由错误

**解决方法：**
1. 检查构建日志，确认所有页面生成成功
2. 访问 `/debug` 查看应用状态
3. 查看部署日志中的错误信息

---

## 📋 部署检查清单

在点击 Deploy 前，确认以下项目：

- [ ] 代码已推送到 GitHub
- [ ] vercel.json 配置正确
- [ ] next.config.ts 配置正确
- [ ] package.json 脚本正确
- [ ] public 目录存在
- [ ] DATABASE_URL 已配置（Supabase/Neon/其他）
- [ ] SESSION_SECRET 已配置（随机字符串）
- [ ] NODE_ENV 设置为 production
- [ ] Output Directory 是 `.next`（不是 public）
- [ ] 本地构建测试成功
- [ ] 所有环境变量已添加到 Vercel

---

## 🎯 成功标志

当以下所有条件满足时，部署成功：

1. ✅ Vercel Dashboard 显示 "Ready"
2. ✅ 访问主页显示登录界面
3. ✅ `/api/init-db` 返回成功
4. ✅ 使用 admin/admin123 成功登录
5. ✅ 可以看到四个角色端口

---

## 📞 获取帮助

如果部署失败：

1. 查看 Vercel 部署日志（Deployment → Logs）
2. 检查实时日志（Deployments → View Function Logs）
3. 访问 `/debug` 查看应用状态
4. 检查 Supabase/数据库连接状态

---

**更新时间：** 2025-01-06
**状态：** ✅ 已优化并验证，确保一次性部署成功
