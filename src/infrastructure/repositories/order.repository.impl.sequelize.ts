import { IOrderRepository } from '../../domain/order/order.repository';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { OrderModel } from '../models/order.model';
import { Order } from '../../domain/order/order.entity';
import { OrderProductModel } from '../models/order-product.model';
import { ProductModel } from 'src/infrastructure/models/product.model';
import { UpdateOrderDto } from 'src/presentations/order/dto/update-order.dto';

@Injectable()
export class OrderRepositorySequelize implements IOrderRepository {
  constructor(
    @InjectModel(OrderModel)
    private orderModel: typeof OrderModel,
    @InjectModel(OrderProductModel)
    private orderProductModel: typeof OrderProductModel,
    @InjectModel(ProductModel)
    private productModel: typeof ProductModel,
  ) {}

  async create(
    order: Order,
    orderProducts: OrderProductModel[],
  ): Promise<Order> {
    const newOrder = await this.orderModel.create(order);
    order.status = newOrder.status;
    order.user_id = newOrder.user_id;
    order.id = newOrder.id;

    //Cadastra itens na tabela pivô
    orderProducts.map(async (orderProduct) => {
      orderProduct.order_id = order.id;
      console.log(orderProduct);
      await this.orderProductModel.create(orderProduct);
    });

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderModel.findByPk(id);

    if (!order) {
      throw new Error('Produto não encontrado');
    }

    await order.update(updateOrderDto);

    return order;
  }

  async findAll(): Promise<any> {
    const ordersModels = await this.orderModel.findAll({
      where: {
        status: ['Pronto', 'Em Preparação', 'Recebido'],
      },
      order: ['status', 'DESC'],
    });

    ordersModels.map(async (orderModel) => {
      const order = new Order(orderModel.status, orderModel.user_id);
      return order;
    });

    return ordersModels;
  }

  async findByPk(id: number) {
    const order = await this.orderModel.findByPk(id);

    const orderProducts = await this.orderProductModel.findAll({
      where: {
        order_id: id,
      },
    });

    const products_ids = await Promise.all(
      orderProducts.map((orderProduct) => {
        return orderProduct.product_id;
      }),
    );

    console.log(orderProducts);
    const products = await this.productModel.findAll({
      where: {
        id: products_ids,
      },
    });

    order.products = products;

    return new Order(order.status, order.user_id);
  }

  async findAllWithProducts() {
    const orders = await this.orderModel.findAll({
      include: [
        {
          model: this.productModel,
        },
      ],
    });

    return orders;
  }
}
