export { settingsApi, useGetSettingsQuery, useUpdateSettingsMutation } from './api/settings-api';
export type { Settings, UpdateSettings } from './model/types';
export { usePageVisibility, isPathEnabled, type PageVisibility } from './model/page-visibility';

// Моки лежат в отдельной точке входа './mocks', чтобы msw не попал в прод-бандл.
