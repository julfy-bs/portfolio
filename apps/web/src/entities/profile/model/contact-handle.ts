import type { ProfileContact } from './types';

/**
 * Ник из Telegram-контакта: `https://t.me/sutuzhko` превращается в `@sutuzhko`. Берём его
 * из `profile.contacts`, а не из i18n. Если контакта нет или ссылка странная, `undefined`.
 */
export function telegramHandle(
  contacts: readonly ProfileContact[] | undefined,
): string | undefined {
  const telegram = contacts?.find((contact) => contact.icon === 'telegram');
  if (telegram === undefined) return undefined;
  try {
    const segment = new URL(telegram.url).pathname.replace(/\//g, '');
    return segment ? `@${segment}` : undefined;
  } catch {
    return undefined;
  }
}
