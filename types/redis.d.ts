//redis配置
export type RedisConfig = {
  //是否启用,默认true
  enable: boolean;
  host: string;
  port: number;
  username: string;
  //是否需要验证，默认是false
  enableAuth: boolean;
  password: string;
  //默认是0
  db: number;
};
