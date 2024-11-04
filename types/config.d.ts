import { JWTConfig } from './jwt';
import { MySQLConfig } from './mysql';
import { RedisConfig } from './redis';
import { LoggerConfig } from './log';
import { SwaggerConfig } from './swagger';
import { BucketConfig } from './bucket';
import { OauthConfig } from './oauth';
import { AppConfig } from './server';
import { ETCDConfig } from '@types/etcd';

export type GlobalConfig = {
  //服务配置
  apps: Partial<AppConfig>;
  //jwt module
  jwt: JWTConfig;
  //mysql 配置
  mysql: MySQLConfig;
  redis: RedisConfig;
  logger: LoggerConfig;
  swagger: SwaggerConfig;
  bucket: BucketConfig;
  oauth: OauthConfig;
  etcd: ETCDConfig;
};
