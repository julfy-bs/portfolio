import { useCallback, useEffect, useMemo } from 'react';

import { useGetSettingsQuery } from '@/entities/settings';
import {
  languageChoiceKey,
  normalizeLanguage,
  supportedLanguages,
  type AppLanguage,
} from '@/shared/config';

import { useLanguage } from './use-language';

interface UseSiteLanguagesResult {
  readonly current: AppLanguage;
  /** Языки из настроек сайта, которые поддерживает платформа. */
  readonly available: readonly AppLanguage[];
  /** Явный выбор языка, запоминается. */
  readonly choose: (language: AppLanguage) => void;
  /** Следующий доступный язык, по кругу. */
  readonly cycleNext: () => void;
}

/**
 * Набор языков и язык по умолчанию задаёт владелец в кабинете. Если активный язык
 * недоступен, переключаем на дефолтный; гость без явного выбора тоже получает
 * дефолтный. Пока настройки не загрузились, ничего не трогаем.
 */
export function useSiteLanguages(): UseSiteLanguagesResult {
  const { current, change } = useLanguage();
  const { data } = useGetSettingsQuery();

  const available = useMemo<readonly AppLanguage[]>(() => {
    const configured = data?.availableLanguages;
    if (!configured) return supportedLanguages;
    // Контент есть только на языках платформы, поэтому пересекаем с ними и держим их
    // порядок. Если пересечение пустое, отдаём все языки, чтобы сайт не остался без языка.
    const list = supportedLanguages.filter((language) => configured.includes(language));
    return list.length > 0 ? list : supportedLanguages;
  }, [data?.availableLanguages]);

  const defaultLanguage = normalizeLanguage(data?.defaultLang);

  useEffect(() => {
    if (!data) return;
    const chosen = localStorage.getItem(languageChoiceKey) !== null;
    const desired = chosen ? current : defaultLanguage;
    const target = available.includes(desired)
      ? desired
      : available.includes(defaultLanguage)
        ? defaultLanguage
        : available[0];
    if (target && target !== current) change(target);
  }, [data, available, current, defaultLanguage, change]);

  const choose = useCallback(
    (language: AppLanguage) => {
      localStorage.setItem(languageChoiceKey, language);
      change(language);
    },
    [change],
  );

  const cycleNext = useCallback(() => {
    const index = available.indexOf(current);
    const next = available[(index + 1) % available.length];
    if (next) choose(next);
  }, [available, current, choose]);

  return { current, available, choose, cycleNext };
}
