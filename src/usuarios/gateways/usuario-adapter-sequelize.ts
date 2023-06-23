import { UsuarioModel } from '../entities/usuario.model';
import { UserPortInterface } from './usuario-port-interface';
import { Usuario } from '../entities/usuario.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserAdapterSequelize implements UserPortInterface {
  //Repository
  constructor(
    @InjectModel(UsuarioModel)
    private usuarioModel: typeof UsuarioModel,
  ) {}

  async create(user: Usuario): Promise<Usuario> {
    const newUser = await this.usuarioModel.create(user);
    user.id = newUser.id;
    return user;
  }

  async findAll(): Promise<Usuario[]> {
    const usersModels = await this.usuarioModel.findAll();
    return usersModels.map(
      (usuarioModel) => new Usuario(usuarioModel.name, usuarioModel.id),
    );
  }
  async findById(id: number): Promise<Usuario> {
    const usuarioModel = await this.usuarioModel.findByPk(id);
    if (!UsuarioModel) {
      throw new Error('Usuário não encontrado');
    }
    return new Usuario(UsuarioModel.name, usuarioModel.id);
  }
}
