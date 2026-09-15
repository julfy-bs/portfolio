import { env } from '@/shared/config';

// Воркер импортируется динамически, чтобы msw и фикстуры не попали в прод-бандл.
export async function enableMocking(): Promise<void> {
  if (!env.enableMocks) {
    return;
  }

  // Проверка дублирует env, но нужна сборщику: в обычном прод-билде условие становится
  // константой, и Rollup выкидывает import ниже вместе с чанком msw.
  if (import.meta.env.VITE_ENABLE_MOCKS !== 'true' && !import.meta.env.DEV) {
    return;
  }

  try {
    const { worker } = await import('./browser');
    await worker.start({ onUnhandledRequest: 'bypass' });
  } catch (error) {
    // Service Worker бывает недоступен (без https, например). Приложение всё равно
    // должно запуститься и просто показать ошибки загрузки.
    console.error('MSW не запустился, продолжаем без моков:', error);
  }
}
