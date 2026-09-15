import { useTranslation } from 'react-i18next';

import type { ProfileContact } from '@/entities/profile';
import { useReveal } from '@/shared/lib';
import { ErrorState, Heading, Icon, PageIntro } from '@sutuzhko/ui-kit';
import { ContactLinks } from '@/widgets/contact-links';
import { ResumeBanner } from '@/widgets/resume-banner';

import styles from './contact-page.module.css';

const noop = () => undefined;

export interface ContactPageViewProps {
  readonly contacts?: readonly ProfileContact[];
  /** Интро-абзац, поле профиля с сервера. */
  readonly intro?: string | null;
  /** Ссылка на PDF-резюме из профиля для баннера скачивания. */
  readonly cvUrl?: string | null;
  readonly isLoading?: boolean;
  readonly isError?: boolean;
  readonly onBack?: () => void;
  readonly onRetry?: () => void;
  readonly onDownloadCv?: () => void;
}

export function ContactPageView({
  contacts,
  intro,
  cvUrl,
  isLoading,
  isError,
  onBack = noop,
  onRetry = noop,
  onDownloadCv = noop,
}: ContactPageViewProps) {
  const { t } = useTranslation();
  const revealRef = useReveal();

  if (isError) {
    return (
      <main id="main" className={styles.page}>
        <ErrorState
          message={t('contact.error')}
          retryLabel={t('contact.retry')}
          onRetry={onRetry}
        />
      </main>
    );
  }

  return (
    <main id="main" className={styles.page} ref={revealRef}>
      <button type="button" className={styles.back} onClick={onBack}>
        <Icon name="arrow-right" size={14} className={styles.backIcon} />
        {t('contact.back')}
      </button>

      <div className={styles.breadcrumb}>{t('contact.breadcrumb')}</div>
      <Heading level="h1" className={styles.title}>
        {t('contact.title')}
      </Heading>
      {/* Скелетон рисуем только при intro === undefined, а пока профиль грузится,
          контейнер именно его и отдаёт. */}
      <PageIntro intro={intro} />

      <ContactLinks contacts={contacts} isLoading={isLoading} />
      <ResumeBanner cvUrl={cvUrl} isLoading={isLoading} onDownload={onDownloadCv} />
    </main>
  );
}
