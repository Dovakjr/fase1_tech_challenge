import { Inject, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { UserPortInterface } from './gateways/usuario-port-interface';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @Inject('UserPortInterface')
    private UserPort: UserPortInterface, //Camada de portas
    private httpService: HttpService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuario = new Usuario(createUsuarioDto.name);
    await this.UserPort.create(usuario);
    await lastValueFrom(
      this.httpService.post('users', {
        name: usuario.name,
      }),
    );
    return usuario;
  }

  findAll() {
    return this.UserPort.findAll();
  }

  async findOne(id: number) {
    const user = await this.UserPort.findById(id);
    if (!user) {
      throw new Error('Usuario não encontrado');
    }

    return user;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return this.update(id, updateUsuarioDto);
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
