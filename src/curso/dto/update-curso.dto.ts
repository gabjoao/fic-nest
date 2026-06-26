/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Categoria } from 'src/categoria/entities/categoria.entity';

export class UpdateCursoDto {
  @IsString()
  @IsOptional()
  titulo?: string;
  @IsString()
  @IsOptional()
  descricao?: string;
  @IsNumber()
  @IsOptional()
  cargaHoraria?: number;
  @IsOptional()
  categoria!: Categoria;
  @IsOptional()
  usuarioId!: number;
}
