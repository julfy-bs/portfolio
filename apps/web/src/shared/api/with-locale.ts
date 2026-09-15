import type { AppLanguage } from '@/shared/config';

import type { AxiosBaseQueryArgs } from './axios-base-query';

/**
 * По `Accept-Language` бэкенд выбирает язык ответа. Язык при этом входит в аргументы
 * эндпоинта, так что у каждой локали свой кэш, и при смене языка данные перезапрашиваются.
 */
export function withLocale(
  language: AppLanguage,
  args: Omit<AxiosBaseQueryArgs, 'headers'>,
): AxiosBaseQueryArgs {
  return { ...args, headers: { 'Accept-Language': language } };
}
