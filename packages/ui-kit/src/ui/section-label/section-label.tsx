import type { ElementType, HTMLAttributes } from 'react';

import { cn } from '../../lib';

import styles from './section-label.module.css';

type SectionLabelElement = 'h2' | 'h3' | 'div' | 'span' | 'p';

export interface SectionLabelProps extends HTMLAttributes<HTMLElement> {
  /** Семантический тег. По умолчанию `h2`, потому что метка озаглавливает секцию. */
  readonly as?: SectionLabelElement;
}

/**
 * Метка секции в стиле комментария кода (`// стек`). Префикс `//` приходит вместе с текстом
 * из i18n, компонент отвечает только за оформление.
 */
export function SectionLabel({ as, className, ...rest }: SectionLabelProps) {
  const Component: ElementType = as ?? 'h2';

  return <Component className={cn(styles.label, className)} {...rest} />;
}
