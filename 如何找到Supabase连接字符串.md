# 如何找到 Supabase 数据库连接字符串

## 步骤1：登录 Supabase

访问 Supabase 官网：
https://supabase.com/dashboard

### 如果登录后显示项目列表

您会看到类似这样的页面：

```
Your Projects
┌────────────────────────────────────┐
│  [项目名称]         ⚙️ Settings     │
│  Created: 2024-XX-XX                │
│  Region: Singapore                  │
└────────────────────────────────────┘
```

**找到您创建的项目，点击项目名称或 ⚙️ Settings 按钮**

---

## 步骤2：进入项目设置

进入项目后，在左侧菜单中找到：

```
Project  🏠
    ↓
Settings  ⚙️
    ↓
Database  💾  ← 点击这个
```

点击 **Database** 后，您会看到数据库设置页面。

---

## 步骤3：找到连接字符串

在 Database 页面中，向下滚动，找到：

```
Connection String
┌────────────────────────────────────┐
│  URI  psql  JDBC  .NET             │
│                                    │
│  postgresql://postgres.[PROJECT-   │
│  REF]:[YOUR-PASSWORD]@db.[PROJECT- │
│  REF].supabase.co:5432/postgres   │
│                                    │
│  [Copy]                            │ ← 点击复制
└────────────────────────────────────┘
```

**点击 [Copy] 按钮复制连接字符串**

---

## 步骤4：替换密码

复制后的连接字符串格式类似：

```
postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

需要替换：
- `[PROJECT-REF]` - Supabase 会自动填充
- `[YOUR-PASSWORD]` - **这是您创建数据库时设置的密码**

### 重要：您需要记住密码

**这个密码是您在创建 Supabase 项目时设置的密码！**

如果您忘记了密码，有两种方式：

#### 方式1：查看之前的记录
- 检查您的浏览器密码管理器
- 检查是否有保存过密码的文档
- 检查您创建 Supabase 时的记录

#### 方式2：重置数据库密码
1. 在 Supabase Dashboard 中
2. 进入 **Settings** → **Database**
3. 找到 **Database Password** 部分
4. 点击 **Reset Database Password**
5. 设置新密码

---

## 步骤5：复制最终的连接字符串

替换密码后的格式：

```
postgresql://postgres.abc123xyz:yourpassword@db.abc123xyz.supabase.co:5432/postgres
```

**示例（请勿直接使用，仅作格式参考）：**

```
postgresql://postgres.project123:mypassword123@db.project123.supabase.co:5432/postgres
```

---

## 步骤6：粘贴到 Vercel

回到 Vercel 的环境变量设置页面：

1. 点击 **[+ Add More]** 添加新环境变量
2. **Key**: 输入 `DATABASE_URL`
3. **Value**: 粘贴您刚才复制的连接字符串
4. 点击确认或保存

---

## 完整示例

### Supabase 连接字符串：

```
postgresql://postgres.abc123xyz:def456ghi@db.abc123xyz.supabase.co:5432/postgres
```

### Vercel 环境变量：

```
Key: DATABASE_URL
Value: postgresql://postgres.abc123xyz:def456ghi@db.abc123xyz.supabase.co:5432/postgres
```

---

## 常见问题

### Q: 找不到 Connection String
**A:** 确保您在：
1. 正确的项目页面
2. Settings → Database
3. 向下滚动查看

### Q: 连接字符串中有 [YOUR-PASSWORD]
**A:** 需要替换为您创建数据库时设置的密码

### Q: 忘记了数据库密码怎么办
**A:** 在 Supabase Dashboard 中重置密码：
Settings → Database → Reset Database Password

### Q: 有多个项目，不知道是哪个
**A:** 创建新的项目即可，或者删除不用的项目
- 查看项目的创建时间
- 查看项目的名称
- 选择正确的项目

---

## 找不到项目？

如果您登录 Supabase 后看不到任何项目：

### 创建新项目

1. 访问：https://supabase.com/dashboard
2. 点击 **[New Project]**
3. 填写信息：
   - **Name**: `ppt-shop-manager`（任意名称）
   - **Database Password**: 设置一个密码（**请记住这个密码！**）
   - **Region**: 选择 Southeast Asia (Singapore) 速度较快
4. 点击 **[Create New Project]**
5. 等待 1-2 分钟项目创建完成

### 获取新项目的连接字符串

创建完成后：
1. 进入项目：**Settings** → **Database**
2. 找到 **Connection String** → **URI**
3. 点击 **[Copy]** 复制
4. 替换 `[YOUR-PASSWORD]` 为您刚才设置的密码

---

## 下一步

1. 在 Supabase 中找到连接字符串
2. 复制连接字符串
3. 在 Vercel 的 Environment Variables 中添加：
   - Key: `DATABASE_URL`
   - Value: 粘贴连接字符串
4. 确保也添加了 SESSION_SECRET 环境变量
5. 点击 **[Deploy]** 开始部署

---

## 如果还是找不到

请告诉我：

1. **登录 Supabase 后，您能看到项目列表吗？**
   - 有几个项目？
   - 项目名称是什么？

2. **是否记得创建数据库时设置的密码？**
   - 如果不记得，可以重置密码

3. **是否找到了 Connection String？**
   - 如果找不到，告诉我您在哪个页面

我会根据您的具体情况进一步指导！
