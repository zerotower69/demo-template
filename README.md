# grpc 构建微服务实战

> 这是一个使用gRPC构建的微服务实战构建参考。

## 项目结构
```bash
- apps # 微服务应用，gateway是主要的网关应用，也是主要的调用者，其它应用都是微服务
- docker # docker 镜像打包的配置文件
- proto # gRPC的proto文件
- libs # 通用库 采用nestjs 官方提供的library
- types # 定义的类型文件
- commitlint.config.js # git commit 规范配置文件
- grpc-cli.ts # grpc-cli 配置文件，用于将.proto定义的gRPC的数据结构转为typescript
- tsconfig.json # ts配置文件
- nest-cli.json # nest配置文件
```

## 命令
```bash
pnpm run start:gateway # 启动网关应用，如果更改了文件，需要重新运行
pnpm run start:gateway:dev # 启动网关应用，如果更改了文件，会自动重新编译
pnpm run start:oauth # 启动oauth服务
pnpm run start:oauth:dev # 启动oauth服务，如果更改了文件，会自动重新编译
pnpm run start:all # 启动所有服务(网关和所有的微服务)
pnpm run start:all:dev # 启动所有服务(网关和所有的微服务)，如果更改了文件，会自动重新编译

pnpm run copy-proto # 将proto文件拷贝到dist/proto目录下
pnpm run gen-proto-ts # 将proto文件生成为typescript文件(libs/interface/src)
```

## 更多
- [gRPC 官方文档](https://grpc.io/docs/languages/node/basics/)
- [nestjs官方文档](https://docs.nestjs.com/)

## License
[MIT](LICENSE)

## 关于我
我是程序员零塔，全栈开发爱好者。
你可以访问我的 [网站](https://www.zerotower.cn)，
也可以加入QQ群[434063310]


