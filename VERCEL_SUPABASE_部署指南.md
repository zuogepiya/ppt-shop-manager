# Vercel + Supabase 部署指南

本指南将帮助你将PPT制作店铺管理系统部署到公网，让设计师和员工可以远程访问。

## 部署架构

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   用户浏览器     │  HTTPS  │    Vercel CDN   │  HTTPS  │   Supabase DB   │
│  (员工/客户)     │ ──────> │   (Next.js应用)  │ ──────> │  (PostgreSQL)    │
└─────────────────┘         └─────────────────┘         └─────────────────┘
```

## 部署前检查清单

- [ ] 拥有GitHub账号
- [ ] 拥有邮箱账号（用于注册Vercel和Supabase）
- [ ] 项目代码完整无错误
- [ ] 已安装Git工具

---

## 第一步：创建Supabase数据库

### 1.1 注册Supabase账号

1. 访问 [https://supabase.com](https://supabase.com)
2. 点击 "Start your project"
3. 使用邮箱或GitHub账号注册

### 1.2 创建新项目

1. 登录后，点击 "New Project"
2. 填写项目信息：
   - **Name**: `ppt-shop-manager`（或其他名称）
   - **Database Password**: 设置一个强密码（⚠️ 务必记住！）
   - **Region**: 选择距离你最近的区域（如：Northeast Asia (Tokyo)）
3. 点击 "Create new project"
4. 等待数据库创建（约1-2分钟）

### 1.3 获取数据库连接字符串

1. 在项目左侧菜单，点击 **Settings** 图标
2. 选择 **Database**
3. 向下滚动找到 **Connection string** 区域
4. 选择 **URI** 标签
5. 点击 **Copy** 复制连接字符串
6. 连接字符串格式如下：
   ```
   postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres
   ```
7. **重要**：将 `[YOUR-PASSWORD]` 替换为你设置的数据库密码

**示例连接字符串**：
```
postgresql://postgres.abc123:MyStrongPassword123@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres
```

---

## 第二步：推送代码到GitHub

### 2.1 初始化Git仓库

在项目根目录打开终端，执行以下命令：

```bash
# 初始化Git仓库
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit: PPT店铺管理系统"
```

### 2.2 创建GitHub仓库

1. 访问 [https://github.com](https://github.com)
2. 登录后，点击右上角 **+** 按钮
3. 选择 **New repository**
4. 填写仓库信息：
   - **Repository name**: `ppt-shop-manager`
   - **Description**: PPT制作店铺员工管理系统
   - 选择 **Public** 或 **Private**（推荐Private）
5. 点击 **Create repository**

### 2.3 推送代码

在GitHub创建仓库后，会显示推送命令。在你的终端执行：

```bash
# 添加远程仓库（替换YOUR_USERNAME为你的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/ppt-shop-manager.git

# 推送到GitHub
git branch -M main
git push -u origin main
```

---

## 第三步：部署到Vercel

### 3.1 注册Vercel账号

1. 访问 [https://vercel.com](https://vercel.com)
2. 点击 "Sign Up"
3. 使用邮箱或GitHub账号注册（推荐使用GitHub登录）

### 3.2 导入GitHub仓库

1. 登录Vercel后，点击 **Add New...** > **Project**
2. 在 **Import Git Repository** 区域找到你的 `ppt-shop-manager` 仓库
3. 点击 **Import** 按钮

### 3.3 配置项目

Vercel会自动检测到Next.js项目，显示配置界面：

**Framework Preset**: Next.js

**Root Directory**: `./`（保持默认）

### 3.4 配置环境变量（关键步骤）

在配置界面找到 **Environment Variables** 区域，点击 **+** 添加环境变量：

| 名称 | 值 | 说明 |
|------|-----|------|
| `DATABASE_URL` | 你的Supabase连接字符串 | 数据库连接地址 |
| `NODE_ENV` | `production` | 生产环境标识 |

**添加 DATABASE_URL**：
1. Name: `DATABASE_URL`
2. Value: 粘贴你的Supabase连接字符串（⚠️ 确保密码正确）
3. 点击 **Add**

**添加 NODE_ENV**：
1. Name: `NODE_ENV`
2. Value: `production`
3. 点击 **Add**

### 3.5 部署

1. 检查所有配置无误
2. 点击页面底部的 **Deploy** 按钮
3. 等待部署完成（约1-2分钟）
4. 部署成功后，你会看到：
   - 🎉 Congratulations!
   - 你的域名：`https://your-project-name.vercel.app`

---

## 第四步：初始化数据库

### 4.1 创建数据库表

部署成功后，访问以下URL创建数据库表结构：

```
https://your-project-name.vercel.app/api/db-init
```

