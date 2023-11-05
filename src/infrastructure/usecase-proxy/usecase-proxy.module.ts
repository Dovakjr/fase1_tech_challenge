import { DynamicModule, Module } from '@nestjs/common';
import { UserRepositorySequelize } from 'src/infrastructure/repositories/user.repository.impl.sequelize';
import { UseCaseProxy } from './usecase-proxy';
import { CreateUserUseCase } from 'src/application/use-cases/user/create-user.use-case';
import { FindAllUsersUseCase } from 'src/application/use-cases/user/find-all-users.use-case';
import { FindOneUserUseCase } from 'src/application/use-cases/user/find-one-user.use-case';
import { RepositoriesModule } from '../repositories/repositories.module';
import { ProductRepositorySequelize } from '../repositories/product.repository.impl.sequelize';
import { CreateProductUseCase } from 'src/application/use-cases/product/create-product.use-case';
import { FindAllProductsUseCase } from 'src/application/use-cases/product/find-all-products.use-case';
import { FindOneProductUseCase } from 'src/application/use-cases/product/find-one-products.use-case';
import { FindProductByTypeUseCase } from 'src/application/use-cases/product/find-product-by-type.use-case';
import { UpdateProductUseCase } from 'src/application/use-cases/product/update-product.use-case';
import { DeleteProductUseCase } from 'src/application/use-cases/product/delete-product.use-case';
import { OrderRepositorySequelize } from '../repositories/order.repository.impl.sequelize';
import { CreateOrderUseCase } from 'src/application/use-cases/order/create-order.use-case';
import { FindOneOrderUseCase } from 'src/application/use-cases/order/find-one-order.use-case';
import { FindAllOrdersUseCase } from 'src/application/use-cases/order/find-all-orders.use-case';
import { FindAllOrdersWithProductsUseCase } from 'src/application/use-cases/order/find-all-orders-with-products.use-case copy';
import { MercadoPagoWebhook } from '../webhooks/mercado-pago-webhook';
import { GetOrderPaymentStatus } from 'src/application/use-cases/order/get-order-payment-status.use-case';
import { UpdateOrderUseCase } from 'src/application/use-cases/order/update-order.use-case';

@Module({
  imports: [RepositoriesModule],
})
export class UsecaseProxyModule {
  //USER
  static FIND_ALL_USERS_USE_CASE = 'getAllUsersUsecaseProxy';
  static CREATE_USER_USE_CASE = 'createUserUsecaseProxy';
  static FIND_USER_USE_CASE = 'findUserUsecaseProxy';
  //PRODUCT
  static CREATE_PRODUCT_USE_CASE = 'createProductUseCaseProxy';
  static FIND_ALL_PRODUCTS_USE_CASE = 'findAllProductsUseCaseProxy';
  static FIND_ONE_PRODUCT_USE_CASE = 'findOneProductUseCaseProxy';
  static FIND_PRODUCT_BY_TYPE_USE_CASE = 'findProductByTypeUseCaseProxy';
  static UPDATE_PRODUCT_USE_CASE = 'updateProductUseCaseProxy';
  static DELETE_PRODUCT_USE_CASE = 'deleteProductUseCaseProxy';
  //ORDER
  static CREATE_ORDER_USE_CASE = 'createOrderUseCaseProxy';
  static FIND_ONE_ORDER_USE_CASE = 'findOneOrderUseCaseProxy';
  static FIND_ALL_ORDER_USE_CASE = 'findAllOrdersUseCaseProxy';
  static FIND_ALL_ORDER_WITH_PRODUCTS_USE_CASE =
    'findAllOrdersWithProductsUseCaseProxy';
  static UPDATE_ORDER_USE_CASE = 'updateOrderUseCaseProxy';
  static GET_ORDER_PAYMENT_STATUS_USE_CASE = 'getPaymentStatus';

