import { useGetMeQuery } from '../api/session-api';

import type { AuthUser } from './types';

export interface AuthState {
  /** Текущий пользователь или `undefined`, если сессии нет. */
  readonly user: AuthUser | undefined;
  readonly isAuthenticated: boolean;
  /** Первичная проверка сессии ещё идёт, статус пока неизвестен. */
  readonly isLoading: boolean;
}

/**
 * Статус авторизации по серверной сессии (`getMe`). `401` здесь не ошибка, а просто
 * «не авторизован», поэтому при ошибке пользователь сбрасывается в `undefined`. Заодно
 * после выхода не показываем устаревшего пользователя.
 */
export function useAuth(): AuthState {
  const { data, isLoading, isError } = useGetMeQuery();

  return {
    user: isError ? undefined : data,
    isAuthenticated: !isError && data !== undefined,
    isLoading,
  };
}
