import en from './locales/en/translation.json';
import ru from './locales/ru/translation.json';

export const supportedLanguages = ['ru', 'en'] as const;

export type AppLanguage = (typeof supportedLanguages)[number];

/** Недостающие ключи в других локалях берутся из русской. */
export const fallbackLanguage: AppLanguage = 'ru';

export const defaultNamespace = 'translation' as const;

export const resources = {
  ru: { translation: ru },
  en: { translation: en },
} as const;

// В CustomTypeOptions не подключаем: с i18next@26 ключи t() без префикса неймспейса
// выводятся в never, а писать префикс в каждом вызове не хочется.
export type AppResources = (typeof resources)['ru'];
