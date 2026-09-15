import type { CreateTechnology, TechnologyAdmin, UpdateTechnology } from '@/entities/technology';

/**
 * Работает так же, как черновик участников: правки каталога копятся локально и уходят вместе
 * с проектом. Имя технологии не локализуется.
 */
export interface StagedTechnology extends TechnologyAdmin {
  readonly isNew: boolean;
  readonly isDeleted: boolean;
  readonly isEdited: boolean;
}

/** Имя обязательно, категория нет. */
export interface TechnologyDraft {
  readonly name: string;
  readonly category: string;
}

const TEMP_PREFIX = 'tmp-technology-';

export function isTempTechnologyId(id: string): boolean {
  return id.startsWith(TEMP_PREFIX);
}

function makeTempId(list: readonly StagedTechnology[]): string {
  let index = list.length + 1;
  while (list.some((entry) => entry.id === `${TEMP_PREFIX}${index}`)) index += 1;
  return `${TEMP_PREFIX}${index}`;
}

export function initTechStaged(technologies: readonly TechnologyAdmin[]): StagedTechnology[] {
  return technologies.map((technology) => ({
    ...technology,
    isNew: false,
    isDeleted: false,
    isEdited: false,
  }));
}

export function stageCreateTech(
  list: readonly StagedTechnology[],
  draft: TechnologyDraft,
): StagedTechnology[] {
  const entry: StagedTechnology = {
    id: makeTempId(list),
    name: draft.name,
    category: draft.category || null,
    order: list.length,
    isNew: true,
    isDeleted: false,
    isEdited: false,
  };
  return [...list, entry];
}

export function stageUpdateTech(
  list: readonly StagedTechnology[],
  id: string,
  draft: TechnologyDraft,
): StagedTechnology[] {
  return list.map((entry) =>
    entry.id === id
      ? {
          ...entry,
          name: draft.name,
          category: draft.category || null,
          isEdited: entry.isNew ? false : true,
        }
      : entry,
  );
}

/** Новую технологию просто выбрасываем, а существующую помечаем на удаление. */
export function stageDeleteTech(list: readonly StagedTechnology[], id: string): StagedTechnology[] {
  return list.flatMap((entry) => {
    if (entry.id !== id) return [entry];
    return entry.isNew ? [] : [{ ...entry, isDeleted: true }];
  });
}

export function visibleTechStaged(list: readonly StagedTechnology[]): StagedTechnology[] {
  return list.filter((entry) => !entry.isDeleted);
}

/** Для `formToTile` и мультиселекта флаги черновика не нужны. */
export function stagedToTechCatalog(list: readonly StagedTechnology[]): TechnologyAdmin[] {
  return visibleTechStaged(list).map(({ isNew: _n, isDeleted: _d, isEdited: _e, ...rest }) => rest);
}

export interface TechnologyStagingPlan {
  readonly creates: readonly StagedTechnology[];
  readonly updates: readonly StagedTechnology[];
  readonly deletes: readonly StagedTechnology[];
}

export function planTechnologyStaging(list: readonly StagedTechnology[]): TechnologyStagingPlan {
  return {
    creates: list.filter((entry) => entry.isNew && !entry.isDeleted),
    updates: list.filter((entry) => entry.isEdited && !entry.isNew && !entry.isDeleted),
    deletes: list.filter((entry) => entry.isDeleted && !entry.isNew),
  };
}

export function countTechnologyChanges(list: readonly StagedTechnology[]): number {
  const plan = planTechnologyStaging(list);
  return plan.creates.length + plan.updates.length + plan.deletes.length;
}

export function stagedToTechCreateBody(entry: StagedTechnology): CreateTechnology {
  return { name: entry.name, category: entry.category ?? undefined };
}

export function stagedToTechUpdateBody(entry: StagedTechnology): UpdateTechnology {
  return { name: entry.name, category: entry.category ?? undefined };
}
