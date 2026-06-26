/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { Request } from 'express';

@Injectable()
export class UserExistGuard implements CanActivate {
  constructor(private readonly usuarioService: UsuarioService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    //userexistid precisa ser em minúsculo, por mais que mande como maiusculo na requisição
    const userId = request.headers?.userexistid;

    if (!userId)
      throw new UnauthorizedException('Id de verificação não encontrado');

    const usuario = await this.usuarioService.findOne(+userId);

    if (!usuario) throw new NotFoundException('Usuário não encontrado');
    return true;
  }
}
