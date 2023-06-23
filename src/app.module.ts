import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsuarioModel } from './usuarios/entities/usuario.model';

@Module({
  imports: [
    UsuariosModule,
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      host: ':memory:',
      autoLoadModels: true,
      models: [UsuarioModel],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//Model - View - Controller
