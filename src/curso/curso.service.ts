import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsuarioService } from 'src/usuario/usuario.service';
import { CancelarMatriculaDto } from 'src/usuario/dto/cancelar-matricula.dto';

@Injectable()
export class CursoService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => UsuarioService))
    private readonly usuarioService: UsuarioService,
  ) {}

  async create(dto: CreateCursoDto) {
    const cursoExist = await this.prisma.curso.findUnique({
      where: { titulo: dto.titulo },
    });

    if (cursoExist) {
      throw new ConflictException(
        `Já existe curso com o nome: ${dto.descricao}!`,
      );
    }

    //Se não existir cria um novo usuário no banco
    const curso = await this.prisma.curso.create({
      data: {
        titulo: dto.titulo,
        descricao: dto.descricao,
        cargaHoraria: dto.cargaHoraria,
        categoria: {
          connect: { id: dto.categoria.id },
        },
      },
    });
    //Retorna para a requisição
    return curso;
  }

  async findAll() {
    return await this.prisma.curso.findMany({
      select: {
        id: true,
        titulo: true,
        descricao: true,
        cargaHoraria: true,
        categoria: true,
        criadoEm: true,
        atualizadoEm: true,
        usuarios: true,
      },
    });
  }

  async findOne(id: number) {
    const curso = await this.prisma.curso.findUnique({
      where: { id },
      select: {
        id: true,
        titulo: true,
        descricao: true,
        cargaHoraria: true,
        categoria: true,
        criadoEm: true,
        atualizadoEm: true,
        usuarios: true,
      },
    });
    if (!curso) throw new NotFoundException('Curso não encontrado');

    return curso;
  }

  async update(id: number, dto: UpdateCursoDto) {
    const curso = await this.findOne(id);

    if (!curso) throw new NotFoundException('Curso não encontrado');

    await this.prisma.curso.update({
      where: { id },
      data: {
        titulo: dto.titulo,
        descricao: dto.descricao,
        cargaHoraria: dto.cargaHoraria,
        categoria: {
          connect: { id: dto.categoria.id },
        },
      },
    });

    return { message: 'Curso alterado com sucesso' };
  }

  async remove(id: number) {
    const curso = await this.findOne(id);
    if (!curso) throw new NotFoundException('Curso não encontrado');

    await this.prisma.curso.delete({
      where: { id },
    });

    return { message: 'Curso excluído com sucesso' };
  }

  async addUsuario(id: number, dto: UpdateCursoDto) {
    const usuarioExist = await this.usuarioService.findOne(dto.usuarioId);
    const curso = await this.findOne(id);

    if (usuarioExist.cursos.find((c) => c.id === id)) {
      throw new ConflictException(
        `Usuário já matrículado no curso ${curso.titulo}`,
      );
    }

    await this.prisma.curso.update({
      where: { id },
      data: {
        usuarios: {
          connect: {
            id: usuarioExist.id,
          },
        },
      },
    });

    return {
      menssagem: `Usuário ${usuarioExist.nome} matriculado no curso ${curso.titulo} com sucesso.`,
    };
  }

  async removerUsuario(id: number, dto: CancelarMatriculaDto) {
    const usuarioExist = await this.usuarioService.findOne(dto.cancelarId);

    await this.prisma.curso.update({
      where: { id },
      data: {
        usuarios: {
          disconnect: {
            id: usuarioExist.id,
          },
        },
      },
    });

    const curso = await this.findOne(id);

    return {
      menssagem: `Cancelada a matricula do usuario ${usuarioExist.nome} do curso ${curso.titulo} com sucesso.`,
    };
  }

  async listarAlunos(id: number) {
    const curso = await this.findOne(id);
    return curso.usuarios;
  }
}
