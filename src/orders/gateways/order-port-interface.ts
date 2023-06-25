import { Order } from '../entities/order.entity';
import { OrderProduct } from '../entities/order-product.entity';
export interface OrderPortInterface {
  create(order: Order, orderProduct: OrderProduct[]): Promise<Order>;
  findAll(): Promise<Order[]>;
}
