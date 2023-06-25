import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;
}
