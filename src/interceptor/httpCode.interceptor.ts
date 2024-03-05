import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Response } from 'express';

@Injectable()
export class HttpCodeInterceptor<T extends Response>
  implements NestInterceptor<T, T>
{
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<T> {
    return next.handle().pipe(
      map((data) => ({
        ...data,
        statusCode: data.statusCode === 201 ? 200 : data.statusCode,
      })),
    );
  }
}
