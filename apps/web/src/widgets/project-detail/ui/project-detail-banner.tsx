import { ProjectBackground } from '@/entities/project';

import styles from './project-detail.module.css';

interface ProjectDetailBannerProps {
  readonly title: string;
  readonly subtitle: string;
  readonly color?: string | null;
}

/** Шапка проекта на градиентном фоне. */
export function ProjectDetailBanner({ title, subtitle, color }: ProjectDetailBannerProps) {
  return (
    <div className={styles.banner}>
      <ProjectBackground color={color} />
      <div className={styles.bannerBody}>
        <h1 className={styles.bannerTitle}>{title}</h1>
        <p className={styles.bannerSubtitle}>{subtitle}</p>
      </div>
    </div>
  );
}
