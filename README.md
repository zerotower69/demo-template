# nestjs项目快速搭建模版
> 本模板为了快速启动nestjs项目，目前做到了链接mysql和redis数据库以及简单的登录验证。
## 脚本解释
该项目最好使用`pnpm`进行管理，如果你没有安装`pnpm`,请使用`npm i -g pnpm`
```bash
pnpm build #打包
pnpm format #使用prettier格式化
pnpm start #开发模式下运行，不会热更新
pnpm start:dev #开发模式下运行，热更新
pnpm start:debug #开发模式下调试
pnpm start:prod #生产模式运行
pnpm lint #eslint检查
pnpm test #单元测试
```
## 配置文件
本项目使用`yaml`作为应用配置文件，你可以根目录下找到诸如`application.${RUNNING_ENV}.yaml`格式的文件来做进一步
的修改，本项目只考虑了开发模式`dev`和生产模式`prod`。如果你需要增加一个新的环境模式，请务必按照
`application.${你的模式名称}.yaml`的格式在根目录下创建一份新的`yaml`文件；然后在`package.json`中的`scripts`部分增加一行新的
命令：`cross-env RUNNING_ENV=${你的模式名称} xxx`，用于启动该模式下的项目。
```bash
pnpm add -D cross-env
pnpm add -S @nestjs/config yaml
```

## mysql
项目使用了[sequelize](https://www.sequelize.cn/)来连接mysql，你可以在`yaml`配置文件更改你的连接信息。
其相关的依赖包：
```bash
pnpm add -S @nestjs/sequelize sequelize mysql2
pnpm add -D sequelize-typescript
```
### 建模
一个`Sequelize`模型如下所示：
```typescript
import {
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Model,
  Table,
  Comment,
} from 'sequelize-typescript';

@Table({
  //表名
  tableName: 't_user',
  //将自动生成createdAt和updatedAt这两个字段
  timestamps: true,
})
export class UserModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Comment('id')
  @Column(DataType.INTEGER)
  id: number;

  @Comment('用户名')
  @Column(DataType.STRING(50))
  username: string;

  @Comment('密码')
  @Column(DataType.STRING(100))
  password: string;
}
```
自定义模型类通过继承`sequelize-typescri[t`导出的`Model`类实现，并添加类装饰器`@Table()`,
其两个属性分别指定真实映射的表名和是否自动生成时间字段（创建时间和更新时间）。
对于每个映射到数据库的字段，必须使用`@Column`装饰器装饰，且有多个装饰器时必须在最下方。
例如，下述的写法将引起报错：
```typescript
@Column(DataType.STRING(100))
@Comment('密码')
password: string;
```
定义好的模型首先应该在`app.module.ts`文件中添加
```typescript
@Module({
  imports:[
    SequelizeModule.forRoot({
      ...
      models:[UserModel],
      ...
    })
  ]
})
export class AppModule{}
```
然后在使用到的模块中使用`SequelizeModule.forFeature([UserModel])`添加，
例如在`UserModule`中
```typescript
@Module({
  imports:[SequelizeModule.forFeature([UserModel])]
})
export class UserModule{}
```

### 使用模型
使用模型进行数据库的增删改查时，无论是在`Controller`还是`Service`中，你都需要通过
装饰器`@InjectModel`实现自动注入。
```typescript
@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
  ) {
  }
}
```
然后你就可以参考[sequelize文档](https://www.sequelize.cn/)愉快地使用了。

## redis
项目使用了[ioredis](https://github.com/redis/ioredis#readme)链接数据库。
```bash
pnpm add -S ioredis
```
相关用法如下：
```typescript
import { REDIS_TOKEN } from '../redis/redis.module';
import Redis from 'ioredis';
...

@Inject(REDIS_TOKEN)
private redisClient: Redis;
```

## token身份验证
本项目使用`jwt`生成`Bearer token`的方式进行登录验证，有关配置参考`yaml`配置文件中的jwt部分。
如果接口需要登录验证，你只需要使用装饰器`@Auth()`或`@RequireLogin`即可。
这两个装饰器等同，只不过作者嫌弃`RequireLogin`名字太长，又加了一个`Auth`。

相关源代码请[点击这里](/src/auth)。
```typescript
@Auth()
@Get('all')
getAll() {
  return this.userService.getList();
}
```
或者
```typescript
@RequireLogin()
@Get('all')
getAll() {
  return this.userService.getList();
}
```
## 统一的响应格式返回
为了进一步规范，定义了统一的响应结构。
```json
{
  "code": 200,
  "message": "ok",
  "data": null,
  "error": null
}
```
`code`代表返回的业务状态码，`message`代表返回的响应信息，`data`存储返回的数据，`error`字段不一定存在，其代表错误信息，例如`Bad Request`等。

## 集成winston打印日志并输出日志文件
本项目使用了[winston](https://www.npmjs.com/package/winston)来控制日志的输出，并把部分配置放入到
`application.xxx.yaml`文件中。

使用时通过装饰器`@Inject`注入到`Service`或`Controller`中，
```typescript
@Inject(WINSTON_LOGGER_TOKEN)
private logger: MyLogger;
```
接着，就可以愉快地使用了！

## 其它
如有问题，欢迎[issues](https://github.com/zerotower69/demo-template/issues)提问，如果觉得不错，请给个star。

