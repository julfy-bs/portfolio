import { apiSlice } from '@/shared/api';

import type { Settings, UpdateSettings } from '../model/types';

/**
 * Настройки не локализуются, поэтому один `getSettings` обслуживает и сайт, и админку.
 */
export const settingsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSettings: build.query<Settings, void>({
      query: () => ({ url: '/settings' }),
      providesTags: ['Settings'],
    }),
    updateSettings: build.mutation<Settings, UpdateSettings>({
      query: (body) => ({ url: '/settings', method: 'PATCH', body }),
      invalidatesTags: ['Settings'],
    }),
  }),
});

export const { useGetSettingsQuery, useUpdateSettingsMutation } = settingsApi;
