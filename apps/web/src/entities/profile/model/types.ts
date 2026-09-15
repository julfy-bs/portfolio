import type { components } from '@portfolio/contract';

/** Публичный профиль владельца портфолио, уже локализованный бэкендом. */
export type Profile = components['schemas']['ProfileDto'];

export type AvailabilityStatus = components['schemas']['AvailabilityStatus'];

/** Ссылка-контакт: Telegram, email, GitHub и т.п. */
export type ProfileContact = components['schemas']['ProfileContactDto'];

/** Админ-вид с обеими локалями для редактирования. */
export type ProfileAdmin = components['schemas']['ProfileAdminDto'];

export type UpdateProfile = components['schemas']['UpdateProfileDto'];

export type AvatarResult = components['schemas']['AvatarResultDto'];

/** Квадрат кадрирования в пикселях исходного изображения. */
export interface AvatarCrop {
  readonly x: number;
  readonly y: number;
  readonly size: number;
}

export type CvResult = components['schemas']['CvResultDto'];

export type AdminContactLink = components['schemas']['AdminContactLinkDto'];

export type CreateContact = components['schemas']['CreateContactLinkDto'];

export type UpdateContact = components['schemas']['UpdateContactLinkDto'];

/** Локализованный текст `{ ru, en? }` (ответ). */
export type LocalizedText = components['schemas']['LocalizedTextDto'];

/** Локализованный ввод `{ ru, en? }` (запрос). */
export type LocalizedTextInput = components['schemas']['LocalizedTextInput'];

/** Показатель в админ-вводе: значение и локализованная подпись. */
export type ProfileHighlightInput = components['schemas']['ProfileHighlightInput'];
