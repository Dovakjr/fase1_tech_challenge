import { IOrderRepository } from '../../../domain/order/order.repository';
import { Order } from '../../../domain/order/order.entity';

export class FindOneOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(id: number): Promise<Order> {
    return await this.orderRepository.findByPk(id);
  }
}
