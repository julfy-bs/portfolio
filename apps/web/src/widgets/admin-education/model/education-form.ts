import type {
  CreateEducation,
  EducationAdmin,
  EducationType,
  UpdateEducation,
} from '@/entities/education';
import type { AppLanguage } from '@/shared/config';
import { isoToMonthInput, monthInputToIso } from '@/shared/lib';

/**
 * `id: null` у новой записи. Даты хранятся как значения `<input type="month">` в формате
 * YYYY-MM, пустая строка значит, что дата не задана.
 */
export interface EducationRow {
  readonly key: string;
  readonly id: string | null;
  readonly type: EducationType;
  readonly degree: string;
  readonly place: string;
  readonly startMonth: string;
  readonly endMonth: string;
}

const ERROR_KEYS = {
  startRequired: 'admin.education.errors.startRequired',
  endBeforeStart: 'admin.education.errors.endBeforeStart',
} as const;

export type EducationErrorKey = (typeof ERROR_KEYS)[keyof typeof ERROR_KEYS];

export interface EducationRowErrors {
  readonly startMonth?: EducationErrorKey;
  readonly endMonth?: EducationErrorKey;
}

// Без перевода на en показываем ru.
function pick(text: EducationAdmin['degree'] | null, locale: AppLanguage): string {
  if (!text) return '';
  return (locale === 'en' ? text.en : text.ru) ?? text.ru ?? '';
}

// Публичная часть откатывается на ru, поэтому при создании из en-локали дублируем значение в ru.
function localeInput(locale: AppLanguage, value: string): { ru: string; en?: string } {
  return locale === 'en' ? { ru: value, en: value } : { ru: value };
}

// Шлём только активный язык, второй бэк сохранит сам при мёрже.
function localePatch(locale: AppLanguage, value: string): { ru?: string; en?: string } {
  return locale === 'en' ? { en: value } : { ru: value };
}

let counter = 0;

/** У новой строки ещё нет id, поэтому нужен локальный ключ. */
export function newRowKey(): string {
  counter += 1;
  return `new-${counter}`;
}

export function emptyRow(type: EducationType): EducationRow {
  return { key: newRowKey(), id: null, type, degree: '', place: '', startMonth: '', endMonth: '' };
}

export function buildRows(items: readonly EducationAdmin[], locale: AppLanguage): EducationRow[] {
  return items.map((item) => ({
    key: item.id,
    id: item.id,
    type: item.type,
    degree: pick(item.degree, locale),
    place: pick(item.place, locale),
    startMonth: isoToMonthInput(item.startDate),
    endMonth: isoToMonthInput(item.endDate),
  }));
}

/** Новая строка без названия на сохранение не уходит. */
export function isSubmittable(row: EducationRow): boolean {
  return row.id !== null || row.degree.trim() !== '';
}

/**
 * Дата начала обязательна, потому что по ней сортируется таймлайн. Даты в формате YYYY-MM
 * можно сравнивать как строки. Пустую новую строку не проверяем, она всё равно не сохранится.
 */
export function validateRow(row: EducationRow): EducationRowErrors {
  if (!isSubmittable(row)) return {};
  if (row.startMonth === '') return { startMonth: ERROR_KEYS.startRequired };
  if (row.endMonth !== '' && row.endMonth < row.startMonth) {
    return { endMonth: ERROR_KEYS.endBeforeStart };
  }
  return {};
}

export function hasRowErrors(row: EducationRow): boolean {
  const errors = validateRow(row);
  return errors.startMonth !== undefined || errors.endMonth !== undefined;
}

export function rowToCreate(row: EducationRow, locale: AppLanguage): CreateEducation {
  const place = row.place.trim();
  return {
    type: row.type,
    degree: localeInput(locale, row.degree.trim()),
    place: place ? localeInput(locale, place) : undefined,
    startDate: monthInputToIso(row.startMonth),
    endDate: row.endMonth ? monthInputToIso(row.endMonth) : undefined,
  };
}

export function rowToUpdate(row: EducationRow, locale: AppLanguage): UpdateEducation {
  return {
    type: row.type,
    degree: localePatch(locale, row.degree.trim()),
    place: localePatch(locale, row.place.trim()),
    startDate: monthInputToIso(row.startMonth),
    // Пустое окончание отправляем как null: дата снимается, а не остаётся прежней.
    endDate: row.endMonth ? monthInputToIso(row.endMonth) : null,
  };
}
