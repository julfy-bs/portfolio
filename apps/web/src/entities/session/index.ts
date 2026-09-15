export {
  sessionApi,
  useGetMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useChangePasswordMutation,
} from './api/session-api';
export { useAuth, type AuthState } from './model/use-auth';
export type { AuthUser, LoginCredentials, UserRole, ChangePassword } from './model/types';

// Моки лежат в отдельной точке входа './mocks', чтобы msw не попал в прод-бандл.
