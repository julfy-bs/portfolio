export {
  languageApi,
  useGetLanguagesQuery,
  useGetLanguagesAdminQuery,
  useCreateLanguageMutation,
  useUpdateLanguageMutation,
  useDeleteLanguageMutation,
} from './api/language-api';
export { useLanguages } from './model/use-languages';
export type {
  Language,
  LanguageAdmin,
  CreateLanguage,
  UpdateLanguage,
  LocalizedText,
  LocalizedTextInput,
} from './model/types';

// Моки лежат в отдельной точке входа './mocks', чтобы msw не попал в прод-бандл.
