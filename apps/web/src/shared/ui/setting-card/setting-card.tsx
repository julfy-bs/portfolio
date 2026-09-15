import type { ReactNode } from 'react';

import { Icon, type IconName } from '@sutuzhko/ui-kit';

import styles from './setting-card.module.css';

export interface SettingCardProps {
  readonly title: string;
  readonly description?: string;
  readonly icon?: IconName;
  /** Контрол справа: Toggle, Segmented и подобные. */
  readonly children: ReactNode;
}

// Рамка ограничивает ширину, иначе в широком контейнере контрол уезжает к дальнему краю.
export function SettingCard({ title, description, icon, children }: SettingCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.text}>
        {icon ? <Icon name={icon} size={17} className={styles.icon} /> : null}
        <div className={styles.body}>
          <span className={styles.title}>{title}</span>
          {description ? <span className={styles.description}>{description}</span> : null}
        </div>
      </div>
      <div className={styles.control}>{children}</div>
    </div>
  );
}