**预期结果**：
```json
{
  "success": true,
  "message": "数据库表结构初始化成功"
}
```

### 4.2 插入测试数据

访问以下URL插入测试数据：

```
https://your-project-name.vercel.app/api/test-data
```

**预期结果**：
```json
{
  "success": true,
  "message": "测试数据插入成功"
}
```

---

## 第五步：测试系统

### 5.1 访问系统

打开浏览器，访问你的Vercel域名：

```
https://your-project-name.vercel.app
```

### 5.2 登录测试

使用以下测试账号登录：

| 角色 | 用户名 | 密码 | 权限 |
|------|--------|------|------|
| 总台管理员 | `admin` | `admin123` | 最高权限 |
| 管理者 | `manager` | `manager123` | 管理订单、财务 |
| 客服 | `cs` | `cs123` | 客户管理、订单跟踪 |
| 设计师 | `designer` | `designer123` | 订单设计 |

⚠️ **重要**：生产环境部署后，请立即修改默认密码！

---

## 第六步：安全加固

### 6.1 修改默认密码

登录系统后，立即修改所有默认密码：

1. 使用 `admin` 账号登录
2. 进入"用户管理"
3. 为每个用户重置密码
4. 确保密码强度（至少8位，包含字母和数字）

### 6.2 删除测试数据（可选）

如果不需要测试数据，可以在Supabase控制台手动删除：

1. 登录 [Supabase Dashboard](https://supabase.com)
2. 选择你的项目
3. 进入 **SQL Editor**
4. 执行删除命令：
   ```sql
   TRUNCATE TABLE financial_records, orders, customers, employees, users CASCADE;
   ```

### 6.3 配置Supabase安全策略

在Supabase中启用Row Level Security (RLS)（可选）：

```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
-- 其他表同理
```

---

## 第七步：自定义域名（可选）

### 7.1 购买域名

如果你有自己的域名，可以将其绑定到Vercel应用：

推荐域名注册商：
- 阿里云：[wanwang.aliyun.com](https://wanwang.aliyun.com)
- 腾讯云：[dnspod.cloud.tencent.com](https://dnspod.cloud.tencent.com)
- Namecheap：[namecheap.com](https://namecheap.com)

### 7.2 在Vercel中添加域名

1. 进入Vercel项目设置
2. 点击 **Domains**
3. 输入你的域名（如：`ppt-shop.com`）
4. 按照Vercel的指引配置DNS记录

---

## 部署成功标志

✅ 部署成功的标志：

1. Vercel显示绿色勾号
2. 可以访问 `https://your-app.vercel.app`
3. 登录页面正常显示
4. 可以使用测试账号登录
5. 数据库连接正常（登录不报错）

---

## 常见问题

### Q1: 部署失败，提示 "DATABASE_URL is not defined"

**解决方案**：
1. 进入Vercel项目设置
2. 检查 Environment Variables
3. 确认 `DATABASE_URL` 已添加且值正确
4. 重新部署

### Q2: 登录时提示 "数据库连接失败"

**解决方案**：
1. 检查Supabase连接字符串是否正确
2. 确认密码没有拼写错误
3. 检查Supabase项目是否正常运行
4. 在Supabase Dashboard查看连接日志

### Q3: API路由返回 404

**解决方案**：
1. 确认已执行数据库初始化API
2. 检查 `src/app/api` 目录结构是否完整
3. 查看Vercel部署日志

### Q4: 页面样式丢失

**解决方案**：
1. 检查是否正确配置了Tailwind CSS
2. 清除浏览器缓存
3. 确认构建成功无错误

### Q5: 如何更新代码？

**更新步骤**：
```bash
# 修改代码后
git add .
git commit -m "Update: 修复bug"
git push

# Vercel会自动检测并重新部署
```

---

## 费用说明

### Vercel

- **免费套餐**：
  - 100GB带宽/月
  - 6,000分钟构建/月
  - 无限项目
  - 自动HTTPS
  - ✅ **完全满足本项目需求**

### Supabase

- **免费套餐**：
  - 500MB数据库存储
  - 1GB文件存储
  - 2GB带宽/月
  - 50,000次请求/月
  - ✅ **完全满足本项目需求**

**总计成本**：**¥0/月**（完全免费！）

---

## 下一步

部署完成后，你可以：

1. ✅ 邀请团队成员使用系统
2. ✅ 配置邮件通知（如需要）
3. ✅ 添加更多测试数据
4. ✅ 自定义品牌和样式
5. ✅ 定期备份数据库

---

## 技术支持

如果遇到问题，可以：

1. 查看Vercel部署日志
2. 查看Supabase控制台
3. 查看项目README文档
4. 检查浏览器控制台错误

---

祝部署成功！🎉
