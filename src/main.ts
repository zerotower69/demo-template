import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

import { getConfig } from './config';
import { WINSTON_LOGGER_TOKEN } from './winston/winston.module';
import {
  BadRequestException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';

const config = getConfig();
const swaggerConfig = config['swagger'] ?? {
  enable: true,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(config?.server?.prefix ?? '/');
  app.useLogger(app.get(WINSTON_LOGGER_TOKEN));

  //swagger日志
  if (swaggerConfig.enable) {
    const docConfig = new DocumentBuilder()
      .setTitle(swaggerConfig?.title ?? 'nest-template')
      .setDescription(swaggerConfig?.description ?? 'The API document')
      .setVersion(swaggerConfig?.version ?? '1.0.0');
    const tags =
      typeof swaggerConfig.tags === 'undefined'
        ? ['api']
        : typeof swaggerConfig.tags === 'string'
          ? [swaggerConfig.tags]
          : swaggerConfig.tags;
    tags.forEach((tag) => {
      docConfig.addTag(tag);
    });
    docConfig.build();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const document = SwaggerModule.createDocument(app, docConfig);
    SwaggerModule.setup(swaggerConfig?.path ?? 'doc', app, document);
  }

  // 设置全局接口数据校验
  // 以下参数均可根据自身需求设置
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 启用参数类型自动转换，常规设置
      whitelist: true, // 监听参数白名单，常规设置
      // 禁止非白名单参数，存在非白名单属性报错。此项可根据需求而定，如果设置false，将剥离非白名单属性
      forbidNonWhitelisted: true,
      // 设置校验失败后返回的http状态码
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      // 设置校验失败后的响应数据格式
      exceptionFactory: (errors) => {
        // 此处要注意，errors是一个对象数组，包含了当前所调接口里，所有验证失败的参数及错误信息。
        // 此处的处理是只返回第一个错误信息
        const message = Object.values(errors[0].constraints);
        return new BadRequestException({
          message: message,
          status: HttpStatus.BAD_REQUEST,
        });
      },
    }),
  );

  await app.listen(config?.server?.port ?? 3000);
}
bootstrap();
