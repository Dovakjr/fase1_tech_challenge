import { IOrderRepository } from '../../../domain/order/order.repository';
import { Order } from '../../../domain/order/order.entity';
import { UpdateOrderDto } from 'src/presentations/order/dto/update-order.dto';
export class UpdateOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.orderRepository.update(id, updateOrderDto);
  }
}
