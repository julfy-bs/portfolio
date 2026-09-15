import type { components } from '@portfolio/contract';

/** Настройки сайта (тема/акцент/язык/режим консоли по умолчанию). */
export type Settings = components['schemas']['SettingsDto'];

export type UpdateSettings = components['schemas']['UpdateSettingsDto'];
