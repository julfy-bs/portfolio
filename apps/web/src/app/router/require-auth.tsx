import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '@/entities/session';
import { routePaths } from '@/shared/config';

/**
 * Исходный путь кладём в `state.from`, чтобы вернуть туда после входа. Пока сессия
 * проверяется, ничего не рендерим, иначе успел бы проскочить редирект на логин.
 */
export function RequireAuth() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return null;

  if (!isAuthenticated) {
    return <Navigate to={routePaths.login} state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
}
