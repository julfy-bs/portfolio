import { useTranslation } from 'react-i18next';

import { Button } from '@sutuzhko/ui-kit';

import { useSiteLanguages } from '../model/use-site-languages';

import styles from './lang-switch.module.css';

/** Если на сайте доступен только один язык, переключать нечего и кнопку не показываем. */
export function LangSwitch() {
  const { current, available, cycleNext } = useSiteLanguages();
  const { t } = useTranslation();

  if (available.length <= 1) return null;

  const code = current.toUpperCase();
  // Доступное имя должно содержать видимый код (RU/EN), иначе нарушаем WCAG 2.5.3
  // (label-content-name-mismatch).
  const label = `${t('common.switchLanguage')}: ${code}`;

  return (
    <Button
      variant="icon"
      onClick={cycleNext}
      aria-label={label}
      title={label}
      className={styles.lang}
    >
      {code}
    </Button>
  );
}
