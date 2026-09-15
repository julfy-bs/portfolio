import type { Preview } from '@storybook/react-vite';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { themes } from 'storybook/theming';

import '../src/styles/index.css';

/**
 * В отличие от Storybook приложения, здесь нет Redux, i18n и роутера: UI Kit не знает о домене
 * и получает тексты пропами. Компонентам нужны только токены и тема через `data-theme` на <html>,
 * как у консюмера.
 */
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo': нарушения видны в тест-UI, а валить сборку должны unit-тесты (vitest-axe).
      test: 'todo',
    },
    docs: {
      theme: themes.dark,
      source: { dark: true },
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: { dark: 'dark', light: 'light' },
      defaultTheme: 'dark',
      attributeName: 'data-theme',
    }),
  ],
};

export default preview;
