//Swagger文档配置
export type SwaggerConfig = {
  //是否启用swagger文档，默认true
  enable: boolean;
  //文档标题,默认：nest-template
  title: string;
  //文档描述，默认：The API description
  description: string;
  //文档版本，默认：1.0.0
  version: string;
  //文档标签，默认：api
  tags: string | [string];
  //文档路径
  path: string;
};
