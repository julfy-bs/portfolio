import type { components } from '@portfolio/contract';

/** Вложенные папки плюс статьи в корне. */
export type DatabaseTree = components['schemas']['DatabaseTreeDto'];

/** Рекурсивный узел: статьи и вложенные папки. */
export type FolderNode = components['schemas']['FolderNodeDto'];

/** Статья в дереве, без тела. */
export type ArticleStub = components['schemas']['ArticleStubDto'];

export type ArticleDetail = components['schemas']['ArticleDetailDto'];

/** Бэклинк на статью. */
export type ArticleLink = components['schemas']['ArticleLinkDto'];

export type PublishStatus = components['schemas']['PublishStatus'];

/** `{ ru, en? }`: так хранятся имя папки, заголовок и тело статьи. */
export type LocalizedText = components['schemas']['LocalizedTextDto'];

/** Админ-вид папки, имя в обеих локалях. */
export type FolderAdmin = components['schemas']['FolderAdminDto'];

/** Админ-вид статьи, title и body в обеих локалях. */
export type ArticleAdmin = components['schemas']['ArticleAdminDto'];

export type CreateFolder = components['schemas']['CreateFolderDto'];
export type UpdateFolder = components['schemas']['UpdateFolderDto'];
export type CreateArticle = components['schemas']['CreateArticleDto'];
export type UpdateArticle = components['schemas']['UpdateArticleDto'];
