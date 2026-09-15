import type { components } from '@portfolio/contract';

/** Технология стека, локализованный ответ `GET /api/technologies`. */
export type Technology = components['schemas']['TechnologyDto'];

export type TechnologyAdmin = components['schemas']['TechnologyAdminDto'];

export type CreateTechnology = components['schemas']['CreateTechnologyDto'];

export type UpdateTechnology = components['schemas']['UpdateTechnologyDto'];
