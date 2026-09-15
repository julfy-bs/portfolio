import { useTranslation } from 'react-i18next';

import { cn } from '@/shared/lib';
import { Markdown } from '@/shared/ui';
import { SectionLabel, Skeleton } from '@sutuzhko/ui-kit';

import styles from './about.module.css';

export interface AboutProps {
  /** Markdown, уже локализованный под язык приложения. */
  readonly bioMarkdown?: string;
  readonly isLoading?: boolean;
  /** Якорь секции для навигации и скролл-шпиона. */
  readonly id?: string;
  readonly className?: string;
}

/**
 * Секция «Обо мне». Био приходит с бэкенда, поэтому пока профиль грузится, показываем
 * скелетон-абзацы.
 */
export function About({ bioMarkdown, isLoading, id, className }: AboutProps) {
  const { t } = useTranslation();

  return (
    <section id={id} className={cn(styles.section, className)}>
      <SectionLabel>{t('home.sections.about')}</SectionLabel>
      {isLoading || !bioMarkdown ? (
        <AboutSkeleton />
      ) : (
        <Markdown className={styles.about}>{bioMarkdown}</Markdown>
      )}
    </section>
  );
}

function AboutSkeleton() {
  // Обычно био состоит из трёх абзацев, под них и заглушки.
  return (
    <div className={cn(styles.about, styles.skeleton)} aria-busy="true" aria-live="polite">
      {[
        ['100%', '96%', '88%'],
        ['100%', '72%'],
        ['90%', '54%'],
      ].map((lines, index) => (
        <div key={index} className={styles.skeletonParagraph}>
          {lines.map((width, line) => (
            <Skeleton key={line} width={width} height="var(--about-line-box)" />
          ))}
        </div>
      ))}
    </div>
  );
}
