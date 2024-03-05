import { Injectable } from '@nestjs/common';
import { Res } from './response';

@Injectable()
export class AppService {
  getHello() {
    return Res.OK('Hello World!');
  }
}
