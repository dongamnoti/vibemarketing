# Vercel 部署指南

本指南将帮助您将 NextGrowth AI Marketing 网站部署到 Vercel。

## 前提条件

1. 拥有 GitHub 账户
2. 拥有 Vercel 账户（可以使用 GitHub 账户登录）
3. 项目代码已推送到 GitHub 仓库

## 部署步骤

### 1. 准备 GitHub 仓库

如果还没有将项目推送到 GitHub，请按以下步骤操作：

```bash
# 在项目根目录下初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit: NextGrowth AI Marketing Website"

# 添加远程仓库（替换为您的 GitHub 仓库地址）
git remote add origin https://github.com/yourusername/nextgrowth-website.git

# 推送到 GitHub
git push -u origin main
```

### 2. 连接 Vercel

1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账户登录
3. 点击 "New Project"
4. 从 GitHub 仓库列表中选择您的项目
5. 点击 "Import"

### 3. 配置部署设置

Vercel 会自动检测到这是一个 Astro 项目，并使用我们提供的 `vercel.json` 配置文件。

**重要配置项：**
- Framework Preset: Astro
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### 4. 环境变量配置

如果您的项目使用了环境变量（如 WordPress API 密钥），请在 Vercel 项目设置中添加：

1. 进入项目设置页面
2. 点击 "Environment Variables"
3. 添加必要的环境变量：
   - `WORDPRESS_API_URL`: WordPress API 地址
   - `WORDPRESS_API_KEY`: WordPress API 密钥（如果需要）

### 5. 部署

1. 点击 "Deploy" 按钮
2. 等待构建完成（通常需要 1-3 分钟）
3. 部署成功后，您将获得一个 `.vercel.app` 域名

### 6. 自定义域名（可选）

1. 在项目设置中点击 "Domains"
2. 添加您的自定义域名
3. 按照 Vercel 的指引配置 DNS 记录

## 自动部署

一旦连接到 GitHub，每次推送代码到主分支时，Vercel 都会自动重新部署您的网站。

## 性能优化

我们的 `vercel.json` 配置文件已经包含了以下优化：

- 静态资源缓存（1年）
- 安全头部设置
- API 路由重写

## 监控和分析

Vercel 提供了内置的分析功能：

1. 在项目仪表板中查看访问统计
2. 监控网站性能指标
3. 查看部署历史和日志

## 故障排除

### 常见问题

1. **构建失败**
   - 检查 `package.json` 中的依赖项
   - 确保所有必要的环境变量已设置

2. **页面 404 错误**
   - 检查路由配置
   - 确保 `vercel.json` 中的重写规则正确

3. **样式未加载**
   - 检查 Tailwind CSS 配置
   - 确保构建过程包含了 CSS 处理

### 获取帮助

- Vercel 文档: https://vercel.com/docs
- Astro 部署指南: https://docs.astro.build/en/guides/deploy/vercel/

## 成本

- 个人项目：免费（包含 100GB 带宽）
- 商业项目：根据使用量付费

---

部署完成后，您的网站将在全球 CDN 上运行，提供快速的加载速度和高可用性。