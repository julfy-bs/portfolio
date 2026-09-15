import { useTranslation } from 'react-i18next';

import { Skeleton } from '@sutuzhko/ui-kit';

import { useTypewriter } from '../model/use-typewriter';

import styles from './hero.module.css';

/** Префикс из i18n и слово, которое набирает `useTypewriter`. */
export function TypingLine({ words }: { readonly words: readonly string[] }) {
  const { t } = useTranslation();
  const word = useTypewriter(words);

  return (
    <div className={styles.typing}>
      <span className={styles.typingPrefix}>{t('home.hero.typing')}</span>{' '}
      {/* Слово и курсор не разрываются: курсор не уезжает на новую строку отдельно,
          а длинное слово переносится целиком. */}
      <span className={styles.typingValue}>
        <span className={styles.typingWord}>{word}</span>
        <span className={styles.cursor} aria-hidden="true" />
      </span>
    </div>
  );
}

/** Высота равна line-box строки: 17px при line-height 1.5 это около 26px. */
export function TypingSkeleton() {
  return (
    <div className={styles.typing}>
      <Skeleton width="240px" height="26px" />
    </div>
  );
}
