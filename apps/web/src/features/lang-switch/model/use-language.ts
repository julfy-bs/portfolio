import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { normalizeLanguage, type AppLanguage } from '@/shared/config';

interface UseLanguageResult {
  readonly current: AppLanguage;
  readonly change: (language: AppLanguage) => void;
}

/**
 * Только чтение и смена языка в i18next. Какие языки доступны и какой из них по
 * умолчанию, решает `useSiteLanguages`.
 */
export function useLanguage(): UseLanguageResult {
  const { i18n } = useTranslation();
  const current = normalizeLanguage(i18n.resolvedLanguage);

  const change = useCallback(
    (language: AppLanguage) => {
      void i18n.changeLanguage(language);
    },
    [i18n],
  );

  return { current, change };
}
