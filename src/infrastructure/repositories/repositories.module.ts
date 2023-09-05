import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../models/user.model';
import { UserRepositorySequelize } from './user.repository.impl.sequelize';
import { ProductRepositorySequelize } from './product.repository.impl.sequelize';
import { OrderRepositorySequelize } from './order.repository.impl.sequelize';
import { OrderModel } from '../models/order.model';
import { ProductModel } from '../models/product.model';
import { OrderProductModel } from '../models/order-product.model';
import { MercadoPagoWebhook } from '../webhooks/mercado-pago-webhook';

@Module({
  imports: [
    SequelizeModule.forFeature([
      UserModel,
      OrderModel,
      ProductModel,
      OrderProductModel,
    ]),
  ],
  providers: [
    UserRepositorySequelize,
    ProductRepositorySequelize,
    OrderRepositorySequelize,
    MercadoPagoWebhook,
  ],
  exports: [
    UserRepositorySequelize,
    ProductRepositorySequelize,
    OrderRepositorySequelize,
    MercadoPagoWebhook,
  ],
})
export class RepositoriesModule {}
