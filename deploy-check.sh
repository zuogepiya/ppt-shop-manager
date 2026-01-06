#!/bin/bash

# Vercel 部署前检查脚本
# 运行此脚本确保所有配置正确

echo "========================================="
echo "Vercel 部署前检查"
echo "========================================="
echo ""

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查函数
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1 存在"
        return 0
    else
        echo -e "${RED}✗${NC} $1 不存在"
        return 1
    fi
}

check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1 目录存在"
        return 0
    else
        echo -e "${RED}✗${NC} $1 目录不存在"
        return 1
    fi
}

# 1. 检查核心文件
echo "1. 检查核心文件..."
check_file "package.json" || exit 1
check_file "next.config.ts" || exit 1
check_file "vercel.json" || exit 1
check_file "tsconfig.json" || exit 1
echo ""

# 2. 检查目录结构
echo "2. 检查目录结构..."
check_dir "public" || exit 1
check_dir "src/app" || exit 1
check_dir "src/lib" || exit 1
echo ""

# 3. 检查关键配置
echo "3. 检查关键配置..."

# 检查 vercel.json
if grep -q '"outputDirectory".*"\.next"' vercel.json; then
    echo -e "${GREEN}✓${NC} vercel.json 输出目录配置正确 (.next)"
else
    echo -e "${YELLOW}⚠${NC} vercel.json 输出目录可能不正确"
fi

# 检查 package.json 脚本
if grep -q '"build":.*"next build"' package.json; then
    echo -e "${GREEN}✓${NC} package.json 构建脚本正确"
else
    echo -e "${RED}✗${NC} package.json 构建脚本不正确"
    exit 1
fi

if grep -q '"dev":.*"next dev' package.json; then
    echo -e "${GREEN}✓${NC} package.json 开发脚本正确"
else
    echo -e "${RED}✗${NC} package.json 开发脚本不正确"
    exit 1
fi
echo ""

# 4. 检查环境变量模板
echo "4. 检查环境变量模板..."
if check_file ".env.example"; then
    if grep -q "DATABASE_URL" .env.example && grep -q "SESSION_SECRET" .env.example; then
        echo -e "${GREEN}✓${NC} 环境变量模板包含必要变量"
    else
        echo -e "${YELLOW}⚠${NC} 环境变量模板可能缺少必要变量"
    fi
fi
echo ""

# 5. 检查依赖安装
echo "5. 检查依赖..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} node_modules 存在"
else
    echo -e "${YELLOW}⚠${NC} node_modules 不存在，将在 Vercel 自动安装"
fi
echo ""

# 6. 检查本地构建（可选）
echo "6. 尝试本地构建测试..."
read -p "是否运行本地构建测试？(y/n): " run_build

if [ "$run_build" = "y" ] || [ "$run_build" = "Y" ]; then
    echo "运行 pnpm run build..."
    if pnpm run build; then
        echo -e "${GREEN}✓${NC} 本地构建成功"
        echo ""
        
        # 检查 .next 目录
        if check_dir ".next"; then
            echo -e "${GREEN}✓${NC} 构建输出目录 (.next) 生成成功"
        else
            echo -e "${RED}✗${NC} 构建输出目录未生成"
            exit 1
        fi
    else
        echo -e "${RED}✗${NC} 本地构建失败"
        exit 1
    fi
else
    echo "跳过本地构建测试"
fi
echo ""

# 7. 生成部署摘要
echo "========================================="
echo "部署检查摘要"
echo "========================================="
echo ""
echo "项目名称: ppt-shop-manager"
echo "框架: Next.js 16"
echo "包管理器: pnpm"
echo ""
echo "Vercel 部署步骤:"
echo "1. 将代码推送到 GitHub"
echo "2. 在 Vercel 导入项目"
echo "3. 配置环境变量 (DATABASE_URL, SESSION_SECRET)"
echo "4. 点击 Deploy"
echo ""
echo "重要提醒:"
echo "✓ 确保 Vercel 项目设置中 Output Directory 为 .next (不是 public)"
echo "✓ 在 Vercel 中配置 DATABASE_URL 和 SESSION_SECRET 环境变量"
echo "✓ 部署后访问 /api/init-db 初始化数据库"
echo "✓ 使用 admin/admin123 登录"
echo ""
echo "详细指南请查看: VERCEL部署完整指南.md"
echo "========================================="
