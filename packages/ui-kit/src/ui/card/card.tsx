import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

import styles from './card.module.css';

const card = cva(styles.card, {
  variants: {
    padding: {
      none: styles.none,
      md: styles.md,
      lg: styles.lg,
    },
    interactive: {
      true: styles.interactive,
    },
  },
  defaultVariants: {
    padding: 'md',
  },
});

export interface CardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof card> {}

/**
 * Карточка на поверхности. `interactive` добавляет подъём при наведении, но кликабельное
 * содержимое всё равно нужно оборачивать в ссылку или кнопку.
 */
export function Card({ padding, interactive, className, ...rest }: CardProps) {
  return <div className={card({ padding, interactive, className })} {...rest} />;
}
