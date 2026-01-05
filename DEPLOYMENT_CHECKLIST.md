# 快速部署清单（Vercel + Supabase）

这是一个简化的部署清单，帮助你快速将系统部署到公网。

## 准备工作（5分钟）

### 1. 注册账号
- [ ] GitHub账号：https://github.com
- [ ] Vercel账号：https://vercel.com
- [ ] Supabase账号：https://supabase.com

### 2. 本地准备
- [ ] 确保项目代码完整
- [ ] 测试本地运行正常
- [ ] Git已安装

## 第一步：准备Supabase数据库（10分钟）

### 1. 创建项目
1. 访问 https://supabase.com
2. 点击 "Start your project"
3. 使用GitHub账号登录
4. 点击 "New Project"
5. 填写信息：
   - Name: `ppt-shop-manager`
   - Database Password: 设置一个强密码（记住它！）
   - Region: 选择距离最近的区域
6. 等待项目创建（约1-2分钟）

### 2. 获取数据库连接字符串
1. 进入项目首页
2. 点击左侧 "Settings" 图标
3. 选择 "Database"
4. 找到 "Connection string" 部分
5. 选择 "URI" 标签
6. 复制连接字符串，格式如下：
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```

### 3. 保存连接字符串
将连接字符串保存到安全的地方，稍后会用到。

## 第二步：推送代码到GitHub（5分钟）

### 1. 初始化Git仓库
```bash
cd /workspace/projects
git init
```

### 2. 创建.gitignore文件（如果还没有）
```bash
cat > .gitignore << 'EOF'
# dependencies
node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env
.env.production

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# logs
*.log
logs/
EOF
```

### 3. 提交代码
```bash
git add .
git commit -m "feat: PPT制作店铺员工管理系统"
```

### 4. 创建GitHub仓库
1. 访问 https://github.com/new
2. 创建新仓库：
   - Repository name: `ppt-shop-manager`
   - 勾选 "Public"（免费账号只能创建公开仓库）
3. 点击 "Create repository"

### 5. 推送代码
```bash
# 添加远程仓库（替换YOUR_USERNAME为你的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/ppt-shop-manager.git

# 推送代码
git branch -M main
git push -u origin main
```

## 第三步：部署到Vercel（5分钟）

### 1. 导入项目
1. 访问 https://vercel.com
2. 点击 "Add New..." -> "Project"
3. 点击 "Import" 导入你的GitHub仓库 `ppt-shop-manager`
4. 点击 "Continue"

### 2. 配置项目
- **Framework Preset**: Next.js（自动检测）
- **Root Directory**: `./`（保持默认）

### 3. 添加环境变量
1. 找到 "Environment Variables" 部分
2. 点击 "Add New"
3. 添加以下环境变量：
   ```
   Name: DATABASE_URL
   Value: [第一步获取的Supabase连接字符串]
   ```
4. 点击 "Add"
5. 确认环境变量已添加

### 4. 部署
1. 点击 "Deploy" 按钮
2. 等待部署完成（约1-2分钟）
3. 部署成功后会显示：
   - 一个 `.vercel.app` 域名，如：`https://ppt-shop-manager.vercel.app`
   - 构建日志和部署状态

### 5. 记下你的域名
将生成的域名保存下来，例如：`https://ppt-shop-manager-xxx.vercel.app`

## 第四步：初始化数据库（2分钟）

### 1. 初始化数据库表
在浏览器中访问（替换为你的实际域名）：
```
https://ppt-shop-manager-xxx.vercel.app/api/db-init
```

应该看到：
```json
{
  "success": true,
  "message": "数据库表结构初始化成功"
}
```

### 2. 插入测试数据
访问：
```
https://ppt-shop-manager-xxx.vercel.app/api/test-data
```

应该看到：
```json
{
  "success": true,
  "message": "测试数据插入成功"
}
```

## 第五步：测试系统（2分钟）

### 1. 访问系统
在浏览器中打开你的Vercel域名：
```
https://ppt-shop-manager-xxx.vercel.app
```

### 2. 测试登录
使用以下账号测试：

| 角色 | 用户名 | 密码 |
|------|--------|------|
| 总台管理 | admin | admin123 |
| 管理者 | manager | manager123 |
| 客服 | cs | cs123 |
| 设计师 | designer | designer123 |

### 3. 测试功能
- [ ] 登录成功
- [ ] 可以看到对应角色的页面
- [ ] 员工管理页面正常
- [ ] 订单管理页面正常
- [ ] 财务管理页面正常

## 第六步：自定义域名（可选，10分钟）

### 1. 准备域名
如果你有自己的域名（如 `ppt-manager.example.com`），可以绑定到Vercel。

### 2. 在Vercel添加域名
1. 进入Vercel项目页面
2. 点击 "Settings" 标签
3. 选择 "Domains"
4. 输入你的域名，如 `ppt-manager.example.com`
5. 点击 "Add"

### 3. 配置DNS
Vercel会显示需要配置的DNS记录：
```
Type: CNAME
Name: ppt-manager
Value: cname.vercel-dns.com
```

### 4. 更新DNS
到你的域名服务商（阿里云、腾讯云等）添加上述DNS记录。

### 5. 等待生效
DNS生效可能需要几分钟到几小时不等。

### 6. 配置SSL
Vercel会自动为你的域名配置SSL证书（免费Let's Encrypt）。

## 完成！🎉

你的系统现在已经部署到公网，任何人都可以通过互联网访问。

## 下一步建议

### 1. 修改默认密码
登录系统后，立即修改所有演示账号的密码，确保安全。

### 2. 配置备份
在Supabase中：
- 进入 "Database" -> "Backups"
- 开启自动备份（每天自动备份）

### 3. 监控告警
在Vercel中：
- 进入 "Settings" -> "Notifications"
- 配置部署失败、错误率过高等告警

### 4. 性能优化
- 监控数据库连接数
- 优化慢查询
- 配置CDN缓存

## 常见问题

### Q: 部署失败怎么办？
A:
1. 检查Vercel的部署日志
2. 确认环境变量配置正确
3. 确认Supabase数据库可访问
4. 检查代码是否有语法错误

### Q: 数据库连接失败？
A:
1. 确认DATABASE_URL格式正确
2. 检查Supabase项目是否激活
3. 确认密码正确
4. 检查Supabase的连接限制

### Q: 如何更新代码？
A:
1. 修改本地代码
2. `git add . && git commit -m "xxx" && git push`
3. Vercel会自动检测并部署新版本

### Q: 如何回滚版本？
A:
1. 进入Vercel项目页面
2. 点击 "Deployments" 标签
3. 找到之前的版本
4. 点击右侧 "..." -> "Promote to Production"

### Q: 免费套餐够用吗？
A:
- Vercel免费套餐：100GB带宽/月
- Supabase免费套餐：500MB存储，50,000 次数据库查询/月
- 适合个人或小团队使用
- 如果流量较大，可以考虑升级套餐

## 费用预估

| 项目 | 免费额度 | 超出费用 |
|------|----------|----------|
| Vercel | 100GB带宽/月 | $20/100GB |
| Supabase | 500MB存储 | $0.125/GB |
| Supabase | 50,000查询/月 | $0.005/1000次 |

对于小型团队，免费套餐通常足够使用。

---

## 技术支持

如果遇到问题：
1. 查看 `部署指南.md` 获取详细说明
2. 检查Vercel和Supabase的官方文档
3. 查看错误日志和构建日志

祝你部署顺利！🚀
