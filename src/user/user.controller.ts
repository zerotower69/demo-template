import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Res as ResBody } from '../response';
import { LoginGuard } from '../auth/login.guard';
import { Auth } from '../auth/auth.decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(JwtService)
    private jwtService: JwtService,
  ) {}

  @Post('login')
  async login(
    @Body() user: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const foundUser = await this.userService.login(user);
    if (foundUser) {
      const token = await this.jwtService.signAsync({
        user: {
          id: foundUser.id,
          username: foundUser.username,
        },
      });
      response.setHeader('token', token);
      return ResBody.OK('登录成功');
    } else {
      return ResBody.Error('登录失败');
    }
  }

  @Post('register')
  register(@Body() user: RegisterDto) {
    return this.userService.register(user);
  }

  @Auth()
  @Get('all')
  getAll() {
    return this.userService.getList();
  }
}
