/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCategoriaDto {
  @IsString()
  @IsOptional()
  nome?: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  descricao?: string;
  @IsOptional()
  cursoId?: number;
}
