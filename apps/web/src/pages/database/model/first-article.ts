import type { DatabaseTree } from '@/entities/kb';

/** Slug статьи для автовыбора при загрузке, корневые статьи в приоритете. */
export function firstArticleSlug(tree: DatabaseTree): string | undefined {
  const [rootArticle] = tree.rootArticles;
  if (rootArticle !== undefined) return rootArticle.slug;

  for (const folder of tree.folders) {
    const [article] = folder.articles;
    if (article !== undefined) return article.slug;
  }

  return undefined;
}
