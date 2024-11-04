import { NestFactory } from '@nestjs/core';
import { Transport, GrpcOptions } from '@nestjs/microservices';
import { OauthModule } from './oauth.module';
import { GLOBAL_CONFIG } from '@lib/config';
import { resolve } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<GrpcOptions>(OauthModule, {
    transport: Transport.GRPC,
    options: {
      url: 'localhost:' + GLOBAL_CONFIG.apps.oauth.port,
      package: 'oauth',
      protoPath: resolve(__dirname + '../../../proto/oauth.proto'),
    },
  });
  app.listen();
}
bootstrap();
