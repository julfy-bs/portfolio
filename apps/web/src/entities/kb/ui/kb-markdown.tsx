import { useMemo } from 'react';
import { type Components } from 'react-markdown';

import { Markdown } from '@/shared/ui';

import styles from './kb-markdown.module.css';

const WIKILINK = /\[\[([^[\]]+)\]\]/g;
const WIKI_HREF = '#wiki:';

export interface KbMarkdownProps {
  readonly source: string;
  /** Без обработчика вики-ссылки неактивны, например в превью. */
  readonly onNavigate?: (slug: string) => void;
}

/**
 * Общий рендер статьи для читателя и кабинета (просмотр и живое превью). `[[slug]]`
 * превращаем в ссылку со служебной схемой и ловим своим рендерером, чтобы не тащить
 * remark-плагин. Внешние ссылки открываются в новой вкладке.
 */
export function KbMarkdown({ source, onNavigate }: KbMarkdownProps) {
  const prepared = useMemo(
    () =>
      source.replace(WIKILINK, (_match, target: string) => `[${target}](${WIKI_HREF}${target})`),
    [source],
  );

  const components = useMemo<Components>(
    () => ({
      a: ({ node: _node, href, children, ...props }) => {
        // Обычная внешняя ссылка, стили берёт общий `.prose a`.
        if (href === undefined || !href.startsWith(WIKI_HREF)) {
          return (
            <a {...props} href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          );
        }
        const slug = href.slice(WIKI_HREF.length);
        if (onNavigate === undefined) {
          return <span className={styles.wikilink}>{children}</span>;
        }
        return (
          <button type="button" className={styles.wikilink} onClick={() => onNavigate(slug)}>
            {children}
          </button>
        );
      },
    }),
    [onNavigate],
  );

  return (
    <Markdown className={styles.kb} components={components}>
      {prepared}
    </Markdown>
  );
}
