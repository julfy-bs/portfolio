import type { Technology } from '@/entities/technology';

export interface StackGroup {
  /** Frontend, Backend или Tooling. */
  readonly group: string;
  readonly items: readonly string[];
}

/**
 * Группы идут в порядке первого появления категории. Технологии без категории
 * пропускаются.
 */
export function groupTechnologies(technologies: readonly Technology[]): StackGroup[] {
  const groups = new Map<string, string[]>();
  for (const tech of technologies) {
    if (tech.category === null || tech.category === '') {
      continue;
    }
    const items = groups.get(tech.category) ?? [];
    items.push(tech.name);
    groups.set(tech.category, items);
  }
  return [...groups.entries()].map(([group, items]) => ({ group, items }));
}
