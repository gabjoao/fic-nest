import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { IsAdminGuard } from 'src/common/guards/is-admin/is-admin.guard';
import { UsuarioService } from 'src/usuario/usuario.service';
import { CursoService } from 'src/curso/curso.service';

@Module({
  controllers: [CategoriaController],
  providers: [CategoriaService, IsAdminGuard, UsuarioService, CursoService],
})
export class CategoriaModule {}
