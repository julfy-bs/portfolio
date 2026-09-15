import type { Request } from 'express';

export const ACCESS_COOKIE = 'access_token';
export const REFRESH_COOKIE = 'refresh_token';

// Refresh-cookie браузер отправляет только на эндпоинты авторизации, с учётом глобального префикса.
export const REFRESH_COOKIE_PATH = '/api/auth';

// cookie-parser типизирует request.cookies как any, здесь сужаем тип.
export function readCookie(request: Request, name: string): string | undefined {
  const cookies: Record<string, string> = request.cookies ?? {};
  return cookies[name];
}
