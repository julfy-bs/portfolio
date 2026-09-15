import type { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';

import { setupI18n } from '@/shared/config';

const i18n = setupI18n();

export function WithI18n({ children }: { children: ReactNode }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
