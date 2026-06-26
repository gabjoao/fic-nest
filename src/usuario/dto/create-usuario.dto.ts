/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TipoAcesso } from '../enums/tipo-acesso.enum';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;
  @IsEmail()
  @IsNotEmpty()
  email!: string;
  @IsEnum(TipoAcesso)
  tipoAcesso!: TipoAcesso;
}
