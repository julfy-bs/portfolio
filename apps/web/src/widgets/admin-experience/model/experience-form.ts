import type { TFunction } from 'i18next';
import { z } from 'zod';

import type { CreateExperience, ExperienceAdmin, UpdateExperience } from '@/entities/experience';
import type { AppLanguage } from '@/shared/config';
import { isoToMonthInput, monthInputToIso } from '@/shared/lib';

/**
 * Локализованные поля правятся в активной локали и обязательны только для `ru`. Компания и
 * дата начала не локализуются, поэтому обязательны всегда. Схема зависит от `t`, чтобы
 * сообщения об ошибках переводились.
 */
export function createExperienceSchema(t: TFunction, locale: AppLanguage) {
  const requiredForBase = (message: string) =>
    locale === 'ru' ? z.string().trim().min(1, message) : z.string();

  return z.object({
    company: z.string().trim().min(1, t('admin.experience.errors.company')),
    role: requiredForBase(t('admin.experience.errors.role')),
    location: z.string(),
    startDate: z.string().trim().min(1, t('admin.experience.errors.startDate')),
    endDate: z.string(),
    current: z.boolean(),
    bullets: z.string(),
    technologyIds: z.array(z.string()),
  });
}

export type ExperienceFormValues = z.infer<ReturnType<typeof createExperienceSchema>>;

/** Если перевода на en нет, возвращает ru. */
export function pickText(text: ExperienceAdmin['role'] | null, locale: AppLanguage): string {
  if (!text) return '';
  return (locale === 'en' ? text.en : text.ru) ?? text.ru ?? '';
}

function pickList(list: ExperienceAdmin['bullets'], locale: AppLanguage): string[] {
  return (locale === 'en' ? list.en : list.ru) ?? list.ru;
}

// В textarea каждый пункт на своей строке, пустые строки отбрасываем.
function toBullets(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

// Публичная часть откатывается на ru, поэтому при создании из en-локали дублируем значение в ru.
function localeInput(locale: AppLanguage, value: string): { ru: string; en?: string } {
  return locale === 'en' ? { ru: value, en: value } : { ru: value };
}

function localeListInput(locale: AppLanguage, value: string[]): { ru: string[]; en?: string[] } {
  return locale === 'en' ? { ru: value, en: value } : { ru: value };
}

// Шлём только активный язык, второй бэк сохранит сам при мёрже.
function localePatch(locale: AppLanguage, value: string): { ru?: string; en?: string } {
  return locale === 'en' ? { en: value } : { ru: value };
}

function localeListPatch(locale: AppLanguage, value: string[]): { ru?: string[]; en?: string[] } {
  return locale === 'en' ? { en: value } : { ru: value };
}

export function emptyForm(): ExperienceFormValues {
  return {
    company: '',
    role: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    bullets: '',
    technologyIds: [],
  };
}

export function experienceToForm(
  record: ExperienceAdmin,
  locale: AppLanguage,
): ExperienceFormValues {
  return {
    company: record.company,
    role: pickText(record.role, locale),
    location: pickText(record.location, locale),
    startDate: isoToMonthInput(record.startDate),
    endDate: isoToMonthInput(record.endDate),
    current: record.current,
    bullets: pickList(record.bullets, locale).join('\n'),
    technologyIds: [...record.technologyIds],
  };
}

export function formToCreate(values: ExperienceFormValues, locale: AppLanguage): CreateExperience {
  const location = values.location.trim();
  return {
    company: values.company.trim(),
    role: localeInput(locale, values.role.trim()),
    location: location ? localeInput(locale, location) : undefined,
    bullets: localeListInput(locale, toBullets(values.bullets)),
    startDate: monthInputToIso(values.startDate),
    endDate: values.current || !values.endDate ? undefined : monthInputToIso(values.endDate),
    current: values.current,
    technologyIds: values.technologyIds,
  };
}

export function formToUpdate(values: ExperienceFormValues, locale: AppLanguage): UpdateExperience {
  const update: UpdateExperience = {
    company: values.company.trim(),
    role: localePatch(locale, values.role.trim()),
    location: localePatch(locale, values.location.trim()),
    bullets: localeListPatch(locale, toBullets(values.bullets)),
    startDate: monthInputToIso(values.startDate),
    current: values.current,
    technologyIds: values.technologyIds,
  };
  // Обнулить endDate через DTO нельзя. Для текущего места работы поле просто не шлём:
  // «по настоящее время» показывается по флагу current.
  if (!values.current && values.endDate) update.endDate = monthInputToIso(values.endDate);
  return update;
}
