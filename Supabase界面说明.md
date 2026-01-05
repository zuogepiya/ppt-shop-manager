# Supabase界面说明 - 用文字帮你找位置

本文档用文字描述Supabase的界面布局，帮助你快速找到需要的功能。

---

## 🖥️ Supabase Dashboard 总体布局

### 顶部导航栏
```
┌─────────────────────────────────────────────────────────┐
│  [Supabase Logo]  [项目1 ▼]  [+ New Project]   [用户头像] │
└─────────────────────────────────────────────────────────┘
```

**说明**：
- 左上角：Supabase Logo
- 左侧中间：项目选择下拉菜单（点击可切换项目）
- 左侧按钮：+ New Project（创建新项目）
- 右侧：你的用户头像

---

### 左侧菜单栏

```
┌───────────────────────┐
│   Supabase Logo      │
│                       │
│   [+] New Project     │
│                       │
│ ┌───────────────────┐ │
│ │ 项目名称           │ │
│ │ ───────────────  │ │
│ │ Table Editor      │ │
│ │ SQL Editor        │ │
│ │ Database          │ │
│ │ Authentication    │ │
│ │ Edge Functions    │ │
│ │ Storage           │ │
│ │ Logs              │ │
│ │ ⚙️ Settings       │ │ ← 点击这里！
│ └───────────────────┘ │
│                       │
│   [+] New Project     │
└───────────────────────┘
```

**说明**：
- 主要功能区在中间的项目菜单
- 最下方的 **⚙️ Settings** 是我们要找的
- Settings图标是一个齿轮形状

---

### Settings 菜单布局

点击Settings后，会展开Settings子菜单：

```
┌───────────────────────┐
│                       │
│   ⚙️ Settings         │
│   ─────────────────   │
│   General             │ ← 默认显示
│   Database            │ ← 我们要找的！
│   API                 │
│   Authentication      │
│   Storage             │
│   Edge Functions      │
│   Logs                │
│                       │
└───────────────────────┘
```

**说明**：
- General：项目基本信息
- **Database：数据库设置 ← 点击这个！**
- API：API密钥和连接信息
- Authentication：认证相关设置

---

## 📍 Database 设置页面布局

### 进入路径
```
1. 左侧菜单 → 点击你的项目名称
2. 展开后 → 点击 ⚙️ Settings
3. 展开后 → 点击 Database
```

### Database 页面结构

```
┌─────────────────────────────────────────────────────────┐
│  Database Settings                                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Connection Parameters                                   │
│  ┌───────────────────────────────────────────────────┐  │
│  │ Host: db.abc123.supabase.co                       │  │
│  │ Database name: postgres                           │  │
│  │ Port: 5432                                        │  │
│  │ User: postgres                                    │  │
│  │ Password: [hidden]                                │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  Connection Pooling Configuration                      │
│  ┌───────────────────────────────────────────────────┐  │
│  │ [详细配置...]                                     │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  Connection string  ← 你看到这个就对了！             │
│  ┌───────────────────────────────────────────────────┐  │
│  │ [URI] [Transaction pooling] [Session pooling]     │  │
│  │                                                   │  │
│  │ postgresql://postgres.abc123:[YOUR-PASSWORD]@... │  │
│  │                                       [Copy] [👁️]  │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  Database URL                                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │ postgres://postgres.abc123:[YOUR-PASSWORD]@...   │  │
│  │                                       [Copy] [👁️]  │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🔍 详细查找步骤

### 步骤1：点击Settings图标

**位置**：
- 左侧菜单栏的最下方
- 齿轮图标 ⚙️
- 可能直接显示，也可能需要悬停才能看到

**操作**：
1. 移动鼠标到左侧菜单栏底部
2. 找到齿轮图标 ⚙️
3. 点击它

### 步骤2：选择Database

**位置**：
- Settings菜单的第二个选项
- 在 General 下方
- 可能显示为 "Database" 或 "数据库名称"

**操作**：
1. 在展开的Settings菜单中
2. 找到 "Database" 选项
3. 点击它

### 步骤3：滚动页面

**操作**：
1. Database页面打开后
2. 使用鼠标滚轮向下滚动
3. 或者按键盘的 ↓ 键
4. 一直滚动到页面中间或下半部分

**你会经过的内容**：
- Connection Parameters（连接参数）
- 可能有一些图表或统计信息
- Connection Pooling Configuration（连接池配置）
- Connection string（连接字符串）← 目标！

### 步骤4：找到Connection string

**识别特征**：
- 标题是 "Connection string" 或 "Database URL"
- 有几个标签页：
  - **URI** ← 我们要选这个！
  - Transaction pooling
  - Session pooling
- 有一个文本框显示连接字符串
- 文本框旁边有 [Copy] 复制按钮

**操作**：
1. 找到 "Connection string" 部分
2. 点击 **URI** 标签
3. 点击 [Copy] 按钮复制

---

## 🔍 如果看不到 Connection string

### 可能的情况1：看到了 "Connection pooling configuration"

**说明**：
- 你找到了大致位置
- 但显示的是连接池配置，而不是连接字符串

**解决方案**：
1. 继续向下滚动页面
2. 在 "Connection pooling configuration" 下方继续找
3. 寻找 "Connection string"、"Database URL" 或类似的标题

---

### 可能的情况2：只看到 Connection Parameters

**说明**：
- 你看到了连接参数
- 但没有看到完整的连接字符串

**你看到的内容**：
```
Connection Parameters
Host: db.abc123.supabase.co
Database name: postgres
Port: 5432
User: postgres
Password: [hidden]
```

**解决方案**：
1. 记下 Host 中的项目ID（db.abc123.supabase.co 中的 abc123）
2. 使用"手动构建"方法
3. 详见：[如何找到Supabase连接字符串.md](./如何找到Supabase连接字符串.md#方法三手动构建连接字符串万能方法)

---

### 可能的情况3：页面太长，找不到目标

**解决方案**：
1. 使用浏览器的"查找"功能（Ctrl+F 或 Command+F）
2. 搜索关键词：
   - `Connection string`
   - `Database URL`
   - `postgresql://`
