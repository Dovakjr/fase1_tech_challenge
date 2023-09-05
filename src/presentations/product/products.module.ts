import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductModel } from '../../infrastructure/models/product.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsecaseProxyModule } from 'src/infrastructure/usecase-proxy/usecase-proxy.module';

@Module({
  imports: [
    SequelizeModule.forFeature([ProductModel]),
    UsecaseProxyModule.register(),
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
