import { Model } from 'sequelize-typescript';

declare namespace PageApi {
  type OrderItem<Keys = string> = [Keys, 'DESC' | 'ASC'];
  type NumberMode = 'gte' | 'lte' | 'gt' | 'lt' | 'eq';
  type StringMode = 'start' | 'end' | 'include' | 'not' | 'eq';
  type LogicMode = 'and' | 'or' | 'not';
  type BooleanFilterItem = {
    field: string;
    value: boolean;
    mode?: true;
  };
  export type NumberFilterItem = {
    field: string;
    value: number;
    mode?: NumberMode;
  };
  type StringFilterItem = {
    field: string;
    value: string;
    mode?: StringMode;
  };
  type FilterItem = BooleanFilterItem | NumberFilterItem | StringFilterItem;
  type OrderKeys<M extends Model = Model, T = 'createdAt' | 'updatedAt'> =
    | keyof Omit<M, keyof Model>
    | T;
  type ListParams<M extends Model = Model> = {
    //排序序号
    orders?: OrderItem<OrderKeys<M>>[];
    //要查找的字段
    fields?: string;
    //不需要的字段
    exFields?: string;
    //查询的开始时间
    startTime?: string;
    //查询的结束时间
    endTime?: string;
    //过滤条件字段
    filters?: FilterItem[];
  };

  type PageParams<M extends Model = Model> = {
    page: number;
    pageSize: number;
  } & ListParams<M>;
}
