import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/shared/lib';
import { Icon } from '@sutuzhko/ui-kit';

import styles from './admin-stack.module.css';

interface SortableCategoryProps {
  /** Ключ категории, он же id для dnd-kit. */
  readonly id: string;
  /** Нужно для aria-label ручки. */
  readonly name: string;
  /**
   * Ручку отдаём наружу, чтобы вид сам решил, где её показать. В режиме переименования
   * он её не рисует.
   */
  readonly children: (dragHandle: ReactNode) => ReactNode;
}

/**
 * Слушатели перетаскивания висят только на ручке, поэтому остальные кнопки внутри блока
 * работают как обычно.
 */
export function SortableCategory({ id, name, children }: SortableCategoryProps) {
  const { t } = useTranslation();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const dragHandle = (
    <button
      type="button"
      className={styles.categoryDrag}
      aria-label={t('admin.stack.reorderBlock', { name })}
      {...attributes}
      {...listeners}
    >
      <Icon name="grip" size={13} />
    </button>
  );

  return (
    <div
      ref={setNodeRef}
      // Только translate, без scale, как в SortableChip. Со scale содержимое блока плывёт.
      style={{ transform: CSS.Translate.toString(transform), transition }}
      className={cn(styles.techColumn, isDragging && styles.columnDragging)}
    >
      {children(dragHandle)}
    </div>
  );
}
