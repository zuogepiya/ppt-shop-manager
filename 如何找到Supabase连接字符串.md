# 如何找到Supabase连接字符串 - 详细图解

本文档专门教你如何在Supabase中找到数据库连接字符串。

---

## 🎯 什么是连接字符串？

连接字符串是用来连接数据库的"钥匙"，格式如下：

```
postgresql://postgres.项目ID:密码@服务器地址:端口/数据库名
```

---

## 📍 方法一：通过Database设置（最常用）

### 步骤1：进入项目Dashboard

1. 登录 [https://supabase.com](https://supabase.com)
2. 在左侧项目列表中，点击你的项目名称（如 `ppt-shop-manager`）
3. 进入项目Dashboard

### 步骤2：打开Database设置

**找到Settings图标**：
- 在左侧菜单栏的最下方，有一个齿轮图标 ⚙️
- 点击这个图标

**或者**：
- 悬停在左侧菜单的某个项目名称上
- 会看到一个齿轮图标，点击它

### 步骤3：选择Database选项

在Settings菜单中：
1. 找到 **Database** 选项（通常在第一个）
2. 点击进入Database设置页面

### 步骤4：查找连接信息

在Database设置页面上，**向下滑动页面**，寻找以下内容之一：

**情况A：看到 "Connection string"**
- 很幸运！你直接找到了
- 通常会显示多个标签页：
  - **URI** ← 选择这个！
  - Transaction pooling
  - Session pooling
- 点击 **URI** 标签
- 复制文本框中的连接字符串

**情况B：看到 "Connection pooling configuration"**
- 继续向下滑动页面
- 寻找其他标题，如：
  - "Connection parameters"
  - "Connection info"
  - "Database connection"
  - "API" 相关的选项
- 如果找不到，看下面的"方法二"

**情况C：看到 "Connection parameters"**
- 在这个部分，你会看到：
  - Host
  - Database name
  - Port
  - User
- **密码不显示**，需要你自己加上
- 看下面的"方法三"手动构建

### 步骤5：复制并修改连接字符串

如果找到了 **URI** 格式的连接字符串：

```
postgresql://postgres.abc123:[YOUR-PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres
```

**修改步骤**：
1. 点击 **Copy** 按钮复制
2. 将 `[YOUR-PASSWORD]` 替换为你设置的数据库密码
3. 例如：`postgresql://postgres.abc123:MyPassword123@...`

---

## 📍 方法二：通过API设置（备用）

如果Database设置找不到，试试这个方法。

### 步骤1：打开API设置

1. 在左侧菜单点击 **Settings** 图标（⚙️）
2. 选择 **API** 选项

### 步骤2：查找连接字符串

在API设置页面上：

**查找位置1**：
- 向下滑动，寻找 "Connection string" 或 "Database URL"
- 通常在 "Project API keys" 部分下方

**查找位置2**：
- 寻找 "Project URL" 附近
- 可能有 "Connection string" 的链接或按钮

### 步骤3：复制并修改

和上面一样，找到后：
1. 复制连接字符串
2. 替换 `[YOUR-PASSWORD]` 为你的密码

---

## 📍 方法三：手动构建连接字符串（万能方法）

如果以上方法都找不到，或者只看到参数而没看到完整的连接字符串，可以手动构建！

### 步骤1：获取项目ID

**方法A：从URL获取**
1. 浏览器地址栏显示的URL
2. 格式：`https://supabase.com/dashboard/project/这里就是项目ID`
3. 例如：`https://supabase.com/dashboard/project/abc123def456`
   - 项目ID：`abc123def456`

**方法B：从Project URL获取**
1. 在 **Settings** > **API** 页面
2. 找到 **Project URL**
3. 例如：`https://abc123def456.supabase.co`
4. 项目ID：`abc123def456`

### 步骤2：确定服务器地址

**常见的Supabase服务器地址**：

| 区域 | 服务器地址 |
|------|------------|
| Northeast Asia (Tokyo) | `aws-0-ap-northeast-1.pooler.supabase.com` |
| Southeast Asia (Singapore) | `aws-0-ap-southeast-1.pooler.supabase.com` |
| US East | `aws-0-us-east-1.pooler.supabase.com` |
| US West | `aws-0-us-west-1.pooler.supabase.com` |
| EU West | `db.abcdefghijk.supabase.co` （直接域名） |

**如何确定你的区域？**

1. 回忆创建项目时选择的Region
2. 或者在项目首页查看
3. 或者在API设置中查看Project URL（URL中包含区域信息）

### 步骤3：手动构建连接字符串

**使用以下模板**：

```
postgresql://postgres.项目ID:你的密码@服务器地址:6543/postgres
```

**示例1（东京区域）**：
- 项目ID：`abc123def456`
- 密码：`MyPassword123`
- 服务器：`aws-0-ap-northeast-1.pooler.supabase.com`

连接字符串：
```
postgresql://postgres.abc123def456:MyPassword123@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres
```

**示例2（新加坡区域）**：
- 项目ID：`xyz789uvw012`
- 密码：`Admin@2024`
- 服务器：`aws-0-ap-southeast-1.pooler.supabase.com`

连接字符串：
```
postgresql://postgres.xyz789uvw012:Admin@2024@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
```

**示例3（使用直接域名）**：
有些项目使用直接域名：
```
postgresql://postgres.项目ID:密码@db.项目ID.supabase.co:5432/postgres
```

---

## 📍 方法四：使用SQL Editor查看（验证方法）

如果不确定连接字符串是否正确，可以用这个方法验证。

### 步骤1：打开SQL Editor

1. 在左侧菜单栏找到 **SQL Editor** 图标（通常是一个代码图标或 `>_`）
2. 点击进入SQL Editor

### 步骤2：运行查询

输入以下SQL查询并执行：

```sql
SELECT current_database(), current_user;
```

如果查询成功，说明你的连接是正确的。

---

## 🔍 常见问题排查

### Q1: 找不到Connection string

**可能原因**：
1. 界面布局不同
2. 版本更新导致界面变化
3. 项目刚创建，还在初始化

**解决方案**：
1. 等待1-2分钟后刷新页面
2. 使用"方法三"手动构建
3. 在SQL Editor中测试连接

---

### Q2: 替换密码后连接失败

**可能原因**：
1. 密码输入错误
2. 项目ID错误
3. 服务器地址错误

**解决方案**：
1. 重新输入密码，注意大小写
2. 检查项目ID是否完整
3. 尝试不同的服务器地址（东京、新加坡等）

---

### Q3: 看到 "db.项目ID.supabase.co" 而不是pooler

**说明**：
这是另一种连接方式，也是可以的！

**连接字符串格式**：
```
postgresql://postgres.项目ID:密码@db.项目ID.supabase.co:5432/postgres
```

**注意**：
- 服务器地址：`db.项目ID.supabase.co`
- 端口：`5432`（不是6543）

---

### Q4: Connection pooling 是什么？

**说明**：
Connection pooling（连接池）是一种优化数据库连接的技术，可以提高性能。

**选择建议**：
- **Transaction pooling**：适合大多数应用（推荐）
- **Session pooling**：适合需要保持会话的应用
- **URI**：直接连接，不使用连接池

**对于本项目**：
- 推荐使用 **URI**（直接连接）
- 或者使用 **Transaction pooling**

---

## ✅ 验证连接字符串是否正确

构建好连接字符串后，可以通过以下方式验证：

### 方法1：在Vercel中测试

1. 将连接字符串添加到Vercel环境变量
2. 部署应用
3. 访问 `/api/db-init`
4. 如果返回成功，说明连接正确

### 方法2：使用在线工具

使用PostgreSQL连接测试工具（如DBee等）测试连接。

---

## 📝 保存连接字符串

**务必保存以下信息**：

| 信息项 | 示例 | 保存位置 |
|--------|------|----------|
| 项目ID | `abc123def456` | 记事本/密码管理器 |
| 数据库密码 | `MyPassword123` | 记事本/密码管理器 |
| 完整连接字符串 | `postgresql://postgres...` | 记事本 |
| Supabase项目URL | `https://supabase.com/dashboard/project/xxx` | 记事本 |

⚠️ **重要**：连接字符串包含密码，不要分享给他人！

---

## 💡 快速参考

**连接字符串格式**：
```
postgresql://postgres.项目ID:密码@服务器地址:端口/postgres
```

**常用服务器地址**：
- 东京：`aws-0-ap-northeast-1.pooler.supabase.com:6543`
- 新加坡：`aws-0-ap-southeast-1.pooler.supabase.com:6543`
- 美国：`aws-0-us-east-1.pooler.supabase.com:6543`

**直接域名**：
```
postgresql://postgres.项目ID:密码@db.项目ID.supabase.co:5432/postgres
```

---

**如果还是找不到，使用"方法三"手动构建最保险！** 🎯
