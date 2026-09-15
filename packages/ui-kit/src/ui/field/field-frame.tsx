import type { ReactNode } from 'react';

import { cn } from '../../lib';

import styles from './field-frame.module.css';

/**
 * Стиль подписи: `mono` терминальный (капсом, для входа и консольных форм),
 * `plain` обычный (sans, для CMS-форм кабинета).
 */
export type FieldLabelVariant = 'mono' | 'plain';

export interface FieldFrameProps {
  /** id связанного контрола (для label[for]). */
  readonly id: string;
  readonly label?: ReactNode;
  readonly hint?: ReactNode;
  readonly error?: ReactNode;
  /** Стиль подписи; по умолчанию терминальный `mono`. */
  readonly labelVariant?: FieldLabelVariant;
  /** Помечает поле обязательным: после подписи появляется красная звёздочка. */
  readonly required?: boolean;
  /** id текста сообщения (для aria-describedby контрола). */
  readonly messageId?: string;
  readonly className?: string;
  readonly children: ReactNode;
}

/**
 * Общая обвязка поля (подпись, контрол, сообщение) для Input, Textarea и Select, чтобы разметка
 * и a11y не дублировались. Ошибка вытесняет подсказку.
 */
export function FieldFrame({
  id,
  label,
  hint,
  error,
  labelVariant = 'mono',
  required,
  messageId,
  className,
  children,
}: FieldFrameProps) {
  const message = error ?? hint;

  return (
    <div className={cn(styles.field, className)}>
      {label ? (
        <label
          htmlFor={id}
          className={cn(styles.label, labelVariant === 'plain' && styles.labelPlain)}
        >
          {label}
          {required ? (
            <span className={styles.required} aria-hidden="true">
              {' '}
              *
            </span>
          ) : null}
        </label>
      ) : null}
      {children}
      {message ? (
        <p id={messageId} className={cn(styles.message, error ? styles.error : undefined)}>
          {message}
        </p>
      ) : null}
    </div>
  );
}
