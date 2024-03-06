FROM node:18

#指定当前目录为容器内的/app
WORKDIR /app

#拷贝package.json文件到/app/package.json
COPY package.json .

#设置npm镜像源
RUN npm config set registry https://registry.npmmirror.com/

#安装所有的依赖
RUN npm install

#安装pm2
RUN npm i -g pm2

#只拷贝打包文件和配置文件
#COPY dist dist/
#COPY application.prod.yaml .
COPY . .

#暴露3000端口，如果application.prod.yaml文件指定了端口，则需要保持一致
EXPOSE 3000

CMD ["npm","run","start:prod:docker"]
