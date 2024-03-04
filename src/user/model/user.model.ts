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
