import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactElement } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { expect, within } from 'storybook/test';

import { Heading, Text } from '@sutuzhko/ui-kit';

import { RootLayout } from './root-layout';

const meta = {
  title: 'App/RootLayout',
  component: RootLayout,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof RootLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

// Страница рендерит свой <main>, как настоящие маршруты.
function SamplePage() {
  return (
    <main
      id="main"
      style={{
        maxWidth: 'var(--container-detail)',
        margin: '0 auto',
        padding: 'var(--space-8) var(--space-6)',
        display: 'grid',
        gap: 'var(--space-4)',
      }}
    >
      <Heading level="h1">Содержимое маршрута</Heading>
      <Text tone="muted">
        Навбар и подвал приходят из лейаута, страница рендерит только свой контент в своём
        контейнере. Подвал прижат к низу даже на коротких страницах.
      </Text>
    </main>
  );
}

const renderLayout = (): ReactElement => (
  <MemoryRouter>
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<SamplePage />} />
      </Route>
    </Routes>
  </MemoryRouter>
);

export const Playground: Story = {
  name: 'Оболочка приложения',
  render: renderLayout,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('banner')).toBeInTheDocument();
    await expect(canvas.getByRole('main')).toBeInTheDocument();
    await expect(canvas.getByRole('contentinfo')).toBeInTheDocument();
  },
};

/** На узком экране отступы меньше, а бренд в навбаре скрыт. */
export const Mobile: Story = {
  name: 'Мобильная ширина',
  render: renderLayout,
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};
