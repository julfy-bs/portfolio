import { defineConfig, devices } from '@playwright/test';

// E2E гоняем на прод-сборке в preview, но с MSW-моками вместо бэкенда.
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
    // Chromium по умолчанию отдаёт en-US, и детектор переключил бы приложение на английский.
    locale: 'ru-RU',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'], locale: 'ru-RU' } }],
  webServer: {
    command: 'pnpm build && pnpm preview --port 4173 --strictPort',
    url: 'http://localhost:4173',
    env: { VITE_ENABLE_MOCKS: 'true' },
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
