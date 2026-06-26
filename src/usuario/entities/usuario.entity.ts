import { Curso } from 'src/curso/entities/curso.entity';
import { TipoAcesso } from '../enums/tipo-acesso.enum';

export class Usuario {
  id!: number;
  nome!: string;
  email!: string;
  tipoAcesso?: TipoAcesso;
  cursos?: Curso[];
}
