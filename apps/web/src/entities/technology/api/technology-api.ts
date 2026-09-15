import { apiSlice, withLocale } from '@/shared/api';
import type { AppLanguage } from '@/shared/config';

import type {
  CreateTechnology,
  Technology,
  TechnologyAdmin,
  UpdateTechnology,
} from '../model/types';

/**
 * Категории у технологий нужны для группировки. Мутации инвалидируют тег `Technology`,
 * так что стек на главной сразу видит правки.
 */
export const technologyApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getTechnologies: build.query<Technology[], AppLanguage>({
      query: (language) => withLocale(language, { url: '/technologies' }),
      providesTags: ['Technology'],
    }),
    getTechnologiesAdmin: build.query<TechnologyAdmin[], void>({
      query: () => ({ url: '/technologies/admin' }),
      providesTags: ['Technology'],
    }),
    createTechnology: build.mutation<TechnologyAdmin, CreateTechnology>({
      query: (body) => ({ url: '/technologies', method: 'POST', body }),
      invalidatesTags: ['Technology'],
    }),
    updateTechnology: build.mutation<TechnologyAdmin, { id: string; body: UpdateTechnology }>({
      query: ({ id, body }) => ({ url: `/technologies/${id}`, method: 'PATCH', body }),
      invalidatesTags: ['Technology'],
    }),
    deleteTechnology: build.mutation<void, string>({
      query: (id) => ({ url: `/technologies/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Technology'],
    }),
  }),
});

export const {
  useGetTechnologiesQuery,
  useGetTechnologiesAdminQuery,
  useCreateTechnologyMutation,
  useUpdateTechnologyMutation,
  useDeleteTechnologyMutation,
} = technologyApi;
