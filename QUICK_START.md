# 🚀 5分钟快速部署指南

这是一个超简化的部署指南，帮助你快速将系统部署到公网。

## 一键部署到Vercel（最简单）

### 前提条件
1. GitHub账号
2. Vercel账号
3. Supabase账号（提供免费数据库）

### 步骤

#### 1️⃣ 准Supabase数据库（2分钟）

1. 访问 https://supabase.com
2. 点击 "New Project"
3. 填写信息并创建项目
4. 在 Settings -> Database 中复制连接字符串：
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```

#### 2️⃣ 推送代码到GitHub（2分钟）

```bash
cd /workspace/projects

# 如果还没有Git仓库
git init
git add .
git commit -m "feat: PPT制作店铺管理系统"

# 在GitHub创建新仓库后
git remote add origin https://github.com/YOUR_USERNAME/ppt-shop-manager.git
git push -u origin main
```

#### 3️⃣ 部署到Vercel（2分钟）

1. 访问 https://vercel.com
2. 点击 "New Project"
3. 导入你的GitHub仓库
4. 添加环境变量：
   - Name: `DATABASE_URL`
   - Value: [你的Supabase连接字符串]
5. 点击 "Deploy"

#### 4️⃣ 初始化数据库（1分钟）

部署成功后，访问：
```
https://your-app.vercel.app/api/db-init
https://your-app.vercel.app/api/test-data
```

#### 5️⃣ 访问系统（现在！）

打开你的Vercel域名，登录即可！

演示账号：
- admin / admin123
- manager / manager123
- cs / cs123
- designer / designer123

## 其他部署方式

### 云服务器部署
详见：[部署指南.md](部署指南.md)

### Docker部署
详见：[部署指南.md](部署指南.md)

### 内网穿透（测试用）
详见：[部署指南.md](部署指南.md)

## 完整文档

- **快速清单**：[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)
- **详细指南**：[部署指南.md](部署指南.md)
- **使用说明**：[使用说明.md](使用说明.md)

## 需要帮助？

1. 查看 [部署指南.md](部署指南.md) 获取详细信息
2. 检查 Vercel 部署日志
3. 检查 Supabase 数据库连接

---

**准备好了吗？开始部署吧！** 🚀
