export const LOCALES = ['ru', 'en'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'ru';

// ru обязателен, потому что на него откатываемся, когда перевода нет.
export interface LocalizedText {
  ru: string;
  en?: string;
}

export interface LocalizedList {
  ru: string[];
  en?: string[];
}
