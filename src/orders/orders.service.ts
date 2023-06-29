import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { OrderPortInterface } from './gateways/order-port-interface';
import { UserPortInterface } from '../users/gateways/user-port-interface';
import { ProductPortInterface } from '../products/gateways/product-port-interface';
import { OrderProduct } from './entities/order-product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('OrderPortInterface')
    private orderPort: OrderPortInterface,
    @Inject('UserPortInterface')
    private readonly userPort: UserPortInterface,
    @Inject('ProductPortInterface')
    private readonly productPort: ProductPortInterface,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { user_id, products } = createOrderDto;

    //Validate User ID
    const user = await this.userPort.findByPk(user_id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    //Create new order
    const order = new Order('Recebido', user_id);

    //Create products List
    const orderItems = await Promise.all(
      products.map(async (product) => {
        const existingProduct = await this.productPort.findByPk(
          product.product_id,
        );

        if (!existingProduct) {
          throw new NotFoundException(
            `Produto não encontrado: ${product.product_id}`,
          );
        }

        return new OrderProduct(order.id, product.quantity, existingProduct.id);
      }),
    );

    await this.orderPort.create(order, orderItems);
    return order;
  }

  findAll() {
    return this.orderPort.findAll();
  }

  findAllWhitProducts() {
    return this.orderPort.findAllWithProducts();
  }

  async findByPk(id: number) {
    return await this.orderPort.findByPk(id);
  }
}
