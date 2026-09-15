import type { components } from '@portfolio/contract';

/** Локализованный ответ `GET /api/education`. */
export type Education = components['schemas']['EducationDto'];

/** Админ-вид с обеими локалями для редактирования. */
export type EducationAdmin = components['schemas']['EducationAdminDto'];

export type CreateEducation = components['schemas']['CreateEducationDto'];

/** Частичное обновление, локаль мёржится на бэке. */
export type UpdateEducation = components['schemas']['UpdateEducationDto'];

/** Тип записи: основное образование (`MAIN`) или курс/сертификат (`ADDITIONAL`). */
export type EducationType = components['schemas']['EducationType'];
