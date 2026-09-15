import type { components } from '@portfolio/contract';

/** Владение языком, локализованный ответ `GET /api/languages`. */
export type Language = components['schemas']['LanguageDto'];

/** Админ-вид: название в обеих локалях и порядок. */
export type LanguageAdmin = components['schemas']['LanguageAdminDto'];

export type CreateLanguage = components['schemas']['CreateLanguageDto'];

export type UpdateLanguage = components['schemas']['UpdateLanguageDto'];

/** Локализованный текст `{ ru, en? }` (ответ). */
export type LocalizedText = components['schemas']['LocalizedTextDto'];

/** Локализованный ввод `{ ru, en? }` (запрос). */
export type LocalizedTextInput = components['schemas']['LocalizedTextInput'];
