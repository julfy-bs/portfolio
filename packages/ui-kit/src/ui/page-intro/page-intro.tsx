import { cn } from '../../lib';
import { Skeleton } from '../skeleton/skeleton';
import { Text } from '../text';

import styles from './page-intro.module.css';

export interface PageIntroProps {
  /**
   * Текст с бэкенда: `undefined` пока грузится (скелетон), `null` если интро нет,
   * строка рендерится абзацем.
   */
  readonly intro?: string | null;
  readonly className?: string;
}

/**
 * Интро-абзац под заголовком экрана. Текст приходит с сервера, поэтому до загрузки на его месте
 * скелетон той же высоты, чтобы вёрстка не прыгала.
 */
export function PageIntro({ intro, className }: PageIntroProps) {
  if (intro === null) return null;

  if (intro === undefined) {
    return (
      <div className={cn(styles.skeleton, className)} aria-busy="true" aria-live="polite">
        <Skeleton height="var(--page-intro-line)" />
        <Skeleton height="var(--page-intro-line)" width="70%" />
      </div>
    );
  }

  return (
    <Text tone="muted" className={cn(styles.text, className)}>
      {intro}
    </Text>
  );
}
