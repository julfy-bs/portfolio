import { useAppLanguage } from '@/shared/config';

import { useGetProfileQuery } from '../api/profile-api';

/**
 * Профиль в текущей локали. Привязка к языку спрятана здесь, чтобы страницы её не тянули:
 * кэш разделён по языку, и при смене локали данные перезапрашиваются.
 */
export function useProfile() {
  const language = useAppLanguage();
  return useGetProfileQuery(language);
}
