import type { TFunction } from 'i18next';
import { z } from 'zod';

import type {
  AvailabilityStatus,
  LocalizedText,
  LocalizedTextInput,
  ProfileAdmin,
  ProfileHighlightInput,
  UpdateProfile,
} from '@/entities/profile';
import type { AppLanguage } from '@/shared/config';

/** В этом порядке показываются карточки статуса. */
export const AVAILABILITY_OPTIONS: readonly AvailabilityStatus[] = ['ACTIVE', 'OPEN', 'NOTLOOKING'];

/** Та же палитра, что у плиток проектов. */
export const AVATAR_COLORS: readonly string[] = [
  '#238636',
  '#3c97e8',
  '#866cc7',
  '#d9a528',
  '#e0533d',
  '#16a394',
  '#5b6470',
];

/**
 * Локализованные поля правятся в активной локали приложения. Обязательны они только для
 * `ru`: перевода на en может и не быть. Схема собирается от `t`, потому что сообщения
 * об ошибках тоже переводятся.
 */
export function createProfileSchema(t: TFunction, locale: AppLanguage) {
  const requiredForBase = (message: string) =>
    locale === 'ru' ? z.string().trim().min(1, message) : z.string();

  return z.object({
    name: requiredForBase(t('admin.profile.errors.name')),
    projectsIntro: z.string(),
    experienceIntro: z.string(),
    contactIntro: z.string(),
    // Бэкенд перезаписывает highlights целым массивом и не мёржит элементы, поэтому
    // вторую локаль носим в `labelOther`, иначе правка на одном языке затрёт перевод.
    highlights: z.array(
      z.object({
        value: z.string(),
        label: z.string(),
        labelOther: z.string(),
      }),
    ),
    email: z
      .string()
      .trim()
      .min(1, t('admin.profile.errors.email'))
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, t('admin.profile.errors.email')),
    avatarPhotoUrl: z.string(),
    avatarColor: z.string(),
    cvUrl: z.string(),
    telegram: z.string().trim().min(1, t('admin.profile.errors.telegram')),
    github: z.string(),
    availability: z.enum(['ACTIVE', 'OPEN', 'NOTLOOKING']),
    isBioHidden: z.boolean(),
    roleTitle: requiredForBase(t('admin.profile.errors.role')),
    location: z.string(),
    headline: z.string(),
    bioMarkdown: requiredForBase(t('admin.profile.errors.bio')),
    heroStack: z.string(),
  });
}

export type ProfileFormValues = z.infer<ReturnType<typeof createProfileSchema>>;

// Без перевода на en показываем ru.
function pick(text: LocalizedText | null | undefined, locale: AppLanguage): string {
  if (!text) return '';
  return (locale === 'en' ? text.en : text.ru) ?? text.ru ?? '';
}

// Здесь фолбэка нет, иначе ru скопируется в en при следующем сохранении.
function pickOther(text: LocalizedText | null | undefined, locale: AppLanguage): string {
  if (!text) return '';
  return (locale === 'en' ? text.ru : text.en) ?? '';
}

/**
 * Бэк требует `ru`. Если показатель новый и введён на en, ru ещё пуст, и мы подставляем
 * туда то же значение, чтобы пройти валидацию.
 */
function buildHighlightLabel(
  locale: AppLanguage,
  active: string,
  other: string,
): LocalizedTextInput {
  if (locale === 'en') {
    return { ru: other || active, en: active };
  }
  return other ? { ru: active, en: other } : { ru: active };
}

// Шлём только активный язык, второй бэк сохранит сам при мёрже.
function localePatch(locale: AppLanguage, value: string): { ru?: string; en?: string } {
  return locale === 'en' ? { en: value } : { ru: value };
}

function findContactUrl(contacts: ProfileAdmin['contacts'], icon: string): string {
  return contacts.find((contact) => contact.icon === icon)?.url ?? '';
}

export function profileToForm(profile: ProfileAdmin, locale: AppLanguage): ProfileFormValues {
  return {
    name: pick(profile.name, locale),
    email: profile.email,
    avatarPhotoUrl: profile.avatarPhotoUrl ?? '',
    avatarColor: profile.avatarColor ?? '#238636',
    cvUrl: pick(profile.cvUrl, locale),
    telegram: findContactUrl(profile.contacts, 'telegram'),
    github: findContactUrl(profile.contacts, 'github'),
    availability: profile.availability,
    isBioHidden: profile.isBioHidden,
    roleTitle: pick(profile.roleTitle, locale),
    location: pick(profile.location, locale),
    headline: pick(profile.headline, locale),
    bioMarkdown: pick(profile.bioMarkdown, locale),
    heroStack: profile.heroStack.join(', '),
    projectsIntro: pick(profile.projectsIntro, locale),
    experienceIntro: pick(profile.experienceIntro, locale),
    contactIntro: pick(profile.contactIntro, locale),
    highlights: profile.highlights.map((highlight) => ({
      value: highlight.value,
      label: pick(highlight.label, locale),
      labelOther: pickOther(highlight.label, locale),
    })),
  };
}

export function formToUpdate(values: ProfileFormValues, locale: AppLanguage): UpdateProfile {
  return {
    name: localePatch(locale, values.name.trim()),
    email: values.email.trim(),
    avatarPhotoUrl: values.avatarPhotoUrl,
    avatarColor: values.avatarColor,
    cvUrl: localePatch(locale, values.cvUrl.trim()),
    availability: values.availability,
    isBioHidden: values.isBioHidden,
    roleTitle: localePatch(locale, values.roleTitle.trim()),
    location: localePatch(locale, values.location.trim()),
    headline: localePatch(locale, values.headline.trim()),
    bioMarkdown: localePatch(locale, values.bioMarkdown.trim()),
    heroStack: values.heroStack
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean),
    projectsIntro: localePatch(locale, values.projectsIntro.trim()),
    experienceIntro: localePatch(locale, values.experienceIntro.trim()),
    contactIntro: localePatch(locale, values.contactIntro.trim()),
    // Показатель без значения не нужен. Подпись собираем из обеих локалей, чтобы не
    // потерять перевод.
    highlights: values.highlights
      .filter((highlight) => highlight.value.trim() !== '')
      .map<ProfileHighlightInput>((highlight) => ({
        value: highlight.value.trim(),
        label: buildHighlightLabel(locale, highlight.label.trim(), highlight.labelOther.trim()),
      })),
  };
}
