/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { Request } from 'express';
import { TipoAcesso } from 'src/usuario/enums/tipo-acesso.enum';

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(private readonly usuarioService: UsuarioService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    //adminid é minúsculo porque todos os headers, por mais que passe como AdminId na requisição, ficam em minúsculo
    const userId = request.headers?.adminid;
    console.log(request.headers);

    if (!userId)
      throw new UnauthorizedException('Id de verificação não fornecido');

    const usuario = await this.usuarioService.findOne(+userId);

    if (usuario.tipoAcesso === TipoAcesso.ADMIN) return true;
    throw new UnauthorizedException('Usuário não autorizado');
  }
}
