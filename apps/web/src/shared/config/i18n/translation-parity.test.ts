import { describe, expect, it } from 'vitest';

import en from './locales/en/translation.json';
import ru from './locales/ru/translation.json';

function keyPaths(value: unknown, prefix = ''): string[] {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return [prefix];
  }
  return Object.entries(value as Record<string, unknown>).flatMap(([key, nested]) =>
    keyPaths(nested, prefix ? `${prefix}.${key}` : key),
  );
}

describe('i18n locale parity', () => {
  // Ключ, добавленный только в одну локаль, на другой молча покажется без перевода.
  it('ru и en содержат один и тот же набор ключей', () => {
    const ruKeys = new Set(keyPaths(ru));
    const enKeys = new Set(keyPaths(en));

    const missingInEn = [...ruKeys].filter((key) => !enKeys.has(key)).sort();
    const missingInRu = [...enKeys].filter((key) => !ruKeys.has(key)).sort();

    expect({ missingInEn, missingInRu }).toEqual({ missingInEn: [], missingInRu: [] });
  });
});
