# BNYC Qingdao Trip

这是一个可公开上线的报名页面项目，适合发到群里给学员填写。

## 推荐上线方案

- 代码托管：GitHub
- 页面部署：Vercel
- 报名数据与付款截图：Supabase

这个方案适合你的原因：

- 学员可直接公开访问页面报名
- 付款截图可以上传保存
- 你可以在 Supabase 后台查看所有报名记录
- 你可以按 `Full Name` 和 PayNow 付款备注手动比对收款

## 当前表单收集内容

- Full Name
- Email Address
- Contact Number
- Company Name & Designation
- Do you require an invoice?
- Company / Individual Name for Invoice
- Payment Proof

## 上线前你要做的事

### 1. 创建 Supabase 项目

登录 [Supabase](https://supabase.com/)，新建一个项目。

### 2. 执行数据库和存储配置 SQL

在 Supabase 的 SQL Editor 中运行：

- [supabase-setup.sql](file:///Users/zihangzhu/Documents/trae_projects/website/supabase-setup.sql)

这个 SQL 会创建：

- `registrations` 表
- `payment-proofs` 存储桶
- 匿名提交和匿名上传策略

### 3. 填写 Supabase 前端配置

打开：

- [config.js](file:///Users/zihangzhu/Documents/trae_projects/website/public/config.js)

把下面两个值填进去：

- `supabaseUrl`
- `supabaseAnonKey`

可在 Supabase Project Settings -> API 中找到。

示例：

```js
window.APP_CONFIG = {
  supabaseUrl: "https://YOUR_PROJECT.supabase.co",
  supabaseAnonKey: "YOUR_SUPABASE_ANON_KEY",
  supabaseBucket: "payment-proofs"
};
```

### 4. 推送到 GitHub

把项目代码推到你的 GitHub 仓库。

### 5. 用 Vercel 部署

登录 [Vercel](https://vercel.com/)，选择：

- Add New Project
- 导入你的 GitHub 仓库
- 直接部署

这是纯静态页面，不需要额外构建配置。

## 学员提交后，数据会去哪里

- 报名表数据：Supabase 表 `registrations`
- 付款截图：Supabase Storage `payment-proofs`

前端提交逻辑在：

- [script.js](file:///Users/zihangzhu/Documents/trae_projects/website/public/script.js)

## 你如何核对 PayNow 收款和报名表

建议学员一定按页面提示，把自己的全名写进付款备注。

你后续核对时：

1. 打开 Supabase Table Editor
2. 查看 `registrations` 表
3. 按 `full_name` 查找报名记录
4. 对照 PayNow 收款记录里的付款备注姓名
5. 打开对应提交时间和付款截图进行确认
6. 核对成功后，把该记录视为已付款

你主要会用到这些字段：

- `full_name`
- `email`
- `created_at`
- `payment_proof_path`
- `status`

## 当前按钮和页面说明

- 页面已经提醒用户：`Please enter your full name in the payment reference.`
- 提交按钮文案为 `Register`
- 提交成功后会跳转到独立成功页 `success.html`

## 多客户复用

现在这套项目已经适合继续复用给不同客户，同时不影响当前 `BNYC` 页面。

- 默认客户配置文件： [client-config.js](file:///Users/zihangzhu/Documents/trae_projects/website/public/client-config.js)
- 当前默认客户 slug： `bnyc-qingdao`
- 默认线上访问方式： `/`
- 指定其他客户的访问方式： `/?client=你的客户slug`

### 新增一个客户怎么做

1. 打开 [client-config.js](file:///Users/zihangzhu/Documents/trae_projects/website/public/client-config.js)
2. 复制 `bnyc-qingdao` 这一整段配置
3. 改成新的 slug，例如 `client-b`
4. 替换下面这些内容：

- `brand.name`
- `brand.subtitle`
- `brand.logoSrc`
- `programme.name`
- `programme.priceDisplay`
- `programme.amountValue`
- `programme.posterSrc`
- `programme.datesValue`
- `programme.includesItems`
- `programme.itineraryItems`
- `payment.qrSrc`
- `payment.payeeName`
- `success.headlineLines`
- `success.badges`
- `success.discoverItems`

### 新素材放哪里

建议把新客户素材放到自己的目录，例如：

```text
public/clients/client-b/logo.png
public/clients/client-b/poster.png
public/clients/client-b/paynow-qr.png
```

然后在 `client-config.js` 里这样写：

```js
logoSrc: "/clients/client-b/logo.png",
posterSrc: "/clients/client-b/poster.png",
qrSrc: "/clients/client-b/paynow-qr.png"
```

当前项目已经按这个方式整理：

```text
public/clients/bnyc-qingdao/
public/clients/business-china-ylp-shenzhen/
```

如果某个客户暂时没有单独的 logo 文件，就把 `logoSrc` 留空，页面会自动隐藏 logo，避免误用其他客户的 logo。

### 为什么这样不会影响现在的网页

- 根页面 `/` 仍然默认读取 `bnyc-qingdao`
- 新客户通过 `?client=slug` 切换配置
- 成功页会自动带上同一个 `client` 参数
- 所有客户共用同一套模板，但文案和素材彼此独立

## 本地预览

如果你只想看页面：

- 直接打开 [index.html](file:///Users/zihangzhu/Documents/trae_projects/website/public/index.html)

如果你要测试真实提交：

- 先完成 Supabase 配置
- 再把页面部署出去，或本地用服务器方式打开

## 目前我已经帮你准备好的文件

- 页面： [index.html](file:///Users/zihangzhu/Documents/trae_projects/website/public/index.html)
- 样式： [styles.css](file:///Users/zihangzhu/Documents/trae_projects/website/public/styles.css)
- 提交逻辑： [script.js](file:///Users/zihangzhu/Documents/trae_projects/website/public/script.js)
- Supabase 配置： [config.js](file:///Users/zihangzhu/Documents/trae_projects/website/public/config.js)
- Supabase 建表 SQL： [supabase-setup.sql](file:///Users/zihangzhu/Documents/trae_projects/website/supabase-setup.sql)

## 你现在离上线只差这几步

1. 注册并登录 Supabase
2. 运行 SQL
3. 把 Supabase URL 和 anon key 填进 `public/config.js`
4. 推到 GitHub
5. 在 Vercel 导入仓库并部署

如果你把 Supabase 项目建好，我下一步可以继续直接带你逐步完成：

- SQL 要粘贴到哪里
- `config.js` 要填什么
- Vercel 要点哪里
