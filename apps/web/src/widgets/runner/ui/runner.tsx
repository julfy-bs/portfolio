import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useToaster } from '@/features/toaster';

import { useRunner } from '../model/runner-context';
import type { RunnerProject } from '../model/runner-context';

import { RunnerView, type RunnerWindowState } from './runner-view';

/**
 * Монтируется только на время запуска, поэтому каждый проект открывается в обычном
 * размере окна.
 */
function RunnerSession({
  project,
  onClose,
}: {
  readonly project: RunnerProject;
  readonly onClose: () => void;
}) {
  const { t } = useTranslation();
  const { notify } = useToaster();
  const [windowState, setWindowState] = useState<RunnerWindowState>('normal');

  // Проект не загрузился: кроме ошибки в окне показываем тост. Окно не закрываем,
  // пусть пользователь сделает это сам.
  const handleError = useCallback(() => {
    notify({
      type: 'error',
      title: t('runner.error.toastTitle'),
      description: t('runner.error.toastDescription', { title: project.title }),
    });
  }, [notify, t, project.title]);

  return (
    <RunnerView
      project={project}
      windowState={windowState}
      onClose={onClose}
      onMinimize={() => setWindowState('minimized')}
      onToggleMaximize={() =>
        setWindowState((state) => (state === 'maximized' ? 'normal' : 'maximized'))
      }
      onRestore={() => setWindowState('normal')}
      onError={handleError}
    />
  );
}

/** Монтируется один раз в корневом лейауте и открывает окно, когда что-то запущено. */
export function Runner() {
  const { project, close } = useRunner();
  if (project === null) return null;
  // key по URL: новый проект получает свежую сессию с обычным размером и новым iframe.
  return <RunnerSession key={project.embedUrl} project={project} onClose={close} />;
}
