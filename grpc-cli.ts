import type { IConfigProps } from '@grpc.ts/cli';

const config: IConfigProps = {
  paths: ['proto/*.proto'],
  output: 'libs/interface/src',
  buildDir: 'dist',
  external: ['google.protobuf'],
};

export default config;
