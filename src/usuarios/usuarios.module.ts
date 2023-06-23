import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { UsuarioModel } from './entities/usuario.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { HttpModule } from '@nestjs/axios';
import { UserAdapterSequelize } from './gateways/usuario-adapter-sequelize';

@Module({
  imports: [
    SequelizeModule.forFeature([UsuarioModel]),
    HttpModule.register({
      baseURL: 'https://jsonplaceholder.typicode.com/',
    }),
  ],
  controllers: [UsuariosController],
  providers: [
    UsuariosService,
    UserAdapterSequelize,
    {
      provide: 'UserPortInterface',
      useExisting: UserAdapterSequelize,
    },
  ],
})
export class UsuariosModule {}
