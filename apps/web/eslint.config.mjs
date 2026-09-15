// @ts-check
import js from '@eslint/js';
import boundaries from 'eslint-plugin-boundaries';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import storybook from 'eslint-plugin-storybook';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'dist',
      'coverage',
      'storybook-static',
      'public/mockServiceWorker.js',
      '.storybook',
      'e2e',
      'playwright.config.ts',
      'vite.config.ts',
      '*.config.*',
    ],
  },

  // Исходники приложения, правила с проверкой типов.
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: { ...globals.browser },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: { version: 'detect' },
      // Без TypeScript-резолвера boundaries не видит `.ts`/`.tsx` и алиас `@/`
      // (node-резолвер знает только `.js`) и молча пропускает все импорты.
      'import/resolver': {
        typescript: { alwaysTryTypes: true, project: './tsconfig.app.json' },
      },
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app' },
        { type: 'pages', pattern: 'src/pages/*' },
        { type: 'widgets', pattern: 'src/widgets/*' },
        { type: 'features', pattern: 'src/features/*' },
        { type: 'entities', pattern: 'src/entities/*' },
        { type: 'shared', pattern: 'src/shared/*' },
      ],
      'boundaries/ignore': ['**/*.test.*', '**/*.stories.*'],
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      boundaries,
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat['jsx-runtime'].rules,
      ...jsxA11y.flatConfigs.recommended.rules,

      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'separate-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // Слой импортирует только нижележащие слои и только через точку входа:
      // `index.ts` или `mocks.ts`. Моки вынесены в отдельный вход, чтобы msw не
      // попал в прод-бандл. Импорты внутри слайса не проверяются (`checkInternals`
      // выключен), так что относительные `./` там в порядке.
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: { type: 'app' },
              allow: {
                to: {
                  type: ['app', 'pages', 'widgets', 'features', 'entities', 'shared'],
                  internalPath: ['index.ts', 'mocks.ts'],
                },
              },
            },
            {
              from: { type: 'pages' },
              allow: {
                to: {
                  type: ['pages', 'widgets', 'features', 'entities', 'shared'],
                  internalPath: ['index.ts', 'mocks.ts'],
                },
              },
            },
            {
              from: { type: 'widgets' },
              allow: {
                to: {
                  type: ['widgets', 'features', 'entities', 'shared'],
                  internalPath: ['index.ts', 'mocks.ts'],
                },
              },
            },
            {
              from: { type: 'features' },
              allow: {
                to: {
                  type: ['features', 'entities', 'shared'],
                  internalPath: ['index.ts', 'mocks.ts'],
                },
              },
            },
            {
              from: { type: 'entities' },
              allow: {
                to: { type: ['entities', 'shared'], internalPath: ['index.ts', 'mocks.ts'] },
              },
            },
            {
              from: { type: 'shared' },
              allow: { to: { type: ['shared'], internalPath: ['index.ts', 'mocks.ts'] } },
            },
          ],
        },
      ],
    },
  },

  {
    files: ['src/**/*.stories.{ts,tsx}'],
    extends: [storybook.configs['flat/recommended']],
  },

  // Тесты не участвуют в HMR, правило react-refresh им ни к чему.
  {
    files: ['src/**/*.{test,spec}.{ts,tsx}', 'src/app/test/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },

  // Prettier идёт последним, чтобы перекрыть конфликтующие правила стиля.
  prettierRecommended,
);
