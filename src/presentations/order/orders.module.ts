import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrderModel } from '../../infrastructure/models/order.model';
import { UserModel } from 'src/infrastructure/models/user.model';
import { ProductModel } from 'src/infrastructure/models/product.model';
import { OrderProductModel } from '../../infrastructure/models/order-product.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsecaseProxyModule } from 'src/infrastructure/usecase-proxy/usecase-proxy.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      OrderModel,
      UserModel,
      ProductModel,
      OrderProductModel,
    ]),
    UsecaseProxyModule.register(),
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
