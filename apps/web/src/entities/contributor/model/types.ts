import type { components } from '@portfolio/contract';

/** Имя в обеих локалях, используется в мультиселекте участников проекта. */
export type ContributorAdmin = components['schemas']['ContributorAdminDto'];

export type CreateContributor = components['schemas']['CreateContributorDto'];

/** Частичная правка: имя в активной локали, цвет и ссылка. */
export type UpdateContributor = components['schemas']['UpdateContributorDto'];
