import type {
  ContributorAdmin,
  CreateContributor,
  UpdateContributor,
} from '@/entities/contributor';
import type { AppLanguage } from '@/shared/config';
import { planMinimalOrders } from '@/shared/lib';

import type { ContributorDraft } from '../ui/contributor-form';

/**
 * Все правки каталога участников, включая перестановку, копятся локально и применяются
 * вместе с сохранением проекта, чтобы их можно было откатить отменой. Порядок черновика
 * и есть желаемый порядок каталога.
 */
export interface StagedContributor extends ContributorAdmin {
  /** Реальный id придёт с бэка только после сохранения. */
  readonly isNew: boolean;
  /** Существующего удалим запросом, а нового просто выбросим из списка. */
  readonly isDeleted: boolean;
  readonly isEdited: boolean;
}

const TEMP_PREFIX = 'tmp-contributor-';

export function isTempContributorId(id: string): boolean {
  return id.startsWith(TEMP_PREFIX);
}

// Без случайности: id зависит только от текущего списка.
function makeTempId(list: readonly StagedContributor[]): string {
  let index = list.length + 1;
  while (list.some((entry) => entry.id === `${TEMP_PREFIX}${index}`)) index += 1;
  return `${TEMP_PREFIX}${index}`;
}

export function initStaged(contributors: readonly ContributorAdmin[]): StagedContributor[] {
  return contributors.map((contributor) => ({
    ...contributor,
    isNew: false,
    isDeleted: false,
    isEdited: false,
  }));
}

// Вторую локаль не трогаем, чтобы не потерять перевод.
function applyName(
  name: ContributorAdmin['name'],
  locale: AppLanguage,
  value: string,
): ContributorAdmin['name'] {
  return locale === 'ru' ? { ...name, ru: value } : { ru: name.ru, en: value };
}

export function stageCreate(
  list: readonly StagedContributor[],
  draft: ContributorDraft,
  locale: AppLanguage,
): StagedContributor[] {
  // ru обязателен на бэке: при вводе в EN дублируем значение в ru.
  const name: ContributorAdmin['name'] =
    locale === 'ru' ? { ru: draft.name, en: null } : { ru: draft.name, en: draft.name };
  const entry: StagedContributor = {
    id: makeTempId(list),
    name,
    image: draft.image || null,
    color: draft.color || null,
    link: draft.link || null,
    // Позицию нового участника назначит план на сохранении (между соседями).
    order: 0,
    isNew: true,
    isDeleted: false,
    isEdited: false,
  };
  return [...list, entry];
}

export function stageUpdate(
  list: readonly StagedContributor[],
  id: string,
  draft: ContributorDraft,
  locale: AppLanguage,
): StagedContributor[] {
  return list.map((entry) =>
    entry.id === id
      ? {
          ...entry,
          name: applyName(entry.name, locale, draft.name),
          color: draft.color || null,
          image: draft.image || null,
          link: draft.link || null,
          isEdited: entry.isNew ? false : true,
        }
      : entry,
  );
}

export function stageDelete(list: readonly StagedContributor[], id: string): StagedContributor[] {
  return list.flatMap((entry) => {
    if (entry.id !== id) return [entry];
    return entry.isNew ? [] : [{ ...entry, isDeleted: true }];
  });
}

/** Меняем только последовательность, сами значения `order` посчитаются при сохранении. */
export function stageReorder(
  list: readonly StagedContributor[],
  activeId: string,
  overId: string,
): StagedContributor[] {
  const from = list.findIndex((entry) => entry.id === activeId);
  const to = list.findIndex((entry) => entry.id === overId);
  const next = [...list];
  if (from === -1 || to === -1 || from === to) return next;
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

export function visibleStaged(list: readonly StagedContributor[]): StagedContributor[] {
  return list.filter((entry) => !entry.isDeleted);
}

/** Для `formToTile` и мультиселекта флаги черновика не нужны. */
export function stagedToCatalog(list: readonly StagedContributor[]): ContributorAdmin[] {
  return visibleStaged(list).map(({ isNew: _n, isDeleted: _d, isEdited: _e, ...rest }) => rest);
}

export interface PlannedContributor {
  readonly entry: StagedContributor;
  readonly order: number;
}

export interface ContributorStagingPlan {
  readonly creates: readonly PlannedContributor[];
  /** Сюда попадают и правки полей, и сдвиги перетаскиванием. */
  readonly updates: readonly PlannedContributor[];
  readonly deletes: readonly StagedContributor[];
}

/**
 * Позиции считаются минимальным диффом, как у технологий: участники с ненарушенным порядком
 * остаются на месте, а сдвинутые и новые получают дробную позицию между соседями. Перенос
 * одного участника стоит одного PATCH.
 */
export function planContributorStaging(list: readonly StagedContributor[]): ContributorStagingPlan {
  const visible = visibleStaged(list);
  const orders = planMinimalOrders(
    visible.map((entry) => ({
      key: entry.id,
      id: entry.isNew ? null : entry.id,
      order: entry.order,
    })),
  );
  const planned = visible.map((entry) => ({ entry, order: orders.get(entry.id) ?? entry.order }));
  return {
    creates: planned.filter(({ entry }) => entry.isNew),
    updates: planned.filter(
      ({ entry, order }) => !entry.isNew && (entry.isEdited || order !== entry.order),
    ),
    deletes: list.filter((entry) => entry.isDeleted && !entry.isNew),
  };
}

export function countContributorChanges(list: readonly StagedContributor[]): number {
  const plan = planContributorStaging(list);
  return plan.creates.length + plan.updates.length + plan.deletes.length;
}

// Пустой en не отправляем вовсе.
function toNameInput(name: ContributorAdmin['name']): CreateContributor['name'] {
  return name.en ? { ru: name.ru, en: name.en } : { ru: name.ru };
}

export function stagedToCreateBody({ entry, order }: PlannedContributor): CreateContributor {
  return {
    name: toNameInput(entry.name),
    color: entry.color ?? undefined,
    image: entry.image ?? undefined,
    link: entry.link ?? undefined,
    order,
  };
}

/** Если участника только перетащили, в PATCH уходит один `order`, без остальных полей. */
export function stagedToUpdateBody({ entry, order }: PlannedContributor): UpdateContributor {
  const orderPatch = order === entry.order ? {} : { order };
  if (!entry.isEdited) return orderPatch;
  return {
    name: toNameInput(entry.name),
    // Сброшенный цвет шлём пустой строкой, бэк превратит её в null. undefined значил бы
    // "не менять".
    color: entry.color ?? '',
    image: entry.image ?? undefined,
    link: entry.link ?? undefined,
    ...orderPatch,
  };
}
