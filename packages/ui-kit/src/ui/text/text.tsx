import { cva, type VariantProps } from 'class-variance-authority';
import type { ElementType, HTMLAttributes } from 'react';

import styles from './text.module.css';

const text = cva(styles.text, {
  variants: {
    // Размер привязан к шкале, а не к тегу, чтобы его можно было дать любому элементу.
    size: {
      body: styles.body,
      small: styles.small,
      caption: styles.caption,
      label: styles.label,
    },
    tone: {
      default: styles.toneDefault,
      muted: styles.toneMuted,
      dim: styles.toneDim,
      primary: styles.tonePrimary,
      danger: styles.toneDanger,
    },
    weight: {
      regular: styles.regular,
      medium: styles.medium,
      semibold: styles.semibold,
      bold: styles.bold,
    },
    family: {
      sans: styles.sans,
      mono: styles.mono,
    },
    truncate: {
      true: styles.truncate,
    },
  },
  defaultVariants: {
    size: 'body',
    tone: 'default',
    weight: 'regular',
    family: 'sans',
  },
});

/** Допустимые теги-обёртки. Ограничены строчно/блочными элементами без своей семантики. */
type TextElement = 'p' | 'span' | 'div' | 'label' | 'strong' | 'em' | 'small';

export interface TextProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof text> {
  /** Семантический тег. По умолчанию `p`; для инлайна выбирайте `span`. */
  readonly as?: TextElement;
}

/**
 * Весь текст, кроме заголовков (для них Heading), идёт через этот компонент, чтобы шкала и цвета
 * не разъезжались. Размер и тон не зависят от тега.
 */
export function Text({ as, size, tone, weight, family, truncate, className, ...rest }: TextProps) {
  const Component: ElementType = as ?? 'p';

  return (
    <Component className={text({ size, tone, weight, family, truncate, className })} {...rest} />
  );
}
