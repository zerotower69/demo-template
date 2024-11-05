FROM node:18.13-alpine3.16 as build-state
ARG SERVICE_NAME

ENV SERVICE_NAME=${SERVICE_NAME}


WORKDIR /app

# copy all file
COPY . .

# 安装pnpm 和依赖
RUN npm install -g pnpm --registry=https://registry.npmmirror.com/
RUN pnpm install --registry=https://registry.npmmirror.com/

RUN echo "install completely"

COPY LICENSE ./LICENSE
COPY application.dev.yaml ./application.dev.yaml
COPY application.prod.yaml ./application.prod.yaml
RUN npm link
RUN cp  -r proto dist/proto
RUN #gen-grpc-typing
RUN build-all-app
RUN generate-package

# production state
FROM node:18.13-alpine3.16 as production-state

LABEL author="zerotower"
LABEL version="1.0.0"
LABEL description="blog server"

WORKDIR /app

# copy file
COPY --from=build-state /app/dist ./dist
COPY --from=build-state /app/package-tmp.json ./package.json
COPY --from=build-state /app/LICENSE ./LICENSE
COPY --from=build-state /app/proto ./proto
COPY --from=build-state /app/application.dev.yaml ./application.dev.yaml
COPY --from=build-state /app/application.prod.yaml ./application.prod.yaml

# 构建依赖
RUN npm install -g pnpm --registry=https://registry.npmmirror.com/
RUN pnpm install --only=production --registry=https://registry.npmmirror.com/

#构建完成
RUN echo "build finished"
EXPOSE 4000

CMD ["pnpm","run","start-all:prod"]


