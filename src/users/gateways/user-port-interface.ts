import { User } from '../entities/user.entity';
export interface UserPortInterface {
  create(User: User): Promise<User>;
  findAll(): Promise<User[]>;
  findByPk(cpf: string): Promise<User>;
}
