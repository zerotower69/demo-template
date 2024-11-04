import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import { IOauthService } from '@lib/interface/oauth.interface';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject('OAUTH_PACKAGE')
  private oauthClient: ClientGrpc;

  private oauthService: IOauthService;

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('oauth')
  getOauth() {
    return this.oauthService.findBook({ id: 1 });
  }
  onModuleInit() {
    this.oauthService =
      this.oauthClient.getService<IOauthService>('OauthService');
  }
}
