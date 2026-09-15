import { createContext, useContext } from 'react';

export type ThemeMode = 'dark' | 'light';

/**
 * Ключ localStorage с явным выбором темы, тот же, что в бутстрап-скрипте index.html.
 * Пишем его только при ручном переключении: по нему отличаем гостя, который тему
 * ещё не выбирал. Системная тема и тема по умолчанию сюда не попадают.
 */
export const themeStorageKey = 'portfolio.theme';

export const defaultThemeMode: ThemeMode = 'dark';

export interface ThemeContextValue {
  readonly mode: ThemeMode;
  readonly toggle: () => void;
  readonly setMode: (mode: ThemeMode) => void;
  /**
   * Применяет тему, не запоминая её как выбор: системную `prefers-color-scheme` или
   * `settings.defaultTheme` для нового гостя. В localStorage не пишет.
   */
  readonly applyDefaultMode: (mode: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

/** Вне ThemeProvider бросает ошибку: значит, провайдер забыли подключить. */
export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);
  if (value === null) {
    throw new Error('useTheme должен использоваться внутри ThemeProvider');
  }
  return value;
}
