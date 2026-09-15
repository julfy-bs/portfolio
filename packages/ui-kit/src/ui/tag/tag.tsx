import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

import styles from './tag.module.css';

const tag = cva(styles.tag, {
  variants: {
    shape: {
      rounded: styles.rounded,
      pill: styles.pill,
    },
    tone: {
      neutral: '',
      tinted: styles.tinted,
    },
  },
  defaultVariants: {
    shape: 'rounded',
    tone: 'neutral',
  },
});

export interface TagProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof tag> {}

/**
 * Неинтерактивная метка: технология, счётчик (`+3`), статусный бейдж. Для фильтра-переключателя
 * есть Chip.
 */
export function Tag({ shape, tone, className, ...rest }: TagProps) {
  return <span className={tag({ shape, tone, className })} {...rest} />;
}
