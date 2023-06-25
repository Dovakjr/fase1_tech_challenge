import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductModel } from './entities/product.model';
import { ProductAdapterSequelize } from './gateways/product-adapter-sequelize';

@Module({
  imports: [SequelizeModule.forFeature([ProductModel])],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductAdapterSequelize,
    {
      provide: 'ProductPortInterface',
      useExisting: ProductAdapterSequelize,
    },
  ],
})
export class ProductsModule {}
