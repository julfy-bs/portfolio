import type { ArticleStub, DatabaseTree, FolderNode } from '@/entities/kb';

export interface KbFolderRow {
  readonly kind: 'folder';
  readonly id: string;
  readonly label: string;
  readonly depth: number;
  /** Нужен, чтобы убрать родителя из вариантов «Переместить в». `null` значит корень. */
  readonly parentId: string | null;
  /** Считаются только статьи прямо в папке, без вложенных. */
  readonly count: number;
  readonly expanded: boolean;
  readonly hasChildren: boolean;
}

export interface KbArticleRow {
  readonly kind: 'article';
  readonly id: string;
  readonly slug: string;
  readonly label: string;
  readonly depth: number;
  /** Нужна, чтобы убрать текущую папку из вариантов «Переместить в». `null` значит корень. */
  readonly folderId: string | null;
}

export type KbRow = KbFolderRow | KbArticleRow;

/**
 * Обход в глубину, папки идут перед статьями, как в файловом менеджере. Содержимое
 * свёрнутых папок в список не попадает.
 */
export function flattenTree(tree: DatabaseTree, expanded: ReadonlySet<string>): KbRow[] {
  const rows: KbRow[] = [];

  const article = (stub: ArticleStub, depth: number, folderId: string | null): void => {
    rows.push({
      kind: 'article',
      id: stub.id,
      slug: stub.slug,
      label: stub.title,
      depth,
      folderId,
    });
  };

  const folder = (node: FolderNode, depth: number, parentId: string | null): void => {
    const isOpen = expanded.has(node.id);
    rows.push({
      kind: 'folder',
      id: node.id,
      label: node.name,
      depth,
      parentId,
      count: node.articles.length,
      expanded: isOpen,
      hasChildren: node.children.length + node.articles.length > 0,
    });
    if (!isOpen) return;
    node.children.forEach((child) => folder(child, depth + 1, node.id));
    node.articles.forEach((stub) => article(stub, depth + 1, node.id));
  };

  tree.folders.forEach((node) => folder(node, 0, null));
  tree.rootArticles.forEach((stub) => article(stub, 0, null));
  return rows;
}

export interface FolderOption {
  readonly id: string;
  readonly label: string;
  readonly depth: number;
}

/** Все папки в порядке дерева, включая свёрнутые. Нужны для селекта родителя и перемещения. */
export function folderOptions(tree: DatabaseTree): FolderOption[] {
  const options: FolderOption[] = [];
  const walk = (folders: readonly FolderNode[], depth: number): void => {
    folders.forEach((folder) => {
      options.push({ id: folder.id, label: folder.name, depth });
      walk(folder.children, depth + 1);
    });
  };
  walk(tree.folders, 0);
  return options;
}

export function countFolders(tree: DatabaseTree): number {
  let total = 0;
  const walk = (folders: readonly FolderNode[]): void => {
    folders.forEach((folder) => {
      total += 1;
      walk(folder.children);
    });
  };
  walk(tree.folders);
  return total;
}

/** Выбор статьи из дерева или по вики-ссылке приходит по slug, а API нужен id. */
export function findArticleIdBySlug(tree: DatabaseTree, slug: string): string | null {
  const inList = (list: readonly ArticleStub[]): string | null =>
    list.find((stub) => stub.slug === slug)?.id ?? null;
  const walk = (folders: readonly FolderNode[]): string | null => {
    for (const folder of folders) {
      const hit = inList(folder.articles);
      if (hit !== null) return hit;
      const deep = walk(folder.children);
      if (deep !== null) return deep;
    }
    return null;
  };
  return inList(tree.rootArticles) ?? walk(tree.folders);
}

export function countArticles(tree: DatabaseTree): number {
  let total = tree.rootArticles.length;
  const walk = (folders: readonly FolderNode[]): void => {
    folders.forEach((folder) => {
      total += folder.articles.length;
      walk(folder.children);
    });
  };
  walk(tree.folders);
  return total;
}
