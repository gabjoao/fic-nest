/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Categoria } from 'src/categoria/entities/categoria.entity';

export class CreateCursoDto {
  @IsString()
  @IsNotEmpty()
  titulo!: string;
  @IsString()
  @IsNotEmpty()
  descricao!: string;
  @IsNumber()
  @IsNotEmpty()
  cargaHoraria!: number;
  @IsNotEmpty()
  categoria!: Categoria;
}
