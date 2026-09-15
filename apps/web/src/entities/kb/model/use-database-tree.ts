import { useAppLanguage } from '@/shared/config';

import { useGetDatabaseTreeQuery } from '../api/kb-api';

/**
 * Дерево базы знаний в текущей локали. Кэш разделён по языку, так что при смене языка
 * данные перезапрашиваются сами.
 */
export function useDatabaseTree() {
  const language = useAppLanguage();
  return useGetDatabaseTreeQuery(language);
}
