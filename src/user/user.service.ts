import { HttpException, Inject, Injectable } from '@nestjs/common';
import { MyLogger } from '../winston/MyLogger';
import { WINSTON_LOGGER_TOKEN } from '../winston/winston.module';
import { UserModel } from '../models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { RegisterDto } from './dto/register.dto';
import { getPageOffset, md5 } from '../utils';
import { Res } from '../response';
import { LoginDto } from './dto/login.dto';
import { REDIS_TOKEN } from '../redis/redis.module';
import Redis from 'ioredis';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
  ) {}

  @Inject(WINSTON_LOGGER_TOKEN)
  private logger: MyLogger;

  @Inject(REDIS_TOKEN)
  private redisClient: Redis;

  //注册
  async register(user: RegisterDto) {
    const foundUser = await this.userModel.findOne({
      where: {
        username: user.username,
      },
    });

    if (foundUser) {
      throw new HttpException('用户已存在', 200);
    }

    try {
      //create方法合并了build方法和save方法
      await this.userModel.create({
        username: user.username,
        password: md5(user.password),
      });
      return Res.OK('注册成功');
    } catch (e) {
      return Res.Error('注册失败');
    }
  }

  //登录
  async login(user: LoginDto) {
    const foundUser = await this.userModel.findOne({
      where: {
        username: user.username,
      },
    });

    if (!foundUser) {
      throw new HttpException('用户名不存在', 400);
    }
    if (foundUser.password !== md5(user.password)) {
      throw new HttpException('密码错误', 400);
    }
    return foundUser;
  }

  //用户列表
  async getList() {
    const list = await this.userModel.findAll({
      attributes: {
        exclude: ['password'],
      },
    });
    return Res.List(list);
  }

  //分页获取用户列表
  async getListByPage(page = 1, limit = 10) {
    const { rows, count } = await this.userModel.findAndCountAll({
      attributes: {
        exclude: ['password'],
      },
      offset: getPageOffset(page, limit),
      limit: limit,
    });
    return Res.Page(rows, page, count);
  }
}
