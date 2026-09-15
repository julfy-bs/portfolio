import { supportedLanguages, type AppLanguage } from '@/shared/config';
import type { Settings } from '@/entities/settings';

interface SegmentedOptionDef {
  readonly value: string;
  readonly labelKey: string;
}

export interface SegmentedFieldDef {
  readonly name: Extract<keyof Settings, 'defaultLang' | 'defaultTheme'>;
  readonly labelKey: string;
  readonly descKey: string;
  readonly options: readonly SegmentedOptionDef[];
}

type BooleanSettingKey = Extract<
  keyof Settings,
  | 'consoleGlow'
  | 'showHighlights'
  | 'showAbout'
  | 'showStack'
  | 'showActivity'
  | 'showNow'
  | 'showFeatured'
  | 'showProjects'
  | 'showExperience'
  | 'showContact'
>;

export interface ToggleFieldDef {
  readonly name: BooleanSettingKey;
  readonly titleKey: string;
  readonly descKey: string;
}

export const SEGMENTED_FIELDS: readonly SegmentedFieldDef[] = [
  {
    name: 'defaultLang',
    labelKey: 'admin.settings.lang',
    descKey: 'admin.settings.langHint',
    options: [
      { value: 'ru', labelKey: 'admin.settings.langRu' },
      { value: 'en', labelKey: 'admin.settings.langEn' },
    ],
  },
  {
    name: 'defaultTheme',
    labelKey: 'admin.settings.theme',
    descKey: 'admin.settings.themeHint',
    options: [
      { value: 'dark', labelKey: 'admin.settings.themeDark' },
      { value: 'light', labelKey: 'admin.settings.themeLight' },
    ],
  },
];

/** Поведение сайта, видимость секций настраивается отдельно. */
export const TOGGLE_FIELDS: readonly ToggleFieldDef[] = [
  {
    name: 'consoleGlow',
    titleKey: 'admin.settings.glowTitle',
    descKey: 'admin.settings.glowDesc',
  },
];

/** Любую секцию главной можно выключить, кроме hero: без него страница теряет лицо. */
export const SECTION_TOGGLE_FIELDS: readonly ToggleFieldDef[] = [
  {
    name: 'showHighlights',
    titleKey: 'admin.settings.sections.highlightsTitle',
    descKey: 'admin.settings.sections.highlightsDesc',
  },
  {
    name: 'showAbout',
    titleKey: 'admin.settings.sections.aboutTitle',
    descKey: 'admin.settings.sections.aboutDesc',
  },
  {
    name: 'showStack',
    titleKey: 'admin.settings.sections.stackTitle',
    descKey: 'admin.settings.sections.stackDesc',
  },
  {
    name: 'showActivity',
    titleKey: 'admin.settings.activityTitle',
    descKey: 'admin.settings.activityDesc',
  },
  {
    name: 'showNow',
    titleKey: 'admin.settings.sections.nowTitle',
    descKey: 'admin.settings.sections.nowDesc',
  },
  {
    name: 'showFeatured',
    titleKey: 'admin.settings.sections.featuredTitle',
    descKey: 'admin.settings.sections.featuredDesc',
  },
];

export interface AccentOptionDef {
  /** Попадает в атрибут `data-accent`. */
  readonly value: string;
  readonly labelKey: string;
  /** Цвет свотча в пикере, взят из токена акцента для тёмной темы. */
  readonly color: string;
}

/** Значения должны совпадать с `[data-accent]` в токенах. */
export const ACCENT_OPTIONS: readonly AccentOptionDef[] = [
  { value: 'green', labelKey: 'admin.settings.accents.green', color: '#238636' },
  { value: 'blue', labelKey: 'admin.settings.accents.blue', color: '#1f6feb' },
  { value: 'bright', labelKey: 'admin.settings.accents.bright', color: '#3fb950' },
];

export interface LanguageFieldDef {
  readonly code: AppLanguage;
  readonly labelKey: string;
  readonly descKey: string;
}

export const LANGUAGE_FIELDS: readonly LanguageFieldDef[] = supportedLanguages.map((code) => ({
  code,
  labelKey: `admin.settings.languages.${code}`,
  descKey: `admin.settings.languages.${code}Desc`,
}));

/**
 * Выключенная страница отдаёт 404 и пропадает из навигации: из консольных `cd` и `ls`
 * и из CTA на главной.
 */
export const PAGE_TOGGLE_FIELDS: readonly ToggleFieldDef[] = [
  {
    name: 'showProjects',
    titleKey: 'admin.settings.pages.projectsTitle',
    descKey: 'admin.settings.pages.projectsDesc',
  },
  {
    name: 'showExperience',
    titleKey: 'admin.settings.pages.experienceTitle',
    descKey: 'admin.settings.pages.experienceDesc',
  },
  {
    name: 'showContact',
    titleKey: 'admin.settings.pages.contactTitle',
    descKey: 'admin.settings.pages.contactDesc',
  },
];
