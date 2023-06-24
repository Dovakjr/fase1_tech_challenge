import { UserModel } from '../entities/user.model';
import { UserPortInterface } from './user-port-interface';
import { User } from '../entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserAdapterSequelize implements UserPortInterface {
  //Repository
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
  ) {}

  async create(user: User): Promise<User> {
    const newUser = await this.userModel.create(user);
    user.cpf = newUser.cpf;
    user.email = newUser.email;
    user.name = newUser.name;
    return user;
  }

  async findAll(): Promise<User[]> {
    const usersModels = await this.userModel.findAll();
    return usersModels.map(
      (usuarioModel) =>
        new User(usuarioModel.cpf, usuarioModel.name, usuarioModel.email),
    );
  }
  async findByPk(cpf: string): Promise<User> {
    const userModel = await this.userModel.findByPk(cpf);
    if (!userModel) {
      throw new Error('Usuário não encontrado');
    }
    return new User(userModel.cpf, userModel.name, userModel.email);
  }
}
