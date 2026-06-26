/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoriaDto {
  @IsOptional()
  @IsString()
  adminId!: string;
  @IsString()
  @IsNotEmpty()
  nome!: string;
  @IsString()
  @IsNotEmpty()
  descricao!: string;
}
