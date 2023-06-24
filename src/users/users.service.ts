import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPortInterface } from './gateways/user-port-interface';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserPortInterface')
    private UserPort: UserPortInterface,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User(
      createUserDto.cpf,
      createUserDto.name,
      createUserDto.email,
    );
    await this.UserPort.create(user);
    return user;
  }

  findAll() {
    const userList = this.UserPort.findAll();
    return userList;
  }

  async findOne(cpf: string) {
    const user = await this.UserPort.findByPk(cpf);
    if (!user) {
      throw new Error('Usuario não encontrado');
    }
    return user;
  }

  update(cpf: string, updateUserDto: UpdateUserDto) {
    return this.update(cpf, updateUserDto);
  }

  remove(cpf: string) {
    return `This action removes a #${cpf} user`;
  }
}
