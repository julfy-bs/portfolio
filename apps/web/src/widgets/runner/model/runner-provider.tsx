import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

import { RunnerContext, type RunnerContextValue, type RunnerProject } from './runner-context';

interface RunnerProviderProps {
  readonly children: ReactNode;
}

/**
 * Запустить проект можно со страницы проекта или из консоли, поэтому состояние раннера
 * лежит в контексте, а не в самом оверлее. После закрытия фокус возвращается на прежний
 * элемент.
 */
export function RunnerProvider({ children }: RunnerProviderProps) {
  const [project, setProject] = useState<RunnerProject | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const open = useCallback((next: RunnerProject) => {
    openerRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setProject(next);
  }, []);

  const close = useCallback(() => {
    setProject(null);
    openerRef.current?.focus();
    openerRef.current = null;
  }, []);

  useEffect(() => {
    if (project === null) return;
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [project, close]);

  const value = useMemo<RunnerContextValue>(
    () => ({ project, open, close }),
    [project, open, close],
  );

  return <RunnerContext.Provider value={value}>{children}</RunnerContext.Provider>;
}
