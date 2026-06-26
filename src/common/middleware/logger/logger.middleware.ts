/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const now = new Date().toISOString();

    console.log(`[${now}] ${req.method}  ${req.originalUrl}`);
    next();
  }
}
