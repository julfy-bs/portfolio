import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

import { ACCESS_COOKIE, readCookie } from '../auth.cookies';
import { TokenService } from '../token.service';
import type { JwtPayload } from '../types/jwt-payload';

/** Проверяет access-токен из HttpOnly-cookie и кладёт его payload в `request.user`. */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request & { user?: JwtPayload }>();
    const token = readCookie(request, ACCESS_COOKIE);
    if (!token) {
      throw new UnauthorizedException('Требуется авторизация');
    }

    try {
      request.user = await this.tokenService.verifyAccess(token);
      return true;
    } catch {
      throw new UnauthorizedException('Недействительный токен');
    }
  }
}
