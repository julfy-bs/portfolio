import type { ReactNode } from 'react';

import styles from './admin-kb.module.css';

export interface AdminKbViewProps {
  readonly library: ReactNode;
  readonly main: ReactNode;
}

/** Библиотека слева, статья или редактор справа. */
export function AdminKbView({ library, main }: AdminKbViewProps) {
  return (
    <div className={styles.grid}>
      {library}
      {main}
    </div>
  );
}
