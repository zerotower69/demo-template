import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { getConfig } from './config';

const config = getConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(config?.server?.prefix ?? '/');
  await app.listen(config?.server?.port ?? 3000);
}
bootstrap();
