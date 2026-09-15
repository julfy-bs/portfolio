import { apiSlice } from '@/shared/api';

import type { ContributorAdmin, CreateContributor, UpdateContributor } from '../model/types';

/**
 * Общий каталог участников проектов. Его ведут прямо из формы проекта, поэтому мутации
 * инвалидируют тег `Contributor` и список в выборе сразу обновляется.
 */
export const contributorApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getContributorsAdmin: build.query<ContributorAdmin[], void>({
      query: () => ({ url: '/contributors/admin' }),
      providesTags: ['Contributor'],
    }),
    createContributor: build.mutation<ContributorAdmin, CreateContributor>({
      query: (body) => ({ url: '/contributors', method: 'POST', body }),
      invalidatesTags: ['Contributor'],
    }),
    updateContributor: build.mutation<ContributorAdmin, { id: string; body: UpdateContributor }>({
      query: ({ id, body }) => ({ url: `/contributors/${id}`, method: 'PATCH', body }),
      invalidatesTags: ['Contributor'],
    }),
    deleteContributor: build.mutation<void, string>({
      query: (id) => ({ url: `/contributors/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Contributor'],
    }),
  }),
});

export const {
  useGetContributorsAdminQuery,
  useCreateContributorMutation,
  useUpdateContributorMutation,
  useDeleteContributorMutation,
} = contributorApi;
