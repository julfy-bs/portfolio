import { apiSlice } from '@/shared/api';

import type { CodewarsStats, GithubStats } from '../model/types';

/**
 * Статистика GitHub и Codewars: в ответе только числа и хэндлы, поэтому ни язык,
 * ни `Accept-Language` не нужны.
 */
export const statsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getGithubStats: build.query<GithubStats, void>({
      query: () => ({ url: '/stats/github' }),
    }),
    getCodewarsStats: build.query<CodewarsStats, void>({
      query: () => ({ url: '/stats/codewars' }),
    }),
  }),
});

export const { useGetGithubStatsQuery, useGetCodewarsStatsQuery } = statsApi;
