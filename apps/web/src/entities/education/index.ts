export {
  educationApi,
  useGetEducationQuery,
  useGetEducationAdminQuery,
  useCreateEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
} from './api/education-api';
export { useEducation } from './model/use-education';
export type {
  Education,
  EducationAdmin,
  CreateEducation,
  UpdateEducation,
  EducationType,
} from './model/types';

// Моки лежат в отдельной точке входа './mocks', чтобы msw не попал в прод-бандл.
