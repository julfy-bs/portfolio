import { createContext, useContext } from 'react';

export interface ConsoleContextValue {
  readonly isOpen: boolean;
  readonly open: () => void;
  readonly close: () => void;
  readonly toggle: () => void;
}

export const ConsoleContext = createContext<ConsoleContextValue | null>(null);

/** Вне ConsoleProvider бросает ошибку, чтобы кривая композиция сразу была видна. */
export function useConsole(): ConsoleContextValue {
  const value = useContext(ConsoleContext);
  if (value === null) {
    throw new Error('useConsole должен использоваться внутри ConsoleProvider');
  }
  return value;
}
