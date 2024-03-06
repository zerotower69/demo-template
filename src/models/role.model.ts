import {
  AutoIncrement,
  Column,
  Comment,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 't_role',
  timestamps: false,
})
export class RoleModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Comment('id')
  @Column(DataType.INTEGER)
  id: number;

  @Comment('角色标识')
  @Column(DataType.STRING(30))
  code: string;

  @Comment('角色名(中文)')
  @Column(DataType.STRING(30))
  name: string;
}
