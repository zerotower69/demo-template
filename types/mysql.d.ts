import { Dialect, PoolOptions } from 'sequelize';

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
