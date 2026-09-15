export {
  contributorApi,
  useGetContributorsAdminQuery,
  useCreateContributorMutation,
  useUpdateContributorMutation,
  useDeleteContributorMutation,
} from './api/contributor-api';
export type { ContributorAdmin, CreateContributor, UpdateContributor } from './model/types';

// Моки лежат в отдельной точке входа './mocks', чтобы msw не попал в прод-бандл.
