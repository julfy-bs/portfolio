import { contributorHandlers } from '@/entities/contributor/mocks';
import { educationAdminHandlers, educationHandlers } from '@/entities/education/mocks';
import { experienceAdminHandlers, experienceHandlers } from '@/entities/experience/mocks';
import { kbHandlers } from '@/entities/kb/mocks';
import { languageAdminHandlers, languageHandlers } from '@/entities/language/mocks';
import { profileAdminHandlers, profileHandlers } from '@/entities/profile/mocks';
import { projectAdminHandlers, projectHandlers } from '@/entities/project/mocks';
import { sessionHandlers } from '@/entities/session/mocks';
import { settingsHandlers } from '@/entities/settings/mocks';
import { skillHandlers, skillAdminHandlers } from '@/entities/skill/mocks';
import { statsHandlers } from '@/entities/stats/mocks';
import { technologyAdminHandlers, technologyHandlers } from '@/entities/technology/mocks';

export const handlers = [
  ...profileHandlers,
  ...profileAdminHandlers,
  ...statsHandlers,
  // Админские хендлеры идут первыми, иначе `GET /projects/admin` попадёт в
  // `GET /projects/:slug` со slug='admin' и получит 404.
  ...projectAdminHandlers,
  ...contributorHandlers,
  ...projectHandlers,
  ...experienceHandlers,
  ...experienceAdminHandlers,
  ...educationHandlers,
  ...educationAdminHandlers,
  ...languageHandlers,
  ...languageAdminHandlers,
  ...skillHandlers,
  ...skillAdminHandlers,
  ...technologyHandlers,
  ...technologyAdminHandlers,
  ...sessionHandlers,
  ...settingsHandlers,
  ...kbHandlers,
];
