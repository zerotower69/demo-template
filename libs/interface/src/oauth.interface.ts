import type { Metadata, ServiceClient } from '@grpc.ts/core';

export const PACKAGE_NAME = 'oauth';

export interface IBook {
  id: number;
  title: string;
  author: string;
  description: string;
}

export interface IBookById {
  id: number;
}

export const OAUTH_SERVICE = 'OauthService';

export interface IOauthService extends ServiceClient {
  FindBook(params: IBookById, metadata?: Metadata): Promise<IBook>;
  findBook(params: IBookById, metadata?: Metadata): Promise<IBook>;
}
