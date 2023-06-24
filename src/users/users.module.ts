import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { HttpModule } from '@nestjs/axios';
import { UserAdapterSequelize } from './gateways/user-adapter-sequelize';
import { UserModel } from './entities/user.model';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel]),
    HttpModule.register({
      baseURL: 'https://jsonplaceholder.typicode.com/',
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserAdapterSequelize,
    {
      provide: 'UserPortInterface',
      useExisting: UserAdapterSequelize,
    },
  ],
})
export class UsersModule {}
