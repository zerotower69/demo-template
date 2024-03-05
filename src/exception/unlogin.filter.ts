import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

export class UnLoginException {
  message: string;

  constructor(message?: string) {
    this.message = message;
  }
}

@Catch(UnLoginException)
export class UnloginFilter implements ExceptionFilter {
  catch(exception: UnLoginException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    response
      .status(HttpStatus.UNAUTHORIZED)
      .json({
        code: HttpStatus.UNAUTHORIZED,
        message: exception.message || '用户未登录',
        error: 'unlogin',
        data: null,
      })
      .end();
  }
}
