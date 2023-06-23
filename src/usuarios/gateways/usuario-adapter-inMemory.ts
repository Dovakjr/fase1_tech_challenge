import { Usuario } from '../entities/usuario.entity';
import { UserPortInterface } from './usuario-port-interface';

export class UserAdapterInMemory implements UserPortInterface {
  items: Usuario[] = [];

  async create(user: Usuario): Promise<Usuario> {
    user.id = this.items.length + 1;
    this.items.push(user);
    return user;
  }

  async findAll(): Promise<Usuario[]> {
    return this.items;
  }

  async findById(id: number): Promise<Usuario> {
    const user = this.items.find((item) => item.id === id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return Promise.resolve(user);
  }
}
