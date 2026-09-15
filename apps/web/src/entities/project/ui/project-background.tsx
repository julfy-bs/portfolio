import { cn } from '@/shared/lib';

import styles from './project-background.module.css';

interface ProjectBackgroundProps {
  /** CSS-градиент или цвет. Без него фон нейтральный. */
  readonly color?: string | null;
  readonly className?: string;
}

/**
 * Декоративный фон плитки: заливка `tileColor`, диагональная штриховка, «орб» в углу и
 * затемняющий градиент. Вынесен отдельно, чтобы переиспользовать и проверять в историях.
 * Позиционируется абсолютно внутри relative-родителя и скрыт от screen reader.
 */
export function ProjectBackground({ color, className }: ProjectBackgroundProps) {
  return (
    <span
      className={cn(styles.background, className)}
      style={{ background: color || 'var(--color-raised)' }}
      aria-hidden="true"
    >
      <span className={styles.stripes} />
      <span className={styles.orb} />
      <span className={styles.shade} />
    </span>
  );
}
