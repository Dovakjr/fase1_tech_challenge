import { User } from '../../domain/user/user.entity';
import { IUserRepository } from '../../domain/user/user.repository';

export class UserAdapterInMemory implements IUserRepository {
  items: User[] = [];

  async create(user: User): Promise<User> {
    user.cpf = this.items.length.toString();
    this.items.push(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.items;
  }

  async findByPk(cpf: string): Promise<User> {
    const user = this.items.find((item) => item.cpf === cpf);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return Promise.resolve(user);
  }
}
