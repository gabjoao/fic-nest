import { forwardRef, Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { CursoModule } from 'src/curso/curso.module';
import { IsAdminGuard } from 'src/common/guards/is-admin/is-admin.guard';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, IsAdminGuard],
  imports: [forwardRef(() => CursoModule)],
  exports: [UsuarioService],
})
export class UsuarioModule {}
