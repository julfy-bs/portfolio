import { useEffect, useRef, useState } from 'react';

import { Icon } from '@sutuzhko/ui-kit';

import styles from './admin-localization.module.css';

export type LocLocale = 'ru' | 'en';

/** Переводятся в контейнере. */
export interface LocCellLabels {
  readonly edit: string;
  readonly done: string;
  readonly cancel: string;
  readonly hint: string;
  readonly missing: string;
  readonly pending: string;
}

export interface LocCellProps {
  readonly locale: LocLocale;
  /** Уже с учётом несохранённых правок. */
  readonly value: string;
  readonly editing: boolean;
  /** Есть правка, которая ещё не сохранена. */
  readonly pending: boolean;
  readonly labels: LocCellLabels;
  readonly onEdit: () => void;
  readonly onCommit: (value: string) => void;
  readonly onCancel: () => void;
}

/** Черновик живёт внутри ячейки и попадает в общий дифф только по кнопке «Готово». */
export function LocCell({
  locale,
  value,
  editing,
  pending,
  labels,
  onEdit,
  onCommit,
  onCancel,
}: LocCellProps) {
  const [draft, setDraft] = useState(value);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Фокус ставим через ref, а не autoFocus, чтобы не отключать правило jsx-a11y.
  useEffect(() => {
    if (editing) {
      setDraft(value);
      textareaRef.current?.focus();
    }
  }, [editing, value]);

  if (editing) {
    return (
      <div className={styles.cell}>
        <div className={styles.editor}>
          <textarea
            ref={textareaRef}
            rows={3}
            className={styles.textarea}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                onCommit(draft);
              } else if (event.key === 'Escape') {
                event.preventDefault();
                onCancel();
              }
            }}
          />
          <div className={styles.editorActions}>
            <button type="button" className={styles.commit} onClick={() => onCommit(draft)}>
              <Icon name="success" size={12} />
              {labels.done}
            </button>
            <button type="button" className={styles.cellCancel} onClick={onCancel}>
              {labels.cancel}
            </button>
            <span className={styles.hint}>{labels.hint}</span>
          </div>
        </div>
      </div>
    );
  }

  const isMissing = locale === 'en' && value.trim() === '';

  return (
    <div className={styles.cell}>
      {isMissing ? (
        <span className={styles.cellMissing}>{labels.missing}</span>
      ) : (
        <span className={styles.cellValue}>{value}</span>
      )}
      <button type="button" className={styles.pencil} title={labels.edit} onClick={onEdit}>
        <Icon name="edit" size={12} />
      </button>
      {pending ? <span className={styles.pending} title={labels.pending} /> : null}
    </div>
  );
}
