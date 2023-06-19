import { Injectable } from '@nestjs/common';
//Regras de Negócio -> container de serviços -> possível recuperar a mesma instancia entre classes
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
