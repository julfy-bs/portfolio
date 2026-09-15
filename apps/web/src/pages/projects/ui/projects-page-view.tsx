import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { ProjectListItem } from '@/entities/project';
import { ProjectFilterBar, useProjectFilter } from '@/features/project-filter';
import { useReveal } from '@/shared/lib';
import { Pagination } from '@/shared/ui';
import { ErrorState, Heading, Icon, PageIntro } from '@sutuzhko/ui-kit';
import { ProjectList } from '@/widgets/project-list';

import styles from './projects-page.module.css';

const noop = () => undefined;

// Пагинация появляется, когда проектов больше 12: сетка по 3 в ряд, 4 ряда на страницу.
const PAGE_SIZE = 12;

export interface ProjectsPageViewProps {
  readonly projects?: readonly ProjectListItem[];
  /** Интро-абзац, поле профиля с сервера. */
  readonly intro?: string | null;
  readonly isLoading?: boolean;
  readonly isError?: boolean;
  readonly onBack?: () => void;
  readonly onOpenProject?: (slug: string) => void;
  readonly onRetry?: () => void;
}

export function ProjectsPageView({
  projects,
  intro,
  isLoading,
  isError,
  onBack = noop,
  onOpenProject = noop,
  onRetry = noop,
}: ProjectsPageViewProps) {
  const { t } = useTranslation();
  const filter = useProjectFilter(projects ?? []);
  const revealRef = useReveal();

  const total = filter.filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const [page, setPage] = useState(1);

  // Смена фильтра, сортировки или набора возвращает на первую страницу.
  useEffect(() => {
    setPage(1);
  }, [filter.state, filter.sortKey]);

  // Если после фильтрации страниц стало меньше, не остаёмся на пустой странице.
  useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [page, pageCount]);

  const visible = useMemo(
    () => filter.filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filter.filtered, page],
  );

  if (isError) {
    return (
      <main id="main" className={styles.page}>
        <ErrorState
          message={t('projects.error')}
          retryLabel={t('projects.retry')}
          onRetry={onRetry}
        />
      </main>
    );
  }

  return (
    <main id="main" className={styles.page} ref={revealRef}>
      <button type="button" className={styles.back} onClick={onBack}>
        <Icon name="arrow-right" size={14} className={styles.backIcon} />
        {t('projects.back')}
      </button>

      <div className={styles.breadcrumb}>{t('projects.breadcrumb')}</div>
      <Heading level="h1" className={styles.title}>
        {t('projects.title')}
      </Heading>
      {/* Скелетон только при intro === undefined. Профиль обычно уже в кэше (его
          запрашивает футер), так что текст виден сразу и не мигает, пока грузится список. */}
      <PageIntro intro={intro} />

      <div className={styles.filter}>
        <ProjectFilterBar filter={filter} isLoading={isLoading} />
      </div>

      {!isLoading ? (
        <p className={styles.count}>
          {t('projects.results.found')}{' '}
          <span className={styles.countValue}>{filter.filtered.length}</span>
        </p>
      ) : null}

      <ProjectList
        projects={visible}
        isLoading={isLoading}
        onOpen={onOpenProject}
        onClearFilters={filter.clear}
      />

      {!isLoading ? (
        <Pagination
          page={page}
          pageCount={pageCount}
          onChange={setPage}
          ariaLabel={t('projects.pagination.label')}
          prevLabel={t('projects.pagination.prev')}
          nextLabel={t('projects.pagination.next')}
        />
      ) : null}
    </main>
  );
}
