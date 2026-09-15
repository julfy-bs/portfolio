import type { ProjectListItem } from '@/entities/project';

export type ProjectSortKey = 'default' | 'name' | 'newest';

export const PROJECT_SORT_KEYS: readonly ProjectSortKey[] = ['default', 'name', 'newest'];

/** Первый год из периода вроде «2021» или «2023-2024», по нему сортируем по свежести. */
function periodYear(period: string | null): number {
  const match = period?.match(/\d{4}/);
  return match ? Number(match[0]) : 0;
}

/**
 * `default` оставляет порядок с сервера: сначала избранные, затем по `order`.
 * Входной массив не мутирует.
 */
export function sortProjects(
  projects: readonly ProjectListItem[],
  key: ProjectSortKey,
): readonly ProjectListItem[] {
  if (key === 'default') return projects;
  const sorted = [...projects];
  if (key === 'name') {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    sorted.sort((a, b) => periodYear(b.period) - periodYear(a.period));
  }
  return sorted;
}
