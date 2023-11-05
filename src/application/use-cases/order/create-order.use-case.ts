import { IOrderRepository } from '../../../domain/order/order.repository'; // Importe a interface do repositório
import { IUserRepository } from '../../../domain/user/user.repository';
import { IProductRepository } from '../../../domain/product/product.repository';
import { Order } from '../../../domain/order/order.entity';
import { OrderProduct } from '../../../domain/order/order-product.entity';
import { CreateOrderDto } from '../../../presentations/order/dto/create-order.dto';

export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly userRepository: IUserRepository,
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(data: CreateOrderDto): Promise<Order> {
    //Validate User ID
    const user = await this.userRepository.findByPk(data.user_id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    //Create new order
    const order = new Order('Recebido', data.user_id);

    //Create products List
    const orderItems = await Promise.all(
      data.products.map(async (product) => {
        const existingProduct = await this.productRepository.findByPk(
          product.product_id,
        );

        if (!existingProduct) {
          throw new Error(`Produto não encontrado: ${product.product_id}`);
        }

        return new OrderProduct(order.id, product.quantity, existingProduct.id);
      }),
    );

    await this.orderRepository.create(order, orderItems);
    return order;
  }
}
