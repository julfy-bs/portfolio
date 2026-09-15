import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { DatabaseTree } from '@/entities/kb';
import { Tree } from '@sutuzhko/ui-kit';

import { toTreeNodes, topLevelFolderIds } from '../model/to-tree-nodes';

import { KbTreeSkeleton } from './kb-tree-skeleton';
import styles from './kb-tree.module.css';

export interface KbTreeProps {
  /** `undefined`, пока грузится, в этом случае рисуем скелетон. */
  readonly tree: DatabaseTree | undefined;
  readonly selectedSlug?: string;
  readonly onSelectArticle: (slug: string) => void;
}

/**
 * Боковое дерево базы знаний. Раскрытие папок и клавиатурную навигацию берёт на себя `Tree`.
 */
export function KbTree({ tree, selectedSlug, onSelectArticle }: KbTreeProps) {
  const { t } = useTranslation();
  const nodes = useMemo(() => (tree ? toTreeNodes(tree) : []), [tree]);
  const expanded = useMemo(() => (tree ? topLevelFolderIds(tree) : []), [tree]);

  return (
    <nav
      className={styles.tree}
      aria-label={t('database.treeLabel')}
      aria-busy={tree === undefined}
    >
      {tree === undefined ? (
        <KbTreeSkeleton />
      ) : (
        <Tree
          nodes={nodes}
          selectedId={selectedSlug}
          onSelect={onSelectArticle}
          defaultExpandedIds={expanded}
          aria-label={t('database.treeLabel')}
        />
      )}
    </nav>
  );
}
