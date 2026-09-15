import { createContext, useContext } from 'react';

export interface RunnerProject {
  readonly title: string;
  /** URL проекта для встраивания (`Project.embedUrl`). */
  readonly embedUrl: string;
}

export interface RunnerContextValue {
  /** Запущенный проект или `null`, если раннер закрыт. */
  readonly project: RunnerProject | null;
  /** Вызывается кнопкой запуска на странице проекта и командой `run` в консоли. */
  readonly open: (project: RunnerProject) => void;
  readonly close: () => void;
}

export const RunnerContext = createContext<RunnerContextValue | null>(null);

/** Вне RunnerProvider бросает ошибку, чтобы кривая композиция сразу была видна. */
export function useRunner(): RunnerContextValue {
  const value = useContext(RunnerContext);
  if (value === null) {
    throw new Error('useRunner должен использоваться внутри RunnerProvider');
  }
  return value;
}
