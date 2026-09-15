import { apiSlice, withLocale } from '@/shared/api';
import type { AppLanguage } from '@/shared/config';

import type {
  ArticleAdmin,
  ArticleDetail,
  CreateArticle,
  CreateFolder,
  DatabaseTree,
  FolderAdmin,
  UpdateArticle,
  UpdateFolder,
} from '../model/types';

/** Язык нужен и для разделения кэша, и для заголовка `Accept-Language`. */
export interface ArticleQueryArgs {
  readonly slug: string;
  readonly language: AppLanguage;
}

/**
 * База знаний приватная: бэкенд закрывает её cookie-сессией, фронт ходит сюда только из-под
 * `RequireAuth`. Мутации инвалидируют тег `Kb`, поэтому дерево и открытая статья
 * перезапрашиваются, а правка статьи дополнительно освежает её admin-кэш.
 */
export const kbApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getDatabaseTree: build.query<DatabaseTree, AppLanguage>({
      query: (language) => withLocale(language, { url: '/database/tree' }),
      providesTags: ['Kb'],
    }),
    getArticle: build.query<ArticleDetail, ArticleQueryArgs>({
      query: ({ slug, language }) => withLocale(language, { url: `/database/articles/${slug}` }),
      providesTags: ['Kb'],
    }),

    // Админка: папки
    getFolders: build.query<FolderAdmin[], void>({
      query: () => ({ url: '/database/folders' }),
      providesTags: ['Kb'],
    }),
    createFolder: build.mutation<FolderAdmin, CreateFolder>({
      query: (body) => ({ url: '/database/folders', method: 'POST', body }),
      invalidatesTags: ['Kb'],
    }),
    updateFolder: build.mutation<FolderAdmin, { id: string; body: UpdateFolder }>({
      query: ({ id, body }) => ({ url: `/database/folders/${id}`, method: 'PATCH', body }),
      invalidatesTags: ['Kb'],
    }),
    deleteFolder: build.mutation<void, string>({
      query: (id) => ({ url: `/database/folders/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Kb'],
    }),

    // Админка: статьи
    getArticleAdmin: build.query<ArticleAdmin, string>({
      query: (id) => ({ url: `/database/articles/admin/${id}` }),
      providesTags: (_result, _error, id) => [{ type: 'KbArticle', id }],
    }),
    createArticle: build.mutation<ArticleAdmin, CreateArticle>({
      query: (body) => ({ url: '/database/articles', method: 'POST', body }),
      invalidatesTags: ['Kb'],
    }),
    updateArticle: build.mutation<ArticleAdmin, { id: string; body: UpdateArticle }>({
      query: ({ id, body }) => ({ url: `/database/articles/${id}`, method: 'PATCH', body }),
      invalidatesTags: (_result, _error, { id }) => ['Kb', { type: 'KbArticle', id }],
    }),
    deleteArticle: build.mutation<void, string>({
      query: (id) => ({ url: `/database/articles/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Kb'],
    }),
  }),
});

export const {
  useGetDatabaseTreeQuery,
  useGetArticleQuery,
  useGetFoldersQuery,
  useCreateFolderMutation,
  useUpdateFolderMutation,
  useDeleteFolderMutation,
  useGetArticleAdminQuery,
  useLazyGetArticleAdminQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = kbApi;
