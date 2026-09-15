import { cn } from '../../lib';

import styles from './error-state.module.css';

export interface ErrorStateProps {
  /** Сообщение об ошибке (локализованное). */
  readonly message: string;
  /** Подпись кнопки повтора. Кнопка показывается только вместе с `onRetry`. */
  readonly retryLabel?: string;
  readonly onRetry?: () => void;
  readonly className?: string;
}

/** Ошибка загрузки в терминальном стиле, общая для всех экранов, которые ходят в API. */
export function ErrorState({ message, retryLabel, onRetry, className }: ErrorStateProps) {
  return (
    <div className={cn(styles.root, className)} role="alert">
      <span className={styles.marker}>{'// error'}</span>
      <p className={styles.message}>{message}</p>
      {onRetry ? (
        <button type="button" className={styles.retry} onClick={onRetry}>
          {retryLabel}
        </button>
      ) : null}
    </div>
  );
}
