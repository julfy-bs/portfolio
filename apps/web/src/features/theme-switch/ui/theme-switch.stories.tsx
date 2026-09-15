import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { LangSwitch } from '@/features/lang-switch';

import { ThemeSwitch } from './theme-switch';

const meta = {
  title: 'Features/ThemeSwitch',
  component: ThemeSwitch,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ThemeSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Клик переключает тему. Тема глобальная, поэтому кликаем дважды и возвращаем
 * исходную, чтобы не задеть соседние истории. Тему всего Storybook можно
 * переключить и в тулбаре.
 */
export const Playground: Story = {
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    const initial = button.getAttribute('aria-label');

    await userEvent.click(button);
    await expect(button.getAttribute('aria-label')).not.toBe(initial);

    await userEvent.click(button);
    await expect(button.getAttribute('aria-label')).toBe(initial);
  },
};

/** Правый блок навбара, тема рядом с языком. */
export const InContext: Story = {
  name: 'В контексте: правый блок навбара',
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 8,
        alignItems: 'center',
        padding: 8,
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-card)',
      }}
    >
      <ThemeSwitch />
      <LangSwitch />
    </div>
  ),
};
