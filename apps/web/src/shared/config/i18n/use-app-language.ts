import { useTranslation } from 'react-i18next';

import { fallbackLanguage, supportedLanguages, type AppLanguage } from './resources';

/** Всё, что не входит в поддерживаемые языки, превращается в язык по умолчанию. */
export function normalizeLanguage(language: string | undefined): AppLanguage {
  return supportedLanguages.find((lng) => lng === language) ?? fallbackLanguage;
}

/** Отсюда берут язык и подписи UI, и запросы к API, чтобы они не разошлись. */
export function useAppLanguage(): AppLanguage {
  const { i18n } = useTranslation();
  return normalizeLanguage(i18n.resolvedLanguage);
}
