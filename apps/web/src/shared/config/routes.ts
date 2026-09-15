export const routePaths = {
  home: '/',
  projects: '/projects',
  /** Шаблон для роутера. Для ссылок есть `projectPath`. */
  project: '/projects/:slug',
  experience: '/experience',
  contact: '/contact',
  login: '/login',
  /** Приватная база знаний, только после входа. */
  database: '/database',
  admin: '/admin',
  notFound: '*',
} as const;

export function projectPath(slug: string): string {
  return `/projects/${slug}`;
}

/**
 * Локаль лежит в URL, чтобы при смене языка редактор пересобрался на данных новой
 * локали и не показал на секунду старые.
 */
export function adminTabPath(tab: string, locale: string): string {
  return `/admin/${tab}/${locale}`;
}

/** `detail` это id записи или `new`. */
export function adminDetailPath(tab: string, locale: string, detail: string): string {
  return `/admin/${tab}/${locale}/${detail}`;
}
