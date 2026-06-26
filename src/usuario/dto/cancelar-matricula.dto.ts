import { IsNumber } from 'class-validator';

export class CancelarMatriculaDto {
  @IsNumber()
  cancelarId!: number;
}
