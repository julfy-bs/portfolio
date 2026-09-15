import { apiSlice } from '@/shared/api';

import type { AuthUser, ChangePassword, LoginCredentials } from '../model/types';

/**
 * Сессия живёт в HttpOnly-cookie, которые ставит бэкенд, поэтому клиент хранит не токены,
 * а только текущего пользователя из `getMe`. `login` и `logout` инвалидируют тег `Session`,
 * `getMe` перезапрашивается, и приложение видит новый статус без ручной синхронизации.
 */
export const sessionApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<AuthUser, void>({
      query: () => ({ url: '/auth/me' }),
      providesTags: ['Session'],
    }),
    login: build.mutation<AuthUser, LoginCredentials>({
      query: (credentials) => ({ url: '/auth/login', method: 'POST', body: credentials }),
      invalidatesTags: ['Session'],
    }),
    logout: build.mutation<void, void>({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
      invalidatesTags: ['Session'],
    }),
    // Смена пароля не трогает `Session`: текущая сессия остаётся, бэкенд лишь
    // отзывает refresh-токены (на других устройствах разлогинит при следующем refresh).
    changePassword: build.mutation<void, ChangePassword>({
      query: (body) => ({ url: '/auth/change-password', method: 'POST', body }),
    }),
  }),
});

export const { useGetMeQuery, useLoginMutation, useLogoutMutation, useChangePasswordMutation } =
  sessionApi;
