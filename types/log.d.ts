//https://www.npmjs.com/package/winston#logging-levels
export type WinstonLevel =
  | 'emerg'
  | 'alert'
  | 'crit'
  | 'error'
  | 'warning'
  | 'notice'
  | 'info'
  | 'debug';

//日志配置
export type LoggerConfig = {
  level: WinstonLevel;
  //输出日志的文件名，默认app.log
  filename: string;
  //日志存放目录，默认log(项目根目录下)
  dirname: string;
};
