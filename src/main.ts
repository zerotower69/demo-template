import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

import { getConfig } from './config';
import { WINSTON_LOGGER_TOKEN } from './winston/winston.module';

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

  await app.listen(config?.server?.port ?? 3000);
}
bootstrap();
