# Vercel 找不到仓库的解决方案

## 问题原因
Vercel 无法看到您的 `ppt-shop-manager` 仓库，通常是因为：
1. Vercel 没有访问 GitHub 仓库的权限
2. 仓库是私有的，但 Vercel 没有被授权
3. Vercel 与 GitHub 的连接配置不正确

---

## 解决方案

### 方法1：授予 Vercel GitHub 权限（推荐）

#### 步骤1：进入 Vercel 设置
1. 登录 Vercel：https://vercel.com/dashboard
2. 点击右上角的 **[用户头像]** → **[Settings]**

#### 步骤2：进入 Git 集成设置
在左侧菜单中找到并点击：
```
Git Integrations
```

#### 步骤3：管理 GitHub 权限
在 "GitHub Integrations" 页面，您会看到：
```
GitHub
[Manage]  ← 点击这个按钮
```

#### 步骤4：更新仓库权限
点击 [Manage] 后，会跳转到 GitHub 的授权页面：
1. 找到 **"Repository access"** 部分
2. 选择 **"Only select repositories"**
3. 在搜索框输入：`ppt-shop-manager`
4. 点击 ✅ 勾选这个仓库
5. 点击页面底部的 **[Save]** 或 **[Update]** 按钮

#### 步骤5：重新进入导入页面
返回 Vercel，重新访问：https://vercel.com/new

---

### 方法2：将仓库改为 Public（公开）

如果仓库当前是私有的，可以改为公开：

#### 步骤1：访问仓库设置
1. 访问仓库：https://github.com/zuogepiya/ppt-shop-manager/settings
2. 在页面底部找到 **"Danger Zone"**

#### 步骤2：改为公开
```
Danger Zone

Change repository visibility
[Change visibility]  ← 点击这个按钮
```

#### 步骤3：确认更改
- 选择 "Public"（公开）
- 输入仓库名确认：`ppt-shop-manager`
- 点击 "I understand, change repository visibility"

#### 步骤4：等待同步
等待 1-2 分钟后，重新访问：https://vercel.com/new

---

### 方法3：重新授权 Vercel

如果以上方法都不行，可以重新授权：

#### 步骤1：撤销 Vercel 的 GitHub 权限
1. 访问 GitHub 设置：https://github.com/settings/applications
2. 找到 "OAuth Apps" 部分
3. 找到 "Vercel"
4. 点击进入，然后撤销授权

#### 步骤2：重新在 Vercel 授权
1. 访问：https://vercel.com/login
2. 选择用 GitHub 登录
3. 系统会要求授予 GitHub 权限
4. 确保勾选了您的仓库访问权限
5. 完成授权

---

## 快速检查清单

请确认以下信息：

### ✅ 检查1：仓库是否存在
访问：https://github.com/zuogepiya/ppt-shop-manager
- 能看到仓库内容吗？
- 右上角显示 "Public" 还是 "Private"？

### ✅ 检查2：Vercel 是否用 GitHub 登录
在 Vercel 页面右上角：
- 显示的是什么账号？
- 是否是 GitHub 图标（🟢）？

### ✅ 检查3：Vercel 和 GitHub 是否连接
在 Vercel Dashboard 中：
- 进入 [Settings] → [Git Integrations]
- 显示 "GitHub Connected" 还是其他状态？

---

## 最推荐的方案

### 按照以下顺序尝试：

#### 第1步：直接改为公开仓库（最快）
1. 访问：https://github.com/zuogepiya/ppt-shop-manager/settings
2. 滚动到页面底部 "Danger Zone"
3. 点击 "Change visibility"
4. 选择 "Public"，确认更改

#### 第2步：等待 2 分钟
GitHub 需要一些时间同步状态。

#### 第3步：重新访问 Vercel
访问：https://vercel.com/new

---

## 如果还是找不到

### 请告诉我以下信息：

1. **仓库的可见性**
   - 访问：https://github.com/zuogepiya/ppt-shop-manager
   - 右上角显示 Public 还是 Private？

2. **Vercel 账号信息**
   - 您用 GitHub 账号登录的 Vercel 吗？
   - Vercel 页面右上角显示什么用户名？

3. **Vercel Git 集成状态**
   - 访问：https://vercel.com/dashboard/settings
   - 点击 "Git Integrations"
   - GitHub 显示什么状态？（Connected / Not Connected / 需要授权）

4. **截图（如果可以）**
   - Vercel 导入页面的截图
   - 显示 "Import Git Repository" 的完整页面

---

## 常见错误信息

### 错误1：显示 "No repositories found"
**解决**：
- 授予 Vercel 访问仓库的权限（方法1）
- 或者将仓库改为公开（方法2）

### 错误2：显示 "You don't have access to any repositories"
**解决**：
- 重新用 GitHub 账号登录 Vercel
- 授予仓库访问权限

### 错误3：只显示其他仓库，看不到 ppt-shop-manager
**解决**：
- 仓库是私有的，需要授权（方法1）
- 或改为公开（方法2）

---

## 临时替代方案

如果 Vercel 始终找不到仓库，可以使用其他部署方式：

### 方案1：直接从 GitHub 导入
在 Vercel 导入页面，可能可以直接粘贴仓库地址：
```
https://github.com/zuogepiya/ppt-shop-manager
```

### 方案2：使用 Vercel CLI（高级）
```bash
npm install -g vercel
vercel login
vercel link
vercel --prod
```

### 方案3：使用其他部署平台
- Netlify
- Render
- Railway
- 自己的服务器

---

## 下一步

请先尝试**方法2：将仓库改为 Public**（最快最简单）

然后告诉我：
1. 仓库是否成功改为公开？
2. 在 Vercel 还是找不到仓库吗？
3. 如果还是找不到，告诉我上面的检查信息
