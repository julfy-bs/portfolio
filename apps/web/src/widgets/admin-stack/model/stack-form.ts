import type {
  CreateLanguage,
  LanguageAdmin,
  LocalizedText,
  UpdateLanguage,
} from '@/entities/language';
import type { CreateSkill, SkillAdmin } from '@/entities/skill';
import type { CreateTechnology, TechnologyAdmin } from '@/entities/technology';
import type { AppLanguage } from '@/shared/config';
import { planMinimalOrders } from '@/shared/lib';

/**
 * Модель вкладки «Стек и языки». Все правки живут в локальном состоянии и уходят одним
 * пакетом по «Сохранить», разницу считает контейнер.
 */

let counter = 0;
function nextKey(prefix: string): string {
  counter += 1;
  return `${prefix}-${counter}`;
}

// Технологии

/**
 * Отдельной сущности на бэке у категории нет, это просто поле `category` у технологии.
 * Поэтому держим локальный `key`: так переименование не рвёт связь с чипами.
 */
export interface TechCategory {
  readonly key: string;
  readonly name: string;
}

/**
 * `id: null` у ещё не сохранённого чипа. `order` берём с бэка (у новых 0, назначится при
 * сохранении): по нему считаем минимальный дифф, чтобы правка одного чипа не перенумеровывала все.
 */
export interface TechChip {
  readonly key: string;
  readonly id: string | null;
  readonly name: string;
  readonly categoryKey: string;
  readonly order: number;
}

/** Порядок категорий определяется первым появлением среди технологий. */
export function buildTechCategories(items: readonly TechnologyAdmin[]): TechCategory[] {
  const order: TechCategory[] = [];
  const seen = new Set<string>();
  for (const item of items) {
    const category = item.category ?? '';
    if (category !== '' && !seen.has(category)) {
      seen.add(category);
      order.push({ key: nextKey('cat'), name: category });
    }
  }
  return order;
}

export function buildTechChips(
  items: readonly TechnologyAdmin[],
  categories: readonly TechCategory[],
): TechChip[] {
  const keyByName = new Map(categories.map((category) => [category.name, category.key]));
  return items.map((item) => ({
    key: item.id,
    id: item.id,
    name: item.name,
    categoryKey: keyByName.get(item.category ?? '') ?? '',
    order: item.order,
  }));
}

/** По умолчанию без имени: его сразу вводят инлайн. */
export function newTechCategory(name = ''): TechCategory {
  return { key: nextKey('new-cat'), name };
}

export function newTechChip(categoryKey: string): TechChip {
  return { key: nextKey('new-tech'), id: null, name: '', categoryKey, order: 0 };
}

export function techChipToCreate(
  chip: TechChip,
  categoryName: string,
  order: number,
): CreateTechnology {
  return { name: chip.name.trim(), category: categoryName.trim() || undefined, order };
}

// Языки

/** `pct` хранится строкой, потому что напрямую связан с инпутом. */
export interface LangRow {
  readonly key: string;
  readonly id: string | null;
  readonly name: string;
  readonly level: string;
  readonly pct: string;
}

// Если перевода на en нет, показываем ru.
function pickName(name: LocalizedText, locale: AppLanguage): string {
  return locale === 'en' ? (name.en ?? name.ru) : name.ru;
}

export function buildLangRows(items: readonly LanguageAdmin[], locale: AppLanguage): LangRow[] {
  return items.map((item) => ({
    key: item.id,
    id: item.id,
    name: pickName(item.name, locale),
    level: item.level,
    pct: String(item.pct),
  }));
}

export function emptyLangRow(): LangRow {
  return { key: nextKey('new-lang'), id: null, name: '', level: '', pct: '' };
}

/** Из инпута может прийти что угодно, поэтому приводим к целому от 0 до 100. */
export function clampPct(value: string): number {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) return 0;
  return Math.max(0, Math.min(100, parsed));
}

// Бэк требует ru, поэтому при создании из en-локали дублируем значение в ru.
function nameInput(locale: AppLanguage, value: string): { ru: string; en?: string } {
  return locale === 'en' ? { ru: value, en: value } : { ru: value };
}

// UpdateLanguageDto.name заменяется целиком, так что вторую локаль переносим из текущего
// значения, иначе перевод потеряется.
function nameUpdate(
  current: LocalizedText,
  locale: AppLanguage,
  value: string,
): { ru: string; en?: string } {
  if (locale === 'en') return { ru: current.ru, en: value };
  return { ru: value, ...(current.en != null ? { en: current.en } : {}) };
}