3. 如果搜索到，点击它跳转到对应位置

---

## 🎯 快速定位技巧

### 技巧1：使用浏览器搜索

1. 在Database页面按 `Ctrl+F`（Windows）或 `Command+F`（Mac）
2. 输入：`Connection string`
3. 浏览器会高亮显示所有匹配项
4. 按回车键跳转到下一个匹配项

### 技巧2：查看页面源代码

如果还是找不到：

1. 在Database页面右键
2. 选择"查看页面源代码"
3. 按 `Ctrl+F` 搜索 `postgresql://`
4. 如果能找到，复制下来

### 技巧3：使用API设置（备用方案）

1. 回到左侧菜单
2. 点击 Settings → API
3. 在这个页面也可能会显示连接字符串

---

## 📸 界面变化说明

### 为什么界面和我描述的不一样？

**可能原因**：
1. Supabase经常更新界面
2. 不同项目类型的界面可能不同
3. 不同浏览器的显示可能不同
4. 你的项目可能还在初始化中

**不要担心**：
- 即使界面不同，核心功能位置基本一致
- 使用手动构建方法最保险
- 参考 [如何找到Supabase连接字符串.md](./如何找到Supabase连接字符串.md)

---

## ✅ 成功的标志

当你找到连接字符串后，你会看到：

**特征1**：
- 包含 `postgresql://` 开头
- 包含项目ID
- 包含 `[YOUR-PASSWORD]` 或实际密码
- 包含服务器地址

**特征2**：
- 有 [Copy] 复制按钮
- 可能还有 [Reveal] 显示密码按钮

**示例**：
```
postgresql://postgres.abc123:[YOUR-PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres
```

---

## 🆘 还是找不到？

**最后的解决方案**：

1. **使用手动构建**（最保险）
   - 详见：[如何找到Supabase连接字符串.md](./如何找到Supabase连接字符串.md)
   - 获取项目ID
   - 手动构建连接字符串

2. **使用SQL Editor测试**
   - 在左侧菜单打开 SQL Editor
   - 运行简单查询
   - 能查询成功说明项目ID正确

3. **求助**
   - 查看Supabase官方文档
   - 搜索相关问题
   - 或者在SQL Editor中查看项目信息

---

**记住：即使找不到界面上的连接字符串，也可以手动构建！** 🎯

**手动构建公式**：
```
postgresql://postgres.项目ID:密码@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres
```
