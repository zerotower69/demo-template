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
  //过期时间
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

//日志配置
export type LoggerConfig = {};

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
};
