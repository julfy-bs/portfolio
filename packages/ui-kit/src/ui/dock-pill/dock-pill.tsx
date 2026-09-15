import { WindowChrome } from '../window-chrome';

import styles from './dock-pill.module.css';

export interface DockPillProps {
  /** Подпись окна в трее (моно-заголовок, например `bash — ~` или `2048 — game`). */
  readonly label: string;
  readonly onClose: () => void;
  /** Развернуть обратно в обычное окно (жёлтый свет и клик по подписи). */
  readonly onRestore: () => void;
  /** Развернуть сразу на всю ширину (зелёный свет). Без него работает как `onRestore`. */
  readonly onMaximize?: () => void;
  readonly closeLabel?: string;
  readonly restoreLabel?: string;
  readonly maximizeLabel?: string;
}

/**
 * Свёрнутое окно в трее. Красный свет закрывает, жёлтый и клик по подписи разворачивают,
 * зелёный разворачивает на всю ширину.
 */
export function DockPill({
  label,
  onClose,
  onRestore,
  onMaximize,
  closeLabel,
  restoreLabel,
  maximizeLabel,
}: DockPillProps) {
  return (
    <div className={styles.pill}>
      <WindowChrome
        onClose={onClose}
        onMinimize={onRestore}
        onMaximize={onMaximize ?? onRestore}
        closeLabel={closeLabel}
        minimizeLabel={restoreLabel}
        maximizeLabel={maximizeLabel ?? restoreLabel}
      />
      <button type="button" className={styles.label} onClick={onRestore}>
        {label}
      </button>
    </div>
  );
}
