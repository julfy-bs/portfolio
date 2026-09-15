import { useNavigate } from 'react-router-dom';

import { useProfile } from '@/entities/profile';
import { routePaths } from '@/shared/config';
import { downloadFile } from '@/shared/lib';

import { ContactPageView } from './contact-page-view';

export function ContactPage() {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useProfile();

  return (
    <ContactPageView
      contacts={data?.contacts}
      intro={data?.contactIntro}
      cvUrl={data?.cvUrl}
      isLoading={isLoading}
      isError={isError}
      onBack={() => void navigate(routePaths.home)}
      onRetry={() => void refetch()}
      onDownloadCv={() => downloadFile(data?.cvUrl)}
    />
  );
}
