import { Module } from '@nestjs/common';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';
import { EtcdModule } from '@lib/etcd';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getConfig } from '@lib/config';
import { IOptions } from 'etcd3';
import { GlobalConfig } from '@types';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false, // 忽视默认读取.env的文件配置
      isGlobal: true, // 全局注入
      load: [getConfig], //从指定的yaml文件加载配置
    }),
    EtcdModule.forRootAsync({
      async useFactory(configService: ConfigService<GlobalConfig>) {
        await 111;
        const config = configService.get('etcd');
        return {
          hosts: config.hosts,
          auth: {
            username: config.username,
            password: config.password,
          },
        } as IOptions;
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [OauthController],
  providers: [OauthService],
})
export class OauthModule {}
