# vue3 示例模板

> vue3快速模板，引入了unocss支持快速示例搭建，并提供完善的打包配置。

## 安装依赖

**项目node版本16起步，如果低于该版本，请考虑使用nvm升级**

```bash
npm install
```

## 项目运行

```bash
npm run dev
```

## 打包

```bash
npm run build #普通打包，会检查ts和eslint错误
npm run build-only #普通打包，不会检查ts错误
npm run build:docker
```

## 配置文件

可以前往[.dev.production](/.env.production)文件查看，你可以按注释提示修改
相关的VITE_ 应用变量来完成相应的应用标题，部署路径的更改

## 工作流

可以将项目快速部署到github pages,因此你需要注意工作流中使用的node版本和pnpm版本是否和
[package.json](package.json)中一致。如果你的项目输出目录更改后（默认是dist）,
对应[deploy.yaml](.github/workflows/deploy.yaml)文件的部署路径也需要相应地更改。

## 其它
使用上有问题请提issues。
