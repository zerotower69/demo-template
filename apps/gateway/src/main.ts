import * as detect from 'detect-port';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GLOBAL_CONFIG } from '@lib/config';
import { GrpcServer } from '@grpc.ts/nestjs-server';
import { resolve } from 'path';
import consola from 'consola';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.connectMicroservice(
  //   GrpcServer.createService([
  //     {
  //       url: 'localhost:' + GLOBAL_CONFIG.apps.oauth.port,
  //       package: {
  //         packageName: 'oauth',
  //         protoPath: resolve(__dirname + '../../../proto/oauth.proto'),
  //       },
  //       packageDefinitionOptions: {
  //         oneofs: true,
  //         longs: String,
  //         enums: String,
  //         defaults: true,
  //       },
  //       options: {
  //         keepaliveTimeMs: 5_000,
  //       },
  //     },
  //   ]),
  // );
  const port = await detect(GLOBAL_CONFIG.apps.gateway.port);
  // await app.startAllMicroservices();
  await app.listen(port, () => {
    consola.success(`Listening at http://localhost:${port}`);
  });
}
bootstrap();
