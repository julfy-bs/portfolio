import { useTranslation } from 'react-i18next';

import { COMMANDS } from '../model/commands';

import styles from './console.module.css';

/** Справка `help` строится по реестру, так что новая команда попадает сюда сама. */
export function ConsoleHelp() {
  const { t } = useTranslation();

  return (
    <div className={styles.help}>
      <div className={styles.helpTitle}>{t('console.help.title')}</div>
      <dl className={styles.helpList}>
        {COMMANDS.map((command) => (
          <div key={command.name} className={styles.helpRow}>
            <dt className={styles.helpUsage}>{command.usage}</dt>
            <dd className={styles.helpDesc}>{t(command.descriptionKey)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
