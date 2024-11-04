import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { EtcdService } from '@lib/etcd';

@Injectable()
export class OauthService implements OnApplicationBootstrap {
  constructor(private readonly etcdService: EtcdService) {}
  getHello(): string {
    return 'Hello Oauth!';
  }

  onApplicationBootstrap() {
    this.etcdService.registerService('oauth', 1, { name: 'oauth' });
  }
}
