// В теле статьи ссылка пишется как `[[slug]]` или `[[Заголовок]]`, по ним считаются бэклинки.

const WIKILINK_RE = /\[\[\s*([^[\]]+?)\s*\]\]/g;

// Нормализуем ссылку, чтобы `[[event loop]]` находил статью `event-loop`.
export function slugifyToken(token: string): string {
  return token
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9а-яё\s-]/gi, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// Бэклинки ищем сразу во всех локалях, поэтому собираем все строки значения.
export function collectLocalizedStrings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (value === null || typeof value !== 'object') return [];
  return Object.values(value as Record<string, unknown>).filter(
    (item): item is string => typeof item === 'string',
  );
}

export function extractWikilinks(texts: string[]): string[] {
  const tokens: string[] = [];
  for (const text of texts) {
    for (const match of text.matchAll(WIKILINK_RE)) {
      const token = match[1];
      if (token !== undefined) tokens.push(token);
    }
  }
  return tokens;
}
