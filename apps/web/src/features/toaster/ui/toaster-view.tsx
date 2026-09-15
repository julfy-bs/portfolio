import { cn } from '@/shared/lib';
import { Toast } from '@sutuzhko/ui-kit';

import type { ToastItem } from '../model/use-toaster-queue';

import styles from './toaster-view.module.css';

export interface ToasterViewProps {
  readonly toasts: readonly ToastItem[];
  /** На паузе полосы отсчёта замирают. */
  readonly paused: boolean;
  readonly onDismiss: (id: number) => void;
  /** Наведение или фокус в стеке ставит автозакрытие на паузу. */
  readonly onPause: () => void;
  /** Курсор или фокус ушёл из стека, отсчёт продолжается. */
  readonly onResume: () => void;
  readonly regionLabel: string;
  readonly closeLabel: string;
}

/**
 * Наведение или фокус внутри стека ставит автозакрытие на паузу, чтобы успеть дочитать
 * и дотянуться до крестика. Каждый `Toast` сам объявляет себя через role status/alert,
 * поэтому `aria-live` на контейнере не нужен.
 */
export function ToasterView({
  toasts,
  paused,
  onDismiss,
  onPause,
  onResume,
  regionLabel,
  closeLabel,
}: ToasterViewProps) {
  if (toasts.length === 0) return null;

  return (
    <div className={styles.viewport} role="region" aria-label={regionLabel}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(styles.item, toast.leaving && styles.leaving)}
          onMouseEnter={onPause}
          onMouseLeave={onResume}
          onFocus={onPause}
          onBlur={onResume}
        >
          <Toast
            type={toast.type}
            title={toast.title}
            description={toast.description}
            onClose={() => onDismiss(toast.id)}
            closeLabel={closeLabel}
            duration={toast.duration > 0 ? toast.duration : undefined}
            paused={paused}
          />
        </div>
      ))}
    </div>
  );
}
