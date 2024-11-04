import { Controller, Get } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { GrpcMethod, MessagePattern } from '@nestjs/microservices';

@Controller()
export class OauthController {
  constructor(private readonly oauthService: OauthService) {}

  @GrpcMethod('OauthService', 'FindBook')
  findOne(data: { id: string }) {
    return {
      id: data.id,
      title: 'Hello World',
      author: 'Nestjs',
    };
  }
}
