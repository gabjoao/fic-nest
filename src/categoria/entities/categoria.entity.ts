import { Curso } from 'src/curso/entities/curso.entity';

export class Categoria {
  id!: number;
  nome!: string;
  descricao!: string;
  cursos?: Curso[];
}
