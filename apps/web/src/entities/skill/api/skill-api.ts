import { apiSlice, withLocale } from '@/shared/api';
import type { AppLanguage } from '@/shared/config';

import type { CreateSkill, Skill, SkillAdmin, UpdateSkill } from '../model/types';

/**
 * Публичный список локализован, язык передаётся аргументом. Мутации инвалидируют тег
 * `Skill`, так что экран «Опыт» сразу видит правки.
 */
export const skillApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSkills: build.query<Skill[], AppLanguage>({
      query: (language) => withLocale(language, { url: '/skills' }),
      providesTags: ['Skill'],
    }),
    getSkillsAdmin: build.query<SkillAdmin[], void>({
      query: () => ({ url: '/skills/admin' }),
      providesTags: ['Skill'],
    }),
    createSkill: build.mutation<SkillAdmin, CreateSkill>({
      query: (body) => ({ url: '/skills', method: 'POST', body }),
      invalidatesTags: ['Skill'],
    }),
    updateSkill: build.mutation<SkillAdmin, { id: string; body: UpdateSkill }>({
      query: ({ id, body }) => ({ url: `/skills/${id}`, method: 'PATCH', body }),
      invalidatesTags: ['Skill'],
    }),
    deleteSkill: build.mutation<void, string>({
      query: (id) => ({ url: `/skills/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Skill'],
    }),
  }),
});

export const {
  useGetSkillsQuery,
  useGetSkillsAdminQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} = skillApi;
