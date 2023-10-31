# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm
pnpm run dev
```

## Production

Build the application for production:

```bash
# pnpm
pnpm run build
```

## 用前须知

如果使用 Mongodb 数据库，那么请在 [设置](./config/index.ts) 中修改基本参数，如果不使用也请在设置中关闭 useDB 参数，防止资源损耗。使用数据库并有持续爬取数据需求的话还必须开启 crawling 参数，并且访问首页一次，如未开启参数，可以访问 /restartcraw 启动数据爬取功能。

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
