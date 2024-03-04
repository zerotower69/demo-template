import type { Dialect, PoolOptions } from 'sequelize';
//服务配置
export type ServerConfig = {
  //主机地址,默认localhost
  host: string;
  //程序启动端口,默认3000
  port: number | string;
  //前缀
  prefix: string;
};

//JWTModule相关配置
export type JWTConfig = {
  //秘钥
  secret: string;
  //过期时间 https://github.com/vercel/ms. 2 days| 1y | 10h | 7d
  expireIn: string;
};

//mysql配置
export type MySQLConfig = {
  //主机地址
  host: string;
  //端口
  port: number;
  //方言
  dialect: Dialect;
  //数据库
  database: string;
  //用户名
  username: string;
  //密码
  password: string;
  //是否同步
  synchronize: boolean;
  //是否自动加载模型，默认false
  autoLoadModels: boolean;
  //时区设置
  timezone: string;
  logging: boolean | ((sql: string, timing?: number) => void);
  //连接池
  pool?: PoolOptions;
};

//redis配置
export type RedisConfig = {
  host: string;
  port: number;
  //是否需要验证，默认是false
  enableAuth: boolean;
  password: string;
};
//https://www.npmjs.com/package/winston#logging-levels
export type WinstonLevel =
  | 'emerg'
  | 'alert'
  | 'crit'
  | 'error'
  | 'warning'
  | 'notice'
  | 'info'
  | 'debug';

//日志配置
export type LoggerConfig = {
  level: WinstonLevel;
  //输出日志的文件名，默认app.log
  filename: string;
  //日志存放目录，默认log(项目根目录下)
  dirname: string;
};

//Swagger文档配置
export type SwaggerConfig = {
  //是否启用swagger文档，默认true
  enable: boolean;
  //文档标题,默认：nest-template
  title: string;
  //文档描述，默认：The API description
  description: string;
  //文档版本，默认：1.0.0
  version: string;
  //文档标签，默认：api
  tags: string | [string];
  //文档路径
  path: string;
};

//应用配置
export type AppConfig = {
  //服务配置
  server: ServerConfig;
  //jwt module
  jwt: JWTConfig;
  //mysql 配置
  mysql: Partial<MySQLConfig>;
  redis?: Partial<RedisConfig>;
  logger?: Partial<LoggerConfig>;
  swagger?: Partial<SwaggerConfig>;
};
