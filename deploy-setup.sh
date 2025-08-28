#!/bin/bash

# NextGrowth AI Marketing Website - Vercel 部署设置脚本
# 使用方法: ./deploy-setup.sh <your-github-username> <repository-name>

set -e

# 检查参数
if [ $# -ne 2 ]; then
    echo "使用方法: $0 <dongamnoti> <vibemarketing>"
    echo "示例: $0 myusername nextgrowth-website"
    exit 1
fi

GITHUB_USERNAME=$1
REPO_NAME=$2
GITHUB_URL="https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

echo "🚀 开始设置 NextGrowth AI Marketing Website 部署..."
echo "GitHub 仓库: ${GITHUB_URL}"
echo ""

# 检查是否已经是 Git 仓库
if [ ! -d ".git" ]; then
    echo "📦 初始化 Git 仓库..."
    git init
else
    echo "✅ Git 仓库已存在"
fi

# 添加所有文件
echo "📁 添加项目文件..."
git add .

# 检查是否有更改需要提交
if git diff --staged --quiet; then
    echo "ℹ️  没有新的更改需要提交"
else
    echo "💾 提交更改..."
    git commit -m "feat: NextGrowth AI Marketing Website - Ready for Vercel deployment
    
- Complete Astro + TypeScript + Tailwind CSS setup
- Responsive design with modern UI components
- Blog system with WordPress Headless CMS integration
- SEO optimization with meta tags and sitemap
- PWA support with web manifest
- Custom logo design (geometric modern style)
- Vercel deployment configuration"
fi

# 检查是否已经有远程仓库
if git remote get-url origin >/dev/null 2>&1; then
    echo "🔗 更新远程仓库地址..."
    git remote set-url origin "${GITHUB_URL}"
else
    echo "🔗 添加远程仓库..."
    git remote add origin "${GITHUB_URL}"
fi

# 推送到 GitHub
echo "⬆️  推送到 GitHub..."
if git push -u origin main 2>/dev/null; then
    echo "✅ 成功推送到 GitHub!"
else
    echo "⚠️  推送失败，可能需要先在 GitHub 上创建仓库"
    echo "请访问: https://github.com/new"
    echo "创建名为 '${REPO_NAME}' 的仓库，然后重新运行此脚本"
    exit 1
fi

echo ""
echo "🎉 设置完成！接下来的步骤:"
echo "1. 访问 https://vercel.com"
echo "2. 使用 GitHub 账户登录"
echo "3. 点击 'New Project'"
echo "4. 选择仓库: ${GITHUB_USERNAME}/${REPO_NAME}"
echo "5. 点击 'Import' 开始部署"
echo ""
echo "📖 详细部署指南请查看 DEPLOYMENT.md 文件"
echo "🌐 GitHub 仓库: ${GITHUB_URL}"
echo ""
echo "✨ 祝您部署顺利！"