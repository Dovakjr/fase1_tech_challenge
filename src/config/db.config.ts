import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { OrderModel } from '../orders/entities/order.model';
import { ProductModel } from '../products/entities/product.model';
import { UserModel } from '../users/entities/user.model';
import { OrderProductModel } from '../orders/entities/order-product.model';

export const sequelizeConfig: SequelizeModuleOptions = {
  dialect: 'mysql',
  host: process.env.MYSQLDB_HOST,
  port: Number(process.env.MYSQLDB_DOCKER_PORT),
  username: process.env.MYSQLDB_USER,
  password: process.env.MYSQLDB_ROOT_PASSWORD,
  database: process.env.MYSQLDB_DATABASE,
  autoLoadModels: true,
  models: [UserModel, OrderModel, ProductModel, OrderProductModel],
};
