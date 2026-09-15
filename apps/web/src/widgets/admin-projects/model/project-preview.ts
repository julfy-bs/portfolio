import type { ContributorAdmin } from '@/entities/contributor';
import type { TechnologyAdmin } from '@/entities/technology';
import type { AppLanguage } from '@/shared/config';
import type { ProjectTileData } from '@/entities/project';

import { pickText, type ProjectFormValues } from './project-form';

interface PreviewFallbacks {
  /** Показывается, пока название не введено. */
  readonly title: string;
  readonly description: string;
}

/**
 * Собирает плитку из черновика формы. Лежит в модели, чтобы превью можно было проверить
 * тестом, не рендеря всю форму.
 */
export function formToTile(
  values: ProjectFormValues,
  technologies: readonly TechnologyAdmin[],
  contributors: readonly ContributorAdmin[],
  locale: AppLanguage,
  fallbacks: PreviewFallbacks,
): ProjectTileData {
  // Берём порядок каталога, а не порядок кликов: так же технологии и участники идут на
  // публичной плитке, и превью совпадает с сайтом.
  const technologyNames = technologies
    .filter((technology) => values.technologyIds.includes(technology.id))
    .map((technology) => technology.name);

  const people = contributors
    .filter((contributor) => values.contributorIds.includes(contributor.id))
    .map((contributor) => ({
      name: pickText(contributor.name, locale),
      image: contributor.image,
      color: contributor.color,
      link: contributor.link,
    }));

  const trimmedTitle = values.title.trim();
  const trimmedDescription = values.description.trim();

  return {
    title: trimmedTitle.length > 0 ? trimmedTitle : fallbacks.title,
    description: trimmedDescription.length > 0 ? trimmedDescription : fallbacks.description,
    category: values.category.trim() || null,
    period: values.period.trim() || null,
    tileColor: values.tileColor,
    runnable: values.runnable,
    runCommand: values.runCommand.trim() || null,
    contributors: people,
    technologies: technologyNames,
  };
}
