import {
  AutoIncrement,
  BelongsTo,
  Column,
  Comment,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { RoleModel } from './role.model';
import { UserModel } from './user.model';

@Table({
  tableName: 't_user_role',
  timestamps: false,
})
export class UserRoleModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Comment('id')
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => RoleModel)
  role_id: number;

  @ForeignKey(() => UserModel)
  user_id: number;
}