  static register(): DynamicModule {
    return {
      module: UsecaseProxyModule,
      providers: [
        {
          inject: [UserRepositorySequelize],
          provide: UsecaseProxyModule.CREATE_USER_USE_CASE,
          useFactory: (userRepository: UserRepositorySequelize) =>
            new UseCaseProxy(new CreateUserUseCase(userRepository)),
        },
        {
          inject: [UserRepositorySequelize],
          provide: UsecaseProxyModule.FIND_ALL_USERS_USE_CASE,
          useFactory: (userRepository: UserRepositorySequelize) =>
            new UseCaseProxy(new FindAllUsersUseCase(userRepository)),
        },
        {
          inject: [UserRepositorySequelize],
          provide: UsecaseProxyModule.FIND_USER_USE_CASE,
          useFactory: (userRepository: UserRepositorySequelize) =>
            new UseCaseProxy(new FindOneUserUseCase(userRepository)),
        },
        {
          inject: [ProductRepositorySequelize],
          provide: UsecaseProxyModule.CREATE_PRODUCT_USE_CASE,
          useFactory: (productRepository: ProductRepositorySequelize) =>
            new UseCaseProxy(new CreateProductUseCase(productRepository)),
        },
        {
          inject: [ProductRepositorySequelize],
          provide: UsecaseProxyModule.FIND_ALL_PRODUCTS_USE_CASE,
          useFactory: (productRepository: ProductRepositorySequelize) =>
            new UseCaseProxy(new FindAllProductsUseCase(productRepository)),
        },
        {
          inject: [ProductRepositorySequelize],
          provide: UsecaseProxyModule.FIND_ONE_PRODUCT_USE_CASE,
          useFactory: (productRepository: ProductRepositorySequelize) =>
            new UseCaseProxy(new FindOneProductUseCase(productRepository)),
        },
        {
          inject: [ProductRepositorySequelize],
          provide: UsecaseProxyModule.FIND_PRODUCT_BY_TYPE_USE_CASE,
          useFactory: (productRepository: ProductRepositorySequelize) =>
            new UseCaseProxy(new FindProductByTypeUseCase(productRepository)),
        },
        {
          inject: [ProductRepositorySequelize],
          provide: UsecaseProxyModule.UPDATE_PRODUCT_USE_CASE,
          useFactory: (productRepository: ProductRepositorySequelize) =>
            new UseCaseProxy(new UpdateProductUseCase(productRepository)),
        },
        {
          inject: [ProductRepositorySequelize],
          provide: UsecaseProxyModule.DELETE_PRODUCT_USE_CASE,
          useFactory: (productRepository: ProductRepositorySequelize) =>
            new UseCaseProxy(new DeleteProductUseCase(productRepository)),
        },
        {
          inject: [
            OrderRepositorySequelize,
            UserRepositorySequelize,
            ProductRepositorySequelize,
          ],
          provide: UsecaseProxyModule.CREATE_ORDER_USE_CASE,
          useFactory: (
            orderRepository: OrderRepositorySequelize,
            userRepository: UserRepositorySequelize,
            productRepository: ProductRepositorySequelize,
          ) =>
            new UseCaseProxy(
              new CreateOrderUseCase(
                orderRepository,
                userRepository,
                productRepository,
              ),
            ),
        },
        {
          inject: [OrderRepositorySequelize],
          provide: UsecaseProxyModule.FIND_ONE_ORDER_USE_CASE,
          useFactory: (ordertRepository: OrderRepositorySequelize) =>
            new UseCaseProxy(new FindOneOrderUseCase(ordertRepository)),
        },
        {
          inject: [OrderRepositorySequelize],
          provide: UsecaseProxyModule.FIND_ALL_ORDER_USE_CASE,
          useFactory: (ordertRepository: OrderRepositorySequelize) =>
            new UseCaseProxy(new FindAllOrdersUseCase(ordertRepository)),
        },
        {
          inject: [OrderRepositorySequelize],
          provide: UsecaseProxyModule.FIND_ALL_ORDER_WITH_PRODUCTS_USE_CASE,
          useFactory: (ordertRepository: OrderRepositorySequelize) =>
            new UseCaseProxy(
              new FindAllOrdersWithProductsUseCase(ordertRepository),
            ),
        },
        {
          inject: [OrderRepositorySequelize],
          provide: UsecaseProxyModule.GET_ORDER_PAYMENT_STATUS_USE_CASE,
          useFactory: (mercadoPagoWebhook: MercadoPagoWebhook) =>
            new UseCaseProxy(new GetOrderPaymentStatus(mercadoPagoWebhook)),
        },
        {
          inject: [OrderRepositorySequelize],
          provide: UsecaseProxyModule.UPDATE_ORDER_USE_CASE,
          useFactory: (orderRepository: OrderRepositorySequelize) =>
            new UseCaseProxy(new UpdateOrderUseCase(orderRepository)),
        },
      ],
      exports: [
        UsecaseProxyModule.FIND_ALL_USERS_USE_CASE,
        UsecaseProxyModule.CREATE_USER_USE_CASE,
        UsecaseProxyModule.FIND_USER_USE_CASE,
        UsecaseProxyModule.CREATE_PRODUCT_USE_CASE,
        UsecaseProxyModule.FIND_ALL_PRODUCTS_USE_CASE,
        UsecaseProxyModule.FIND_ONE_PRODUCT_USE_CASE,
        UsecaseProxyModule.FIND_PRODUCT_BY_TYPE_USE_CASE,
        UsecaseProxyModule.UPDATE_PRODUCT_USE_CASE,
        UsecaseProxyModule.DELETE_PRODUCT_USE_CASE,
        UsecaseProxyModule.CREATE_ORDER_USE_CASE,
        UsecaseProxyModule.FIND_ONE_ORDER_USE_CASE,
        UsecaseProxyModule.FIND_ALL_ORDER_USE_CASE,
        UsecaseProxyModule.FIND_ALL_ORDER_WITH_PRODUCTS_USE_CASE,
        UsecaseProxyModule.GET_ORDER_PAYMENT_STATUS_USE_CASE,
        UsecaseProxyModule.UPDATE_ORDER_USE_CASE,
      ],
    };
  }
}
