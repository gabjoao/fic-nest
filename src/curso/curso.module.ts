import { forwardRef, Module } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  controllers: [CursoController],
  providers: [CursoService],
  imports: [forwardRef(() => UsuarioModule)],
  exports: [CursoService],
})
export class CursoModule {}
