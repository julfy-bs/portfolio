import { telegramHandle, type ProfileContact } from '@/entities/profile';

export interface TelegramContact {
  readonly url: string;
  /** @-ник из ссылки `t.me/<ник>`. */
  readonly handle: string;
}

/**
 * Ник владельца для подсказки «нет доступа?» берём из `profile.contacts`, а не из
 * i18n: данные пользователя приходят только с сервера.
 */
export function findTelegramContact(
  contacts: readonly ProfileContact[] | undefined,
): TelegramContact | undefined {
  const telegram = contacts?.find((contact) => contact.icon === 'telegram');
  if (telegram === undefined) return undefined;
  return { url: telegram.url, handle: telegramHandle(contacts) ?? telegram.url };
}
