import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GLOBAL_CONFIG } from '@lib/config';
import { resolve } from 'path';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'OAUTH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:' + GLOBAL_CONFIG.apps.oauth.port,
          package: 'oauth',
          protoPath: resolve(__dirname, '../../../proto/oauth.proto'),
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
