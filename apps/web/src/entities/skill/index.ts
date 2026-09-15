export {
  skillApi,
  useGetSkillsQuery,
  useGetSkillsAdminQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} from './api/skill-api';
export { useSkills } from './model/use-skills';
export type { Skill, SkillAdmin, CreateSkill, UpdateSkill } from './model/types';

// Моки лежат в отдельной точке входа './mocks', чтобы msw не попал в прод-бандл.
