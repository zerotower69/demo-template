import { LoggerService } from '@nestjs/common';
import * as dayjs from 'dayjs';

import { createLogger, Logger } from 'winston';
import type { LoggerOptions } from 'winston';

//自定义MyLogger类实现LoggerService接口里操作日志的方法
export class MyLogger implements LoggerService {
  private logger: Logger;
  constructor(options: LoggerOptions) {
    //在自定义的MyLogger实例化时，创建winston的logger
    this.logger = createLogger(options);
  }
  error(message: string, context: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    this.logger.log('info', message, { context, time });
  }

  log(message: string, context: string): any {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    this.logger.log('info', message, { context, time });
  }

  warn(message: string, context: string): any {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    this.logger.log('info', message, { context, time });
  }
}
