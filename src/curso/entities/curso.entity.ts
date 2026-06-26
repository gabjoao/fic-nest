import { Categoria } from 'src/categoria/entities/categoria.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

export class Curso {
  id!: number;
  titulo!: string;
  descricao!: string;
  cargaHoraria!: number;
  usuarios?: Usuario[];
  categoria!: Categoria;
}
