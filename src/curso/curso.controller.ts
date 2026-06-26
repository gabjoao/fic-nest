import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CursoService } from './curso.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { UserExistGuard } from 'src/common/guards/user-exist/user-exist.guard';
import { CancelarMatriculaDto } from 'src/usuario/dto/cancelar-matricula.dto';

@Controller('curso')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @Post()
  create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursoService.create(createCursoDto);
  }

  @Get()
  findAll() {
    return this.cursoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cursoService.findOne(+id);
  }

  @Get(':id/listarAlunos')
  listarAlunos(@Param('id') id: string) {
    return this.cursoService.listarAlunos(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCursoDto: UpdateCursoDto) {
    return this.cursoService.update(+id, updateCursoDto);
  }

  @UseGuards(UserExistGuard)
  @Patch(':id/addUsuario')
  addUsuario(@Param('id') id: string, @Body() updateCursoDto: UpdateCursoDto) {
    return this.cursoService.addUsuario(+id, updateCursoDto);
  }

  @UseGuards(UserExistGuard)
  @Patch(':id/removerUsuario')
  removerUsuario(
    @Param('id') id: string,
    @Body() cancelarMatriculaDto: CancelarMatriculaDto,
  ) {
    return this.cursoService.removerUsuario(+id, cancelarMatriculaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cursoService.remove(+id);
  }
}
