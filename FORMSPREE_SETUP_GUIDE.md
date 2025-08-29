# Formspree 设置指南

## 概述
我已经为您的联系表单集成了 Formspree 服务，这样您就可以接收访客留言了。现在您需要完成以下步骤来激活这个功能。

## 步骤 1: 注册 Formspree 账户

1. 访问 [Formspree 官网](https://formspree.io/)
2. 点击 "Sign Up" 注册账户
3. 使用您的邮箱地址注册（建议使用 business@nextgrowth.ai）
4. 验证邮箱地址

## 步骤 2: 创建新表单

1. 登录 Formspree 控制台
2. 点击 "New Form" 创建新表单
3. 输入表单名称："NextGrowth AI 联系表单"
4. 输入接收邮箱：business@nextgrowth.ai（或您希望接收留言的邮箱）
5. 点击 "Create Form"

## 步骤 3: 获取表单 ID

1. 创建表单后，您会看到一个类似 `xpznvqko` 的表单 ID
2. 复制这个 ID

## 步骤 4: 更新网站代码

1. 打开 `src/pages/contact.astro` 文件
2. 找到第 32 行的表单标签：
   ```html
   <form class="space-y-6" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
3. 将 `YOUR_FORM_ID` 替换为您在步骤 3 中获取的实际表单 ID：
   ```html
   <form class="space-y-6" id="contactForm" action="https://formspree.io/f/xpznvqko" method="POST">
   ```

## 步骤 5: 配置表单设置（可选）

在 Formspree 控制台中，您可以配置以下设置：

### 基本设置
- **表单名称**: NextGrowth AI 联系表单
- **接收邮箱**: business@nextgrowth.ai
- **回复邮箱**: 设置为表单中的 email 字段

### 高级设置
- **垃圾邮件过滤**: 启用（推荐）
- **文件上传**: 如果需要接收文件，可以启用
- **自动回复**: 可以设置自动回复邮件给提交者

### 重定向设置
- **成功页面**: 可以设置提交成功后跳转的页面
- **错误页面**: 可以设置提交失败后跳转的页面

## 步骤 6: 测试表单

1. 保存代码更改
2. 重新部署网站到 Vercel
3. 访问联系页面：`https://your-domain.com/contact`
4. 填写并提交测试表单
5. 检查您的邮箱是否收到了测试邮件

## 步骤 7: 查看提交的留言

### 方法 1: 邮箱通知
- 每次有人提交表单，您都会收到邮件通知
- 邮件包含所有表单字段的信息

### 方法 2: Formspree 控制台
- 登录 Formspree 控制台
- 点击您的表单名称
- 在 "Submissions" 标签页查看所有提交记录
- 可以导出为 CSV 格式

### 方法 3: API 集成（高级）
- Formspree 提供 API 接口
- 可以集成到您的 CRM 系统或其他工具中

## 免费计划限制

Formspree 免费计划包括：
- 每月 50 次表单提交
- 基本垃圾邮件过滤
- 邮件通知

如果需要更多功能，可以升级到付费计划。

## 故障排除

### 表单提交后没有收到邮件
1. 检查垃圾邮件文件夹
2. 确认表单 ID 正确
3. 检查 Formspree 控制台中的提交记录

### 表单提交失败
1. 检查网络连接
2. 确认表单 action URL 正确
3. 检查浏览器控制台是否有错误信息

### 收到垃圾邮件
1. 在 Formspree 控制台启用垃圾邮件过滤
2. 考虑添加 reCAPTCHA 验证

## 下一步

完成设置后，您就可以：
1. 实时接收访客咨询
2. 及时回复潜在客户
3. 跟踪营销效果
4. 建立客户数据库

如果您需要更高级的功能（如 CRM 集成、自动化营销等），我们可以进一步讨论定制解决方案。