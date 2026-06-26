import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CursoService } from 'src/curso/curso.service';
import { CancelarMatriculaDto } from './dto/cancelar-matricula.dto';

@Injectable()
export class UsuarioService {
  //Instancia o prisma
  constructor(
    private readonly prisma: PrismaService,
    private readonly cursoService: CursoService,
  ) {}

  //Método para criar usuário
  async create(dto: CreateUsuarioDto) {
    //Verifica se já existe usuário com o e-mail passado pelo DTO

    const userExist = await this.prisma.usuario.findUnique({
      where: { email: dto.email.toLocaleLowerCase() },
    });

    if (userExist) {
      throw new ConflictException(
        `Já existe usuário cadastrado com o email ${dto.email}`,
      );
    }

    //Se não existir cria um novo usuário no banco
    const user = await this.prisma.usuario.create({
      data: {
        nome: dto.nome,
        email: dto.email,
        tipoAcesso: dto.tipoAcesso,
      },
    });
    //Retorna para a requisição
    return user;
  }

  async findAll() {
    return await this.prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        criadoEm: true,
        atualizadoEm: true,
        tipoAcesso: true,
        cursos: true,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        criadoEm: true,
        atualizadoEm: true,
        tipoAcesso: true,
        cursos: true,
      },
    });
    if (!user) throw new NotFoundException('Usuário não encontrado.');

    return user;
  }

  async update(id: number, dto: UpdateUsuarioDto) {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('Usuário não encontrado');

    await this.prisma.usuario.update({
      where: { id },
      data: {
        nome: dto.nome,
        email: dto.email,
        tipoAcesso: dto.tipoAcesso,
      },
    });

    return { message: 'Usuário alterado com sucesso.' };
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('Usuário não encontrado');

    await this.prisma.usuario.delete({
      where: { id },
    });

    return { message: 'Usuário excluído com sucesso' };
  }

  // Adicionar cursos
  async addCurso(id: number, dto: UpdateUsuarioDto) {
    // cursoExist alterado para puxar do cursoService
    // necessário fazer a injeção de dependência no constructor
    // exportar o service no module do curso e importar o module de curso no module de usuario
    const cursoExist = await this.cursoService.findOne(dto.cursoId);
    const usuario = await this.findOne(id);

    // puxar também o id do curso no findOne do cursoService
    if (usuario.cursos.find((c) => c.id === cursoExist.id)) {
      throw new ConflictException(
        `Usuário já matrículo no curso ${cursoExist.titulo}`,
      );
    }

    await this.prisma.usuario.update({
      where: { id },
      data: {
        cursos: {
          connect: {
            id: cursoExist.id,
          },
        },
      },
    });

    return {
      menssagem: `Usuário ${usuario.nome} matriculado no curso ${cursoExist.titulo} com sucesso.`,
    };
  }

  async cancelarMatricula(id: number, dto: CancelarMatriculaDto) {
    const cursoExist = await this.cursoService.findOne(dto.cancelarId);

    await this.prisma.usuario.update({
      where: { id },
      data: {
        cursos: {
          disconnect: {
            id: cursoExist.id,
          },
        },
      },
    });
    const usuario = await this.findOne(id);

    return {
      menssagem: `Cancelada a matricula do usuario ${usuario.nome} do curso ${cursoExist.titulo} com sucesso.`,
    };
  }

  async listarCursos(id: number) {
    const aluno = await this.findOne(id);
    return aluno.cursos;
  }
}
