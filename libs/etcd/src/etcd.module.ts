import { Module, DynamicModule, Provider, Global } from '@nestjs/common';
import { EtcdService } from './etcd.service';
import { Etcd3, IOptions } from 'etcd3';
export const ETCD_CLIENT_TOKEN = 'ETCD_CLIENT';

export const ETCD_CLIENT_OPTIONS_TOKEN = 'ETCD_CLIENT_OPTIONS';
export interface EtcdModuleAsyncOptions {
  useFactory?: (...args: any[]) => Promise<IOptions> | IOptions;
  inject?: any[];
}

@Module({})
export class EtcdModule {
  static forRoot(options?: IOptions): DynamicModule {
    return {
      module: EtcdModule,
      providers: [
        EtcdService,
        {
          provide: ETCD_CLIENT_TOKEN,
          useFactory(options: IOptions) {
            const client = new Etcd3(options);
            return client;
          },
          inject: [ETCD_CLIENT_OPTIONS_TOKEN],
        },
        {
          provide: ETCD_CLIENT_OPTIONS_TOKEN,
          useValue: options,
        },
      ],
      exports: [EtcdService, ETCD_CLIENT_OPTIONS_TOKEN],
    };
  }

  static forRootAsync(options: EtcdModuleAsyncOptions): DynamicModule {
    const providerInstance = {
      provide: ETCD_CLIENT_OPTIONS_TOKEN,
      ...options,
    };
    const clientProvider = {
      provide: ETCD_CLIENT_TOKEN,
      useFactory: (options: IOptions) => {
        return new Etcd3(options);
      },
      inject: [ETCD_CLIENT_OPTIONS_TOKEN],
    };
    return {
      module: EtcdModule,
      providers: [
        {
          provide: ETCD_CLIENT_OPTIONS_TOKEN,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        {
          provide: ETCD_CLIENT_TOKEN,
          useFactory(options: IOptions) {
            const client = new Etcd3({
              ...options,
            });
            return client;
          },
          inject: [ETCD_CLIENT_OPTIONS_TOKEN],
        },
        {
          provide: EtcdService,
          async useFactory(client: Etcd3) {
            return new EtcdService(client);
          },
          inject: [ETCD_CLIENT_TOKEN],
        },
      ],
      exports: [ETCD_CLIENT_OPTIONS_TOKEN, ETCD_CLIENT_TOKEN, EtcdService],
    };
  }
}
