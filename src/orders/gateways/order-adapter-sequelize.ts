import { OrderPortInterface } from './order-port-interface';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { OrderModel } from '../entities/order.model';
import { Order } from '../entities/order.entity';
import { OrderProductModel } from '../entities/order-product.model';
import { ProductModel } from 'src/products/entities/product.model';

@Injectable()
export class OrderAdapterSequelize implements OrderPortInterface {
  //Repository
  constructor(
    @InjectModel(OrderModel)
    private orderModel: typeof OrderModel,
    @InjectModel(OrderProductModel)
    private orderProductModel: typeof OrderProductModel,
    @InjectModel(ProductModel)
    private productModel: typeof ProductModel,
  ) {}

  async create(order: Order): Promise<Order> {
    const newOrder = await this.orderModel.create(order);
    order.status = newOrder.status;
    order.user_id = newOrder.user_id;
    return order;
  }

  async findAll(): Promise<any> {
    const ordersModels = await this.orderModel.findAll();

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
