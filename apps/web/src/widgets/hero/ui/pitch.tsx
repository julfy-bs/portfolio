import { cn } from '@/shared/lib';
import { Skeleton, Text } from '@sutuzhko/ui-kit';

import styles from './hero.module.css';

/** Короткий `profile.headline`. Длинное био (`bioMarkdown`) показывает секция About. */
export function Pitch({ text }: { readonly text: string }) {
  return (
    <div className={styles.pitch}>
      <Text tone="muted">{text}</Text>
    </div>
  );
}

/** Три строки заглушек примерно совпадают по высоте с абзацем питча. */
export function PitchSkeleton() {
  return (
    <div className={cn(styles.pitch, styles.pitchSkeleton)}>
      <Skeleton width="100%" height="17px" />
      <Skeleton width="92%" height="17px" />
      <Skeleton width="58%" height="17px" />
    </div>
  );
}
