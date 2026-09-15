import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from './axios-base-query';

// Эндпоинты добавляют сами сущности через `injectEndpoints`, чтобы shared не знал о домене.
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery(),
  // Работает только вместе с `setupListeners` в store.
  refetchOnReconnect: true,
  tagTypes: [
    'Profile',
    'ProfileAdmin',
    'Session',
    'Settings',
    'Technology',
    'Language',
    'Skill',
    'Education',
    'Experience',
    'Project',
    'Contributor',
    'Kb',
    'KbArticle',
  ],
  endpoints: () => ({}),
});
