import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './config';
import { UserModule } from './user/user.module';
import { UserModel } from './user/model/user.model';

const config = getConfig();

const sqlConfig = config['mysql'] ?? {};

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false, // 忽视默认读取.env的文件配置
      isGlobal: true, // 全局注入
      load: [getConfig], // 加载配置文件
    }),
    SequelizeModule.forRoot({
      host: 'localhost',
      port: 3306,
      autoLoadModels: false,
      synchronize: false,
      dialect: 'mysql',
      timezone: '+08:00',
      models: [UserModel],
      logging: false,
      ...sqlConfig,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
