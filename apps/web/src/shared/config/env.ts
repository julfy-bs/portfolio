// Остальной код читает переменные окружения отсюда, а не из `import.meta.env`.

interface AppEnv {
  readonly apiBaseUrl: string;
  readonly enableMocks: boolean;
  readonly isDev: boolean;
}

const mocksFlag = import.meta.env.VITE_ENABLE_MOCKS;

export const env: AppEnv = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '/api',
  // В dev моки включены по умолчанию, бэкенд может быть не поднят. Явный флаг главнее.
  enableMocks: mocksFlag === 'true' || (mocksFlag !== 'false' && import.meta.env.DEV),
  isDev: import.meta.env.DEV,
};
