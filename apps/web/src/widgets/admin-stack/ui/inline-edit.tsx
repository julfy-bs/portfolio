import { useEffect, useRef } from 'react';

import { cn } from '@/shared/lib';

import styles from './admin-stack.module.css';

interface InlineEditProps {
  readonly value: string;
  readonly ariaLabel: string;
  readonly placeholder?: string;
  readonly className?: string;
  readonly onChange: (value: string) => void;
  /** Срабатывает по Enter и при потере фокуса. */
  readonly onCommit: () => void;
  /** Срабатывает по Escape. */
  readonly onCancel: () => void;
}

/** Поле ввода внутри чипа или заголовка. Ширина тянется за текстом через `size`. */
export function InlineEdit({
  value,
  ariaLabel,
  placeholder,
  className,
  onChange,
  onCommit,
  onCancel,
}: InlineEditProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
    ref.current?.select();
  }, []);

  return (
    <input
      ref={ref}
      className={cn(styles.inlineInput, className)}
      aria-label={ariaLabel}
      placeholder={placeholder}
      value={value}
      size={Math.max(value.length, placeholder?.length ?? 0, 4)}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onCommit}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          onCommit();
        } else if (event.key === 'Escape') {
          event.preventDefault();
          onCancel();
        }
      }}
    />
  );
}
