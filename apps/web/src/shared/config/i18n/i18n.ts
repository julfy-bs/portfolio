import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { defaultNamespace, fallbackLanguage, resources, supportedLanguages } from './resources';

/** Сюда же детектор i18next кэширует язык. */
export const languageStorageKey = 'portfolio.lang';

/**
 * Детектор сохраняет в `languageStorageKey` и автоопределённый язык, так что по нему не
 * понять, выбирал ли гость язык сам. Этот ключ ставится только при ручном переключении.
 */
export const languageChoiceKey = 'portfolio.lang.chosen';

/** Повторный вызов (Storybook, тесты) вернёт уже настроенный инстанс. */
export function setupI18n(): typeof i18n {
  if (i18n.isInitialized) {
    return i18n;
  }

  void i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      supportedLngs: [...supportedLanguages],
      fallbackLng: fallbackLanguage,
      defaultNS: defaultNamespace,
      detection: {
        order: ['localStorage', 'navigator'],
        lookupLocalStorage: languageStorageKey,
        caches: ['localStorage'],
      },
      interpolation: {
        // React и так экранирует значения.
        escapeValue: false,
      },
    });

  return i18n;
}

export { i18n };
