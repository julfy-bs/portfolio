import type { IconName } from '@sutuzhko/ui-kit';

/** Union пополняется, когда очередная вкладка готова. */
export type AdminTabId =
  'profile' | 'projects' | 'experience' | 'stack' | 'education' | 'kb' | 'locale' | 'settings';

export interface AdminTabDef {
  readonly id: AdminTabId;
  readonly labelKey: string;
  readonly icon: IconName;
}

/** Единый список вкладок и для навигации, и для контента. */
export const ADMIN_TABS: readonly AdminTabDef[] = [
  { id: 'profile', labelKey: 'admin.tabs.profile', icon: 'user' },
  { id: 'projects', labelKey: 'admin.tabs.projects', icon: 'layers' },
  { id: 'experience', labelKey: 'admin.tabs.experience', icon: 'briefcase' },
  { id: 'stack', labelKey: 'admin.tabs.stack', icon: 'stack' },
  { id: 'education', labelKey: 'admin.tabs.education', icon: 'cap' },
  { id: 'kb', labelKey: 'admin.tabs.kb', icon: 'file' },
  { id: 'locale', labelKey: 'admin.tabs.locale', icon: 'globe' },
  { id: 'settings', labelKey: 'admin.tabs.settings', icon: 'settings' },
];
