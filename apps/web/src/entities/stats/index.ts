export { statsApi, useGetGithubStatsQuery, useGetCodewarsStatsQuery } from './api/stats-api';
export type { GithubStats, CodewarsStats } from './model/types';

// Моки лежат в отдельной точке входа './mocks', чтобы msw не попал в прод-бандл.
