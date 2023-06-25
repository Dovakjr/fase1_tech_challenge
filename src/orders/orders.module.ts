import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderModel } from './entities/order.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderAdapterSequelize } from './gateways/order-adapter-sequelize';
import { UserModel } from 'src/users/entities/user.model';
import { ProductModel } from 'src/products/entities/product.model';
import { UserAdapterSequelize } from 'src/users/gateways/user-adapter-sequelize';
import { ProductAdapterSequelize } from 'src/products/gateways/product-adapter-sequelize';

@Module({
  imports: [SequelizeModule.forFeature([OrderModel, UserModel, ProductModel])],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrderAdapterSequelize,
    {
      provide: 'OrderPortInterface',
      useExisting: OrderAdapterSequelize,
    },
    UserAdapterSequelize,
    {
      provide: 'UserPortInterface',
      useExisting: UserAdapterSequelize,
    },
    ProductAdapterSequelize,
    {
      provide: 'ProductPortInterface',
      useExisting: ProductAdapterSequelize,
    },
  ],
})
export class OrdersModule {}
