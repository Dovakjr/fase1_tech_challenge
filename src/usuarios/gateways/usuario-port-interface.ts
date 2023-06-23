import { Usuario } from '../entities/usuario.entity';
export interface UserPortInterface {
  create(User: Usuario): Promise<Usuario>;
  findAll(): Promise<Usuario[]>;
  findById(id: number): Promise<Usuario>;
}
