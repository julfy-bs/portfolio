/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** По умолчанию '/api' на том же origin, в проде его проксирует Caddy. */
  readonly VITE_API_BASE_URL?: string;
  /** 'false' выключает моки даже в dev. */
  readonly VITE_ENABLE_MOCKS?: 'true' | 'false';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
