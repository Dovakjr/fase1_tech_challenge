import { ForeignKey, Model } from 'sequelize-typescript';
import { Column, Table, DataType } from 'sequelize-typescript';
import { OrderModel } from './order.model';
import { ProductModel } from 'src/infrastructure/models/product.model';

export type ListAttributes = {
  order_id: number;
  quantity: number;
  product_id: number;
};
@Table
export class OrderProductModel extends Model<ListAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @ForeignKey(() => OrderModel)
  @Column
  order_id: number;

  @Column
  quantity: number;

  @ForeignKey(() => ProductModel)
  @Column
  product_id: number;
}
