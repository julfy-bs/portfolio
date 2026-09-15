import type { components } from '@portfolio/contract';

/** Локализованный ответ `GET /api/skills`. */
export type Skill = components['schemas']['SkillDto'];

/** Имя в обеих локалях, нужно редактору в «Стеке». */
export type SkillAdmin = components['schemas']['SkillAdminDto'];

export type CreateSkill = components['schemas']['CreateSkillDto'];

export type UpdateSkill = components['schemas']['UpdateSkillDto'];
