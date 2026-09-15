import type { ProjectListItem } from '@/entities/project';
import { ProjectTile, ProjectTileSkeleton } from '@/entities/project';

import { ProjectListEmpty } from './project-list-empty';
import styles from './project-list.module.css';

const SKELETON_COUNT = 6;

export interface ProjectListProps {
  readonly projects: readonly ProjectListItem[];
  readonly isLoading?: boolean;
  readonly onOpen: (slug: string) => void;
  /** Кнопка сброса в пустом состоянии. */
  readonly onClearFilters: () => void;
}

/** Сетка проектов. Фильтрует страница, сюда приходит уже готовый список. */
export function ProjectList({ projects, isLoading, onOpen, onClearFilters }: ProjectListProps) {
  if (isLoading) {
    return (
      <div className={styles.grid} aria-busy="true">
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <ProjectTileSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return <ProjectListEmpty onClear={onClearFilters} />;
  }

  return (
    <div className={styles.grid}>
      {projects.map((project) => (
        <ProjectTile key={project.slug} project={project} onOpen={() => onOpen(project.slug)} />
      ))}
    </div>
  );
}
