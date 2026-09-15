import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { mockTechnologies } from '@/entities/technology/mocks';

import { Stack } from './ui/stack';

const meta = {
  title: 'Widgets/Stack',
  component: Stack,
  parameters: { layout: 'padded', controls: { expanded: true } },
  args: { technologies: mockTechnologies, isLoading: false },
  argTypes: {
    isLoading: { control: 'boolean', table: { category: 'Состояние' } },
    technologies: { control: 'object', table: { category: 'Данные' } },
    id: { control: false, table: { disable: true } },
    className: { control: false, table: { disable: true } },
  },
  decorators: [(Story) => <div style={{ maxWidth: 'var(--container-page)' }}>{Story()}</div>],
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Заголовок и карточки слоёв с технологиями. */
export const Playground: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { name: '// стек' })).toBeInTheDocument();
    await expect(canvas.getByText('Frontend')).toBeInTheDocument();
    await expect(canvas.getByText('NestJS')).toBeInTheDocument();
  },
};

/** Технологии грузятся: скелетон карточек. */
export const Loading: Story = {
  name: 'Ожидание данных (isLoading)',
  args: { isLoading: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByText('Frontend')).not.toBeInTheDocument();
  },
};

/** Край: стек пустой, заголовок есть, карточек нет. */
export const Empty: Story = {
  name: 'Край: пустой стек',
  args: { technologies: [] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { name: '// стек' })).toBeInTheDocument();
  },
};

/** Мобильная раскладка: грид сжимается с 3 колонок до 2, потом до 1. */
export const Mobile: Story = {
  name: 'Мобильная раскладка',
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};
