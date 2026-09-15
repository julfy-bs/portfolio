import type { components } from '@portfolio/contract';

/** Аутентифицированный пользователь (ответ `/auth/me` и `/auth/login`). */
export type AuthUser = components['schemas']['AuthUserDto'];

export type LoginCredentials = components['schemas']['LoginDto'];

export type UserRole = components['schemas']['UserRole'];

export type ChangePassword = components['schemas']['ChangePasswordDto'];
