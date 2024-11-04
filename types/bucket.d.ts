//对象存储
import { auth, zone } from 'qiniu';

export type QiniuZone = keyof typeof zone;
export type BucketType = 'qiniu' | 'oss' | 'cos' | 'minio';

export type BucketConfig<T extends BucketType = 'qiniu'> = {
  //是否启用
  enable: boolean;
  //分别支持 七牛云/阿里云/腾讯云/自定义的
  type: T;
  qiniu?: QiniuConfig;
  cos?: COSConfig;
  oss?: OSSConfig;
  minio?: MinioConfig;
};

//七牛云对象存储的配置
export type QiniuConfig = {
  access_key: string;
  secret_key: string;
  scope: string;
  //是否启用https
  enableHttps: boolean;
  zone: QiniuZone;
  mac: auth.digest.MacOptions;
};

//腾讯云COS的配置
export type COSConfig = {
  secret_id: string;
  secret_key: string;
  bucket: string;
  region: string;
  url: string;
};

//TODO:阿里云OSS的配置
export type OSSConfig = {};

//TODO:Minio的配置
export type MinioConfig = {};
