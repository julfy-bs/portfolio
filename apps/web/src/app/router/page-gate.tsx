import { Outlet } from 'react-router-dom';

import { usePageVisibility, type PageVisibility } from '@/entities/settings';
import { NotFoundPage } from '@/pages/not-found';

interface PageGateProps {
  readonly page: keyof PageVisibility;
}

/**
 * Выключенная в настройках страница отдаёт 404 и по прямой ссылке. Пока настройки
 * грузятся, страница считается видимой, так что 404 не мелькает.
 */
export function PageGate({ page }: PageGateProps) {
  const visibility = usePageVisibility();
  return visibility[page] ? <Outlet /> : <NotFoundPage />;
}
