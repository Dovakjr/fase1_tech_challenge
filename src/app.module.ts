import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './presentations/product/products.module';
import { OrdersModule } from './presentations/order/orders.module';
import { UsersModule } from './presentations/user/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from './infrastructure/config/db.config';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeConfig),
    UsersModule,
    ProductsModule,
    OrdersModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
