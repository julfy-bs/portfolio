import type { ArticleStub, DatabaseTree, FolderNode } from '@/entities/kb';
import type { TreeNode } from '@sutuzhko/ui-kit';

function articleToNode(article: ArticleStub): TreeNode {
  return { id: article.slug, label: article.title, type: 'article' };
}

function folderToNode(folder: FolderNode): TreeNode {
  return {
    id: folder.id,
    label: folder.name,
    type: 'folder',
    count: folder.articles.length,
    // Папки выше статей, как в файловом дереве.
    children: [...folder.children.map(folderToNode), ...folder.articles.map(articleToNode)],
  };
}

/** Превращает дерево БЗ в узлы `Tree` из UI-kit. Статьи корня идут после папок. */
export function toTreeNodes(tree: DatabaseTree): TreeNode[] {
  return [...tree.folders.map(folderToNode), ...tree.rootArticles.map(articleToNode)];
}

/** Папки верхнего уровня раскрыты сразу, чтобы статьи были видны без кликов. */
export function topLevelFolderIds(tree: DatabaseTree): string[] {
  return tree.folders.map((folder) => folder.id);
}
