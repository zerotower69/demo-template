//服务配置
export type ServerConfig = {
  //主机地址,默认localhost
  host: string;
  //程序启动端口,默认3000
  port: number;
  //路径前缀
  prefix: string;
};

export type AppConfig = {
  gateway: Partial<ServerConfig>;
  oauth: Partial<ServerConfig>;
  email: Partial<ServerConfig>;
  article: Partial<ServerConfig>;
  site: Partial<ServerConfig>;
  job: Partial<ServerConfig>;
  resume: Partial<ServerConfig>;
};
