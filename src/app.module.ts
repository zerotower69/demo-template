import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './config';
import { UserModel, RoleModel, UserRoleModel } from './models';
import { UserModule } from './user/user.module';
import { WinstonModule } from './winston/winston.module';
import { transports, format } from 'winston';
import * as chalk from 'chalk';
import { JwtModule } from '@nestjs/jwt';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpCodeInterceptor } from './interceptor/httpCode.interceptor';
import { HelloFilter } from './exception/hello.filter';
import { UnloginFilter } from './exception/unlogin.filter';
import { RedisOptions } from 'ioredis';
import { deleteKey } from './utils';
import { RedisModule } from './redis/redis.module';
import { Type } from '@nestjs/common/interfaces/type.interface';
import { DynamicModule } from '@nestjs/common/interfaces/modules/dynamic-module.interface';
import { ForwardReference } from '@nestjs/common/interfaces/modules/forward-reference.interface';
import { LoginGuard } from './auth/login.guard';

const config = getConfig();

const sqlConfig = config['mysql'] ?? {};
const logConfig = config['logger'] ?? {};
const jwtConfig = config['jwt'];
const redisConfig = config['redis'] ?? {};

//自定义逻辑判断有些模块是否使用
const defaultModule: Array<
  Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
> = [
  ConfigModule.forRoot({
    ignoreEnvFile: false, // 忽视默认读取.env的文件配置
    isGlobal: true, // 全局注入
    load: [getConfig], // 加载配置文件
  }),
  WinstonModule.forRoot({
    level: logConfig?.level ?? 'info',
    transports: [
      new transports.Console({
        format: format.combine(
          format.colorize(),
          format.printf(({ context, level, message, time }) => {
            const appStr = chalk.green(`[NEST]`);
            const contextStr = chalk.yellow(`[${context}]`);

            return `${appStr} ${time} ${level} ${contextStr} ${message} `;
          }),
        ),
      }),
      new transports.File({
        format: format.combine(format.timestamp(), format.json()),
        filename: logConfig?.filename ?? 'app.log',
        dirname: logConfig?.dirname ?? 'log',
      }),
    ],
  }),
  JwtModule.register({
    global: true,
    secret: jwtConfig.secret,
    signOptions: {
      expiresIn: jwtConfig.expireIn,
    },
  }),
  SequelizeModule.forRoot({
    host: 'localhost',
    port: 3306,
    autoLoadModels: false,
    synchronize: false,
    dialect: 'mysql',
    timezone: '+08:00',
    models: [UserModel, RoleModel, UserRoleModel],
    logging: false,
    ...sqlConfig,
  }),
  UserModule,
];
if (redisConfig?.enable ?? true) {
  let redisOptions: RedisOptions = {
    port: redisConfig?.port ?? 6379,
    host: redisConfig?.host ?? '127.0.0.1',
  };
  if (redisConfig.enableAuth) {
    deleteKey(redisOptions, 'port', 'host', 'enableAuth', 'enable');
    redisOptions = {
      ...redisOptions,
      ...redisConfig,
    };
  }
  defaultModule.push(RedisModule.forRoot(redisOptions));
}

@Module({
  imports: defaultModule,
  controllers: [AppController],
  providers: [
    AppService,
    //默认201--200
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpCodeInterceptor,
    },
    //全局异常过滤器处理
    {
      provide: APP_FILTER,
      useClass: HelloFilter,
    },
    {
      provide: APP_FILTER,
      useClass: UnloginFilter,
    },
    //全局守卫
    {
      provide: APP_GUARD,
      useClass: LoginGuard,
    },
  ],
})
export class AppModule {}
