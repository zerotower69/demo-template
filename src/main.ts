import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { getConfig } from './config';
import { WINSTON_LOGGER_TOKEN } from './winston/winston.module';

const config = getConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(config?.server?.prefix ?? '/');
  app.useLogger(app.get(WINSTON_LOGGER_TOKEN));
  await app.listen(config?.server?.port ?? 3000);
}
bootstrap();
