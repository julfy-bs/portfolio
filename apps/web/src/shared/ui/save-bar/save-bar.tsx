import { useTranslation } from 'react-i18next';

import { Icon } from '@sutuzhko/ui-kit';

import styles from './save-bar.module.css';

export interface SaveBarProps {
  /** Обычно true, только когда есть несохранённые изменения. */
  readonly visible: boolean;
  /** Пока идёт сохранение, обе кнопки заблокированы. */
  readonly isSaving: boolean;
  /** Для форм на RHF нужен `submit`: тогда нажатие уйдёт в `onSubmit`, и `onSave` не нужен. */
  readonly saveType?: 'button' | 'submit';
  readonly onSave?: () => void;
  /** Откатывает значения к загруженным или закрывает редактор. */
  readonly onCancel: () => void;
  readonly canSave?: boolean;
  /** Число правок в диффе. Если не задано, кнопка и подпись показываются без счётчика. */
  readonly count?: number;
}

/**
 * Плавающий бар сохранения для всех вкладок кабинета. Что именно сохраняется, он не знает,
 * это решает родитель через `onSave` и `onCancel`.
 */
export function SaveBar({
  visible,
  isSaving,
  saveType = 'button',
  onSave,
  onCancel,
  canSave = true,
  count,
}: SaveBarProps) {
  const { t } = useTranslation();
  if (!visible) return null;

  // Без счётчика бар и так виден только при isDirty. count === 0 бывает у пустой формы
  // редактора, там сводка не нужна, хватает кнопок.
  const hasChanges = count == null || count > 0;
  const saveLabel =
    count == null || count === 0 ? t('admin.save') : t('admin.saveCount', { count });

  return (
    <div className={styles.bar} role="region" aria-label={t('admin.unsaved')}>
      {hasChanges ? (
        <>
          <span className={styles.dot} aria-hidden />
          <div className={styles.meta}>
            <span className={styles.title}>{t('admin.unsaved')}</span>
            {count != null ? (
              <span className={styles.subtitle}>{t('admin.diffCount', { count })}</span>
            ) : null}
          </div>
        </>
      ) : null}

      <button type="button" className={styles.discard} onClick={onCancel} disabled={isSaving}>
        {t('admin.cancel')}
      </button>

      <button
        type={saveType === 'submit' ? 'submit' : 'button'}
        className={styles.submit}
        onClick={saveType === 'submit' ? undefined : onSave}
        disabled={isSaving || !canSave}
      >
        <Icon name="success" size={14} />
        {saveLabel}
      </button>
    </div>
  );
}
