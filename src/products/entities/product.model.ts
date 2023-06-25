import { BelongsToMany, Model } from 'sequelize-typescript';
import { Column, Table, DataType } from 'sequelize-typescript';
import { OrderProductModel } from 'src/orders/entities/order-product.model';
import { OrderModel } from 'src/orders/entities/order.model';

export type ListAttributes = {
  id: number;
  name: string;
  type: string; //Categoria {Lanhce, Acompanhamento, Bebida, Sobremesa}
  price: number;
  description: string;
  image: string; //Blob storage
};

@Table
export class ProductModel extends Model<ListAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column
  name: string;
  @Column
  type: string;
  @Column
  price: number;
  @Column
  description: string;
  @Column
  image: string;
  @BelongsToMany(() => OrderModel, () => OrderProductModel)
  orders: OrderModel;
}
