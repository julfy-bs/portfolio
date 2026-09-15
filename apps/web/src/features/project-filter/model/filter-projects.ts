import type { ProjectListItem } from '@/entities/project';

import type { ProjectFilterState } from './types';

export const EMPTY_FILTER: ProjectFilterState = { query: '', techs: [], contributors: [] };

export function hasActiveFilters(state: ProjectFilterState): boolean {
  return state.query.trim() !== '' || state.techs.length > 0 || state.contributors.length > 0;
}

/**
 * Внутри фасета условия работают как ИЛИ, между фасетами и поиском как И.
 * Пустой фасет ничего не ограничивает.
 */
export function filterProjects(
  projects: readonly ProjectListItem[],
  state: ProjectFilterState,
): readonly ProjectListItem[] {
  const query = state.query.trim().toLowerCase();

  return projects.filter((project) => {
    const matchesQuery =
      query === '' ||
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query);

    const matchesTechs =
      state.techs.length === 0 || state.techs.some((tech) => project.technologies.includes(tech));

    const matchesContributors =
      state.contributors.length === 0 ||
      state.contributors.some((name) =>
        project.contributors.some((contributor) => contributor.name === name),
      );

    return matchesQuery && matchesTechs && matchesContributors;
  });
}
