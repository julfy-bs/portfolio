import type { components } from '@portfolio/contract';

/** Локализованный ответ `GET /api/projects`. */
export type ProjectListItem = components['schemas']['ProjectListItemDto'];

export type ProjectContributor = components['schemas']['ContributorDto'];

/** Локализованный ответ `GET /api/projects/{slug}`. */
export type ProjectDetail = components['schemas']['ProjectDetailDto'];

/** Внешняя ссылка: репозиторий, сайт, демо. */
export type ProjectLink = components['schemas']['ProjectLinkDto'];

export type ProjectMedia = components['schemas']['MediaAssetDto'];

/** Картинка галереи в админке, id нужен для удаления и сортировки. */
export type ProjectMediaAdmin = components['schemas']['MediaAssetAdminDto'];

/** Уходит на бэкенд multipart-запросом. */
export interface UploadGalleryImage {
  readonly projectId: string;
  readonly file: File;
  readonly altRu?: string;
  readonly altEn?: string;
}

/** Админ-вид: обе локали, связи по id и флаги. */
export type ProjectAdmin = components['schemas']['ProjectAdminDto'];

export type CreateProject = components['schemas']['CreateProjectDto'];

/** Частичное обновление, локаль мёржится на бэке. */
export type UpdateProject = components['schemas']['UpdateProjectDto'];

/** Ссылка во вводе: label локализован, href общий. */
export type ProjectLinkInput = components['schemas']['ProjectLinkInput'];
