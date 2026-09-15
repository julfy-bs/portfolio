import { useAppLanguage } from '@/shared/config';

import { useGetProjectsQuery } from '../api/project-api';

/**
 * Список проектов в текущей локали. Кэш разделён по языку, так что смена локали
 * перезапрашивает список.
 */
export function useProjects() {
  const language = useAppLanguage();
  return useGetProjectsQuery(language);
}