export function rowToCreateLang(row: LangRow, locale: AppLanguage): CreateLanguage {
  return {
    name: nameInput(locale, row.name.trim()),
    level: row.level.trim() || 'A1',
    pct: clampPct(row.pct),
  };
}

export function rowToUpdateLang(
  row: LangRow,
  current: LanguageAdmin,
  locale: AppLanguage,
): UpdateLanguage {
  return {
    name: nameUpdate(current.name, locale, row.name.trim()),
    level: row.level.trim() || current.level,
    pct: clampPct(row.pct),
  };
}

// Навыки

/** `name` хранится в активной локали. */
export interface SkillChip {
  readonly key: string;
  readonly id: string | null;
  readonly name: string;
  readonly order: number;
}

export function buildSkillChips(items: readonly SkillAdmin[], locale: AppLanguage): SkillChip[] {
  return items.map((item) => ({
    key: item.id,
    id: item.id,
    name: pickName(item.name, locale),
    order: item.order,
  }));
}

export function newSkillChip(): SkillChip {
  return { key: nextKey('new-skill'), id: null, name: '', order: 0 };
}

export function skillChipToCreate(
  chip: SkillChip,
  locale: AppLanguage,
  order: number,
): CreateSkill {
  return { name: nameInput(locale, chip.name.trim()), order };
}

// Порядок

/** Технологии идут подряд по категориям, а внутри категории в порядке чипов. */
export function planTechOrders(
  categories: readonly TechCategory[],
  chips: readonly TechChip[],
): Map<string, number> {
  const seq: TechChip[] = [];
  for (const category of categories) {
    for (const chip of chips.filter((item) => item.categoryKey === category.key)) seq.push(chip);
  }
  return planMinimalOrders(seq);
}

export function planSkillOrders(skillChips: readonly SkillChip[]): Map<string, number> {
  return planMinimalOrders(skillChips);
}

// Счётчик изменений

function categoryNameOf(categories: readonly TechCategory[], categoryKey: string): string {
  return categories.find((category) => category.key === categoryKey)?.name.trim() ?? '';
}

/**
 * Считает ровно те изменения, что уйдут запросами при сохранении, по той же логике, что и
 * контейнер. Так счётчик в баре совпадает с числом запросов: удаление одного чипа даёт 1.
 */
export function countStackChanges(args: {
  readonly initialCategories: readonly TechCategory[];
  readonly initialChips: readonly TechChip[];
  readonly initialLangRows: readonly LangRow[];
  readonly initialSkillChips: readonly SkillChip[];
  readonly categories: readonly TechCategory[];
  readonly chips: readonly TechChip[];
  readonly langRows: readonly LangRow[];
  readonly skillChips: readonly SkillChip[];
  readonly deletedTechIds: readonly string[];
  readonly deletedLangIds: readonly string[];
  readonly deletedSkillIds: readonly string[];
}): number {
  const techPlan = planTechOrders(args.categories, args.chips);
  const initialCatName = new Map(
    args.initialChips.map((chip) => [
      chip.id,
      categoryNameOf(args.initialCategories, chip.categoryKey),
    ]),
  );

  let count = args.deletedTechIds.length + args.deletedLangIds.length + args.deletedSkillIds.length;

  for (const chip of args.chips) {
    const category = categoryNameOf(args.categories, chip.categoryKey);
    if (chip.id === null) {
      // Новая технология уйдёт в create только с непустым именем и в названной категории.
      if (chip.name.trim() !== '' && category !== '') count += 1;
      continue;
    }
    const categoryChanged = (initialCatName.get(chip.id) ?? '') !== category;
    const orderChanged = techPlan.get(chip.key) !== chip.order;
    if (categoryChanged || orderChanged) count += 1;
  }

  const initialLangById = new Map(args.initialLangRows.map((row) => [row.id, row]));
  for (const row of args.langRows) {
    if (row.id === null) {
      if (row.name.trim() !== '') count += 1;
      continue;
    }
    const initial = initialLangById.get(row.id);
    if (initial === undefined) {
      count += 1;
      continue;
    }
    if (initial.name !== row.name || initial.level !== row.level || initial.pct !== row.pct) {
      count += 1;
    }
  }

  const skillPlan = planSkillOrders(args.skillChips);
  const initialSkillById = new Map(args.initialSkillChips.map((chip) => [chip.id, chip]));
  for (const chip of args.skillChips) {
    if (chip.id === null) {
      if (chip.name.trim() !== '') count += 1;
      continue;
    }
    const initial = initialSkillById.get(chip.id);
    if (initial === undefined) {
      count += 1;
      continue;
    }
    if (initial.name !== chip.name || skillPlan.get(chip.key) !== chip.order) count += 1;
  }

  return count;
}
