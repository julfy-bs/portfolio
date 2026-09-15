export {
  profileApi,
  useGetProfileQuery,
  useGetProfileAdminQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useUploadCvMutation,
  useAddContactMutation,
  useUpdateContactMutation,
} from './api/profile-api';
export { useProfile } from './model/use-profile';
export { telegramHandle } from './model/contact-handle';
export type {
  Profile,
  AvailabilityStatus,
  ProfileContact,
  ProfileAdmin,
  UpdateProfile,
  AvatarResult,
  AvatarCrop,
  CvResult,
  AdminContactLink,
  CreateContact,
  UpdateContact,
  LocalizedText,
  LocalizedTextInput,
  ProfileHighlightInput,
} from './model/types';

// Моки лежат в отдельной точке входа './mocks', чтобы msw не попал в прод-бандл.
