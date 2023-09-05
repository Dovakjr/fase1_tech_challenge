import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../user/dto/create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  cpf: string;
  name: string;
  emai: string;
}
