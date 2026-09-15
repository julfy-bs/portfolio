import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { mockProfileAdmin } from '@/entities/profile/mocks';

import { AdminProfileView } from './ui/admin-profile-view';

const meta = {
  title: 'Widgets/AdminProfile',
  component: AdminProfileView,
  parameters: { layout: 'padded', controls: { expanded: true } },
  args: {
    profile: mockProfileAdmin,
    locale: 'ru',
    isSaving: false,
    onSave: fn(),
    onUploadAvatar: fn(() => Promise.resolve('/uploads/avatar/demo.png')),
    onUploadCv: fn(() => Promise.resolve('/uploads/cv/demo.pdf')),
  },
  argTypes: {
    profile: { control: false, table: { category: 'Данные' } },
    locale: {
      control: 'inline-radio',
      options: ['ru', 'en'],
      table: { category: 'Состояние' },
    },
    isSaving: { control: 'boolean', table: { category: 'Состояние' } },
    onSave: { control: false, table: { category: 'События' } },
    onUploadAvatar: { control: false, table: { category: 'События' } },
    onUploadCv: { control: false, table: { category: 'События' } },
  },
} satisfies Meta<typeof AdminProfileView>;

export default meta;

type Story = StoryObj<typeof meta>;

/** В локали RU правится только русский текст. */
export const Default: Story = {
  name: 'Форма профиля (RU)',
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    // Ищем по роли, а не через getByLabelText: звёздочка обязательного поля с `aria-hidden`
    // попадает в textContent, но не в доступное имя.
    await expect(canvas.getByRole('textbox', { name: 'Роль' })).toHaveValue(
      'Fullstack-разработчик',
    );
    const name = canvas.getByRole('textbox', { name: 'Имя' });
    await userEvent.clear(name);
    await userEvent.type(name, 'Bogdan S.');
    await userEvent.click(canvas.getByRole('button', { name: /Сохранить/ }));
    await expect(args.onSave).toHaveBeenCalled();
  },
};

/** В локали EN подставляются английские значения, и изменения уйдут в `en`. */
export const English: Story = {
  name: 'Форма профиля (EN)',
  args: { locale: 'en' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('textbox', { name: 'Роль' })).toHaveValue('Full Stack Developer');
  },
};

/** Добавление нового показателя со значением и подписью. */
export const Highlights: Story = {
  name: 'Показатели (добавление)',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const before = canvas.getAllByRole('textbox', { name: 'Значение' }).length;
    await userEvent.click(canvas.getByRole('button', { name: '+ показатель' }));
    await expect(canvas.getAllByRole('textbox', { name: 'Значение' })).toHaveLength(before + 1);
  },
};

/** Пока идёт сохранение, кнопка заблокирована. Сам бар появляется после правки. */
export const Saving: Story = {
  name: 'Сохранение',
  args: { isSaving: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const name = canvas.getByRole('textbox', { name: 'Имя' });
    await userEvent.clear(name);
    await userEvent.type(name, 'X');
    await expect(canvas.getByRole('button', { name: /Сохранить/ })).toBeDisabled();
  },
};
