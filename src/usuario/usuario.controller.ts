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
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { IsAdminGuard } from 'src/common/guards/is-admin/is-admin.guard';
import { CancelarMatriculaDto } from './dto/cancelar-matricula.dto';
import { UserExistGuard } from 'src/common/guards/user-exist/user-exist.guard';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @UseGuards(IsAdminGuard)
  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Get(':id/listarCursos')
  listarCursos(@Param('id') id: string) {
    return this.usuarioService.listarCursos(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @UseGuards(UserExistGuard)
  @Patch('/:id/addCurso')
  addCurso(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuarioService.addCurso(+id, updateUsuarioDto);
  }

  @UseGuards(UserExistGuard)
  @Patch('/:id/cancelarMatricula')
  cancelarMatricula(
    @Param('id') id: string,
    @Body() cancelarMatriculaDto: CancelarMatriculaDto,
  ) {
    return this.usuarioService.cancelarMatricula(+id, cancelarMatriculaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}
