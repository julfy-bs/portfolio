import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTranslation } from 'react-i18next';

import { cn } from '@/shared/lib';
import { Icon } from '@sutuzhko/ui-kit';

import styles from './admin-stack.module.css';

interface SortableChipProps {
  /** Он же id для сортировки в dnd-kit. */
  readonly id: string;
  readonly name: string;
  readonly removeLabel: string;
  readonly onRemove: () => void;
}

/**
 * Тянуть чип можно только за ручку. Если повесить обработчики на весь чип, он станет
 * кнопкой, и кнопка удаления окажется вложенной в неё.
 */
export function SortableChip({ id, name, removeLabel, onRemove }: SortableChipProps) {
  const { t } = useTranslation();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  return (
    <span
      ref={setNodeRef}
      // Берём только translate. У чипов разная ширина, и `CSS.Transform` добавил бы
      // scale, из-за которого текст растягивается при перетаскивании.
      style={{ transform: CSS.Translate.toString(transform), transition }}
      className={cn(styles.chip, styles.chipSortable, isDragging && styles.chipDragging)}
    >
      <button
        type="button"
        className={styles.chipHandle}
        aria-label={t('admin.stack.reorder', { name })}
        {...attributes}
        {...listeners}
      >
        <Icon name="grip" size={13} />
      </button>
      {name}
      <button
        type="button"
        className={styles.chipRemove}
        onClick={onRemove}
        aria-label={removeLabel}
      >
        ×
      </button>
    </span>
  );
}
