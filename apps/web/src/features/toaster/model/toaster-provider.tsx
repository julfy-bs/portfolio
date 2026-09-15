import { useMemo, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import { ToasterView } from '../ui/toaster-view';

import { ToasterContext, type ToasterContextValue } from './toaster-context';
import { useToasterQueue } from './use-toaster-queue';

interface ToasterProviderProps {
  readonly children: ReactNode;
}

/**
 * Отдаёт `notify`/`dismiss` через контекст, чтобы показать тост можно было откуда угодно.
 *
 * Стек порталится в `document.body`: он висит поверх всего (`--z-toast`) и не должен
 * зависеть от контекста наложения родителя.
 */
export function ToasterProvider({ children }: ToasterProviderProps) {
  const { t } = useTranslation();
  const { toasts, paused, notify, dismiss, pause, resume } = useToasterQueue();

  const value = useMemo<ToasterContextValue>(() => ({ notify, dismiss }), [notify, dismiss]);

  return (
    <ToasterContext.Provider value={value}>
      {children}
      {createPortal(
        <ToasterView
          toasts={toasts}
          paused={paused}
          onDismiss={dismiss}
          onPause={pause}
          onResume={resume}
          regionLabel={t('toaster.a11y.region')}
          closeLabel={t('toaster.a11y.close')}
        />,
        document.body,
      )}
    </ToasterContext.Provider>
  );
}
