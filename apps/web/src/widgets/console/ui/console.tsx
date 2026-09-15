import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { useProfile } from '@/entities/profile';
import { isPathEnabled, usePageVisibility } from '@/entities/settings';
import { useTheme } from '@/features/theme-switch';
import { useToaster } from '@/features/toaster';
import { useAppLanguage } from '@/shared/config';
import { downloadFile, useMoscowClock } from '@/shared/lib';

import type { CommandServices } from '../model/commands';
import { useConsole } from '../model/console-context';
import { useConsoleSession } from '../model/use-console-session';

import { ConsoleView, type ConsoleWindowState } from './console-view';

export interface ConsoleProps {
  /**
   * Запуск проекта командой `run <cmd>`. Раннер живёт в соседнем виджете, поэтому связывает
   * их app-слой, а консоль про раннер не знает. Вернёт название проекта или `null`.
   */
  readonly onRunProject: (command: string) => string | null;
}

/**
 * Связывает состояние консоли, сессию команд и сервисы приложения с `ConsoleView`.
 * Монтируется один раз в корневом лейауте.
 */
export function Console({ onRunProject }: ConsoleProps) {
  const { t } = useTranslation();
  const { isOpen, close } = useConsole();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { setMode, toggle } = useTheme();
  const { notify } = useToaster();
  const { data: profile } = useProfile();
  const language = useAppLanguage();
  const pageVisibility = usePageVisibility();

  const clock = useMoscowClock();
  const [windowState, setWindowState] = useState<ConsoleWindowState>('normal');

  // При закрытии сбрасываем размер, чтобы консоль всегда открывалась в обычном виде.
  useEffect(() => {
    if (!isOpen) setWindowState('normal');
  }, [isOpen]);

  const downloadCv = useCallback(() => downloadFile(profile?.cvUrl), [profile?.cvUrl]);
  // navigate из React Router возвращает Promise, поэтому оборачиваем в void-функцию
  // под сигнатуру сервисов команд.
  const navigateTo = useCallback((path: string) => void navigate(path), [navigate]);
  const openUrl = useCallback((url: string) => {
    window.open(url, '_blank', 'noopener');
  }, []);
  const isRouteEnabled = useCallback(
    (path: string) => isPathEnabled(path, pageVisibility),
    [pageVisibility],
  );

  const services = useMemo<CommandServices>(
    () => ({
      t,
      profile,
      currentPath: pathname,
      language,
      navigate: navigateTo,
      setTheme: setMode,
      toggleTheme: toggle,
      downloadCv,
      openUrl,
      notify,
      runProject: onRunProject,
      isRouteEnabled,
      close,
    }),
    [
      t,
      profile,
      pathname,
      language,
      navigateTo,
      setMode,
      toggle,
      downloadCv,
      openUrl,
      notify,
      onRunProject,
      isRouteEnabled,
      close,
    ],
  );

  const { entries, input, setInput, onKeyDown } = useConsoleSession(services);

  const routeLabel = pathname === '/' ? '~' : pathname;

  return (
    <ConsoleView
      isOpen={isOpen}
      windowState={windowState}
      routeLabel={routeLabel}
      entries={entries}
      input={input}
      profile={profile}
      clock={clock}
      onInputChange={setInput}
      onInputKeyDown={onKeyDown}
      onClose={close}
      onMinimize={() => setWindowState('minimized')}
      onToggleMaximize={() =>
        setWindowState((state) => (state === 'maximized' ? 'normal' : 'maximized'))
      }
      onRestore={() => setWindowState('normal')}
    />
  );
}
