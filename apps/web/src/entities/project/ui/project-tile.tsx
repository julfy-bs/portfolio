import { Skeleton } from '@sutuzhko/ui-kit';

import type { ProjectListItem } from '../model/types';

import { ProjectAvatars } from './project-avatars';
import { ProjectBackground } from './project-background';
import { ProjectCategory } from './project-category';
import { ProjectTags } from './project-tags';
import styles from './project-tile.module.css';

/**
 * Подмножество `ProjectListItem` без `slug`, чтобы плитку можно было кормить черновиком формы
 * из кабинета, а не только ответом API.
 */
export type ProjectTileData = Pick<
  ProjectListItem,
  | 'title'
  | 'description'
  | 'category'
  | 'period'
  | 'tileColor'
  | 'runnable'
  | 'runCommand'
  | 'contributors'
  | 'technologies'
>;

interface ProjectTileProps {
  readonly project: ProjectTileData;
  /** Если передан, плитка кликабельна (`button`), иначе статична (`div`). */
  readonly onOpen?: () => void;
}

/**
 * Не знает, откуда данные: в публичном списке это ответ API, в кабинете живой черновик
 * формы, так что вёрстка карточки живёт в одном месте. Внутри только phrasing-элементы
 * (`span`), чтобы плитку можно было обернуть в `<button>` без невалидной вложенности.
 */
export function ProjectTile({ project, onOpen }: ProjectTileProps) {
  const content = (
    <>
      <ProjectBackground color={project.tileColor} />
      <span className={styles.body}>
        <span className={styles.top}>
          {project.category ? <ProjectCategory category={project.category} /> : null}
          {project.period ? <span className={styles.year}>{project.period}</span> : null}
        </span>
        <span className={styles.title}>{project.title}</span>
        <span className={styles.subtitle}>{project.description}</span>
        {project.runnable && project.runCommand ? (
          <span className={styles.run}>
            <span aria-hidden="true">▶</span> {project.runCommand}
          </span>
        ) : null}
        <span className={styles.footer}>
          <ProjectAvatars people={project.contributors} />
          <ProjectTags tags={project.technologies} />
        </span>
      </span>
    </>
  );

  if (onOpen === undefined) {
    return <div className={styles.card}>{content}</div>;
  }

  return (
    <button type="button" className={styles.card} onClick={onOpen}>
      {content}
    </button>
  );
}

/** Скелетон плитки: держит место в сетке, пока проекты грузятся. */
export function ProjectTileSkeleton() {
  return <Skeleton className={styles.card} height="220px" radius="var(--radius-panel)" />;
}
