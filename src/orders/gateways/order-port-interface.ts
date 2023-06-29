import { OrderProduct } from '../entities/order-product.entity';
import { Order } from '../entities/order.entity';
export interface OrderPortInterface {
  create(order: Order, orderProduct: OrderProduct[]): Promise<any>;
  findAll(): Promise<Order[]>;
  findByPk(id: number): Promise<Order>;
  findAllWithProducts(): Promise<any[]>;
}
