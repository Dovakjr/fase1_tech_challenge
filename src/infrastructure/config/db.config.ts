import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { OrderModel } from '../../infrastructure/models/order.model';
import { ProductModel } from '../../infrastructure/models/product.model';
import { UserModel } from '../../infrastructure/models/user.model';
import { OrderProductModel } from '../../infrastructure/models/order-product.model';

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
