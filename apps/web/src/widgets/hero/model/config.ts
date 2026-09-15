/**
 * Хэндл и содержимое терминала не переводятся, поэтому лежат в конфиге, а не в i18n.
 */

/** В пикселях. */
export const HERO_AVATAR_SIZE = 66;

export const TERMINAL_TITLE = 'bash — ~';

export const TERMINAL_USER = 'visitor@portfolio';

export const TERMINAL_LINES: readonly { readonly cmd: string; readonly output: string }[] = [
  { cmd: 'whoami', output: 'bogdan.sutuzhko · fullstack' },
  { cmd: 'cat stack.txt', output: 'React · Vue 3 · Node · TypeScript' },
];

/** Строка `location`: между статичными префиксом и суффиксом идут живые часы по МСК. */
export const TERMINAL_LOCATION = {
  cmd: 'location',
  prefix: 'Москва · UTC+3 · ',
  suffix: ' · English C1',
} as const;

/** Шорткат зависит от платформы, его собирает `shared/lib/consoleShortcut`. */
export const CONSOLE_GLYPH = '>_';
