//Ponto de Entrada da aplicação
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  //Gera uma nova instancia de aplicação Nest.JS
  const app = await NestFactory.create(AppModule);
  //Sobe a aplicação na porta 3000
  await app.listen(3000);
}
//Start Main()
bootstrap();
