import type { components } from '@portfolio/contract';

/** Место работы, локализованный ответ `GET /api/experience`. */
export type Experience = components['schemas']['ExperienceDto'];

/** Админ-вид: обе локали и связи по id. */
export type ExperienceAdmin = components['schemas']['ExperienceAdminDto'];

export type CreateExperience = components['schemas']['CreateExperienceDto'];

/** Частичное обновление, локаль мёржится на бэке. */
export type UpdateExperience = components['schemas']['UpdateExperienceDto'];
