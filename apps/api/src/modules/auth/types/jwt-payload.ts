import { UserRole } from '@prisma/client';

// id пользователя лежит в стандартном claim `sub`.
export interface JwtPayload {
  readonly sub: string;
  readonly username: string;
  readonly role: UserRole;
}
