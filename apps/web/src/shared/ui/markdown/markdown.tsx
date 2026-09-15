import { useMemo } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { cn } from '@/shared/lib';

import styles from './markdown.module.css';

export interface MarkdownProps {
  readonly children: string;
  /** Для размера шрифта (`--md-font-size`), ширины и прочего на обёртке. */
  readonly className?: string;
  /** Например, для вики-ссылок `[[slug]]` в базе знаний. */
  readonly components?: Components;
}

// GFM подключаем в первую очередь ради таблиц.
const REMARK_PLUGINS = [remarkGfm];

const baseComponents: Components = {
  // Ссылки из контента ведут наружу, открываем их в новой вкладке. `children` передаём
  // явно, иначе jsx-a11y/anchor-has-content не видит содержимое за spread.
  a: ({ node: _node, children, ...props }) => (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  // Чтобы широкая таблица прокручивалась, а не ломала лейаут.
  table: ({ node: _node, children, ...props }) => (
    <div className={styles.tableWrap}>
      <table {...props}>{children}</table>
    </div>
  ),
};

/** Общий рендерер Markdown, чтобы типографика везде была одинаковой. */
export function Markdown({ children, className, components }: MarkdownProps) {
  const merged = useMemo<Components>(
    () => (components ? { ...baseComponents, ...components } : baseComponents),
    [components],
  );

  return (
    <div className={cn(styles.prose, className)}>
      <ReactMarkdown remarkPlugins={REMARK_PLUGINS} components={merged}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
