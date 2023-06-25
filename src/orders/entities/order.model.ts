import {
  BelongsTo,
  BelongsToMany,
  ForeignKey,
  Model,
} from 'sequelize-typescript';
import { Column, Table, DataType } from 'sequelize-typescript';
import { ProductModel } from 'src/products/entities/product.model';
import { UserModel } from 'src/users/entities/user.model';
import { OrderProductModel } from './order-product.model';

export type ListAttributes = {
  id: number;
  status: string;
  user_id: string;
};

@Table
export class OrderModel extends Model<ListAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  status: string;

  //Table relations
  @ForeignKey(() => UserModel)
  @Column
  user_id: string;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @BelongsToMany(() => ProductModel, () => OrderProductModel)
  products: ProductModel[];
}
