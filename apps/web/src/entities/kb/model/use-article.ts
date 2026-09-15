import { skipToken } from '@reduxjs/toolkit/query';

import { useAppLanguage } from '@/shared/config';

import { useGetArticleQuery } from '../api/kb-api';

/**
 * Статья по slug в текущей локали. Пока ничего не выбрано, запрос не уходит (`skipToken`),
 * и читатель видит пустое состояние.
 */
export function useArticle(slug: string | undefined) {
  const language = useAppLanguage();
  return useGetArticleQuery(slug === undefined ? skipToken : { slug, language });
}
