import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { AppLanguage } from '@/shared/config';
import { ConfirmDialog } from '@sutuzhko/ui-kit';

import { useSortableSensors } from '@/shared/lib';

import { pickText } from '../model/project-form';
import type { StagedContributor } from '../model/contributor-staging';

import { ContributorForm, type ContributorDraft } from './contributor-form';
import { SortableContributorChip } from './sortable-contributor-chip';
import styles from './admin-projects.module.css';

export interface ContributorManagerProps {
  readonly locale: AppLanguage;
  readonly disabled: boolean;
  /** Уже без удалённых и в том порядке, который хотим сохранить. */
  readonly staged: readonly StagedContributor[];
  readonly selectedIds: readonly string[];
  readonly onToggle: (id: string) => void;
  readonly onStageCreate: (draft: ContributorDraft) => void;
  readonly onStageUpdate: (id: string, draft: ContributorDraft) => void;
  readonly onStageDelete: (id: string) => void;
  readonly onReorder: (activeId: string, overId: string) => void;
}

type Editor =
  | { readonly kind: 'closed' }
  | { readonly kind: 'create' }
  | { readonly kind: 'edit'; readonly contributor: StagedContributor };

/**
 * Порядок чипов здесь общий для всего каталога, в нём же участники идут на публичных плитках.
 * Колбэки только копят черновик, запросы уходят при сохранении проекта.
 */
export function ContributorManager({
  locale,
  disabled,
  staged,
  selectedIds,
  onToggle,
  onStageCreate,
  onStageUpdate,
  onStageDelete,
  onReorder,
}: ContributorManagerProps) {
  const { t } = useTranslation();
  const sensors = useSortableSensors();
  const [editor, setEditor] = useState<Editor>({ kind: 'closed' });
  const [confirmDelete, setConfirmDelete] = useState<StagedContributor | null>(null);

  const close = (): void => setEditor({ kind: 'closed' });

  const handleCreate = (draft: ContributorDraft): void => {
    onStageCreate(draft);
    close();
  };

  const handleUpdate = (contributor: StagedContributor, draft: ContributorDraft): void => {
    onStageUpdate(contributor.id, draft);
    close();
  };

  const handleDelete = (contributor: StagedContributor): void => {
    onStageDelete(contributor.id);
    setConfirmDelete(null);
    close();
  };

  const handleDragEnd = ({ active, over }: DragEndEvent): void => {
    if (over === null || active.id === over.id) return;
    onReorder(String(active.id), String(over.id));
  };

  return (
    <fieldset className={styles.field}>
      <legend className={styles.inlineLabel}>{t('admin.projects.contributors')}</legend>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className={styles.chips}>
          <SortableContext
            items={staged.map((contributor) => contributor.id)}
            strategy={rectSortingStrategy}
          >
            {staged.map((contributor) => (
              <SortableContributorChip
                key={contributor.id}
                id={contributor.id}
                label={pickText(contributor.name, locale)}
                color={contributor.color}
                selected={selectedIds.includes(contributor.id)}
                editing={editor.kind === 'edit' && editor.contributor.id === contributor.id}
                disabled={disabled}
                onToggle={() => onToggle(contributor.id)}
                onEdit={() => setEditor({ kind: 'edit', contributor })}
              />
            ))}
          </SortableContext>
          <button
            type="button"
            className={styles.chipAdd}
            disabled={disabled}
            onClick={() => setEditor({ kind: 'create' })}
          >
            {t('admin.projects.contributorAdd')}
          </button>
        </div>
      </DndContext>

      {editor.kind === 'create' ? (
        <ContributorForm
          disabled={disabled}
          submitLabel={t('admin.projects.contributorSave')}
          onSubmit={handleCreate}
          onCancel={close}
        />
      ) : null}

      {editor.kind === 'edit' ? (
        <ContributorForm
          initial={{
            name: pickText(editor.contributor.name, locale),
            color: editor.contributor.color ?? '',
            image: editor.contributor.image ?? '',
            link: editor.contributor.link ?? '',
          }}
          disabled={disabled}
          submitLabel={t('admin.projects.contributorUpdate')}
          onSubmit={(draft) => handleUpdate(editor.contributor, draft)}
          onCancel={close}
          onDelete={() => setConfirmDelete(editor.contributor)}
        />
      ) : null}

      <ConfirmDialog
        open={confirmDelete !== null}
        title={t('admin.projects.contributorConfirmTitle')}
        message={t('admin.projects.contributorConfirmText', {
          name: confirmDelete ? pickText(confirmDelete.name, locale) : '',
        })}
        confirmLabel={t('admin.projects.contributorDelete')}
        cancelLabel={t('admin.projects.cancel')}
        busy={disabled}
        onConfirm={() => {
          if (confirmDelete) handleDelete(confirmDelete);
        }}
        onCancel={() => setConfirmDelete(null)}
      />
    </fieldset>
  );
}
