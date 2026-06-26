import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCategoriaDto) {
    const categoriaExist = await this.prisma.categoria.findUnique({
      where: { nome: dto.nome },
    });

    if (categoriaExist) throw new ConflictException('Categoria já existe');

    const categoria = await this.prisma.categoria.create({
      data: {
        nome: dto.nome,
        descricao: dto.descricao,
      },
    });

    return categoria;
  }

  async findAll() {
    return await this.prisma.categoria.findMany({
      select: {
        id: true,
        nome: true,
        descricao: true,
        cursos: true,
      },
    });
  }

  async findOne(id: number) {
    const categoria = await this.prisma.categoria.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        descricao: true,
        cursos: true,
      },
    });

    if (!categoria) throw new NotFoundException('Categoria não encontrada');

    return categoria;
  }

  async update(id: number, dto: UpdateCategoriaDto) {
    const categoria = await this.findOne(id);
    if (!categoria) throw new NotFoundException('Categoria não encontrada');

    await this.prisma.categoria.update({
      where: { id },
      data: {
        nome: dto.nome,
        descricao: dto.descricao,
      },
    });

    return { message: 'Categoria alterada com sucesso' };
  }

  async remove(id: number) {
    const categoria = await this.findOne(id);
    if (!categoria) throw new NotFoundException('Categoria não encontrada');

    await this.prisma.categoria.delete({
      where: { id },
    });

    return { message: 'Categoria excluída com sucesso' };
  }

  async listarCursos(id: number) {
    const categoria = await this.findOne(id);
    return categoria.cursos;
  }
}
