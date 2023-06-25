import { OrderPortInterface } from './order-port-interface';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { OrderModel } from '../entities/order.model';
import { Order } from '../entities/order.entity';
import { OrderProductModel } from '../entities/order-product.model';
import { Product } from 'src/products/entities/product.entity';
import { ProductModel } from 'src/products/entities/product.model';

@Injectable()
export class OrderAdapterSequelize implements OrderPortInterface {
  //Repository
  constructor(
    @InjectModel(OrderModel)
    private orderModel: typeof OrderModel,
  ) {}

  async create(order: OrderModel): Promise<Order> {
    const newOrder = await this.orderModel.create(order);
    order.status = newOrder.status;
    order.user = newOrder.user;
    return order;
  }

  async findAll(): Promise<any> {
    const ordersModels = await this.orderModel.findAll();

    const ordersList = ordersModels.map((orderModel) => {
      return new Order(orderModel.status, orderModel.user_id);
    });

    return ordersList;
  }
}
