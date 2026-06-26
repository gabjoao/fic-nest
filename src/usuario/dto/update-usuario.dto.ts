/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TipoAcesso } from '../enums/tipo-acesso.enum';

export class UpdateUsuarioDto {
  @IsString()
  @IsOptional()
  nome?: string;
  @IsEmail()
  @IsOptional()
  email?: string;
  @IsEnum(TipoAcesso)
  @IsOptional()
  tipoAcesso?: TipoAcesso;
  @IsOptional()
  @IsNumber()
  cursoId!: number;
}
