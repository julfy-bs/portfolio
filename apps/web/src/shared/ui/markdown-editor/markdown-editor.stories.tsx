import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Markdown } from '../markdown';

import { MarkdownEditor } from './markdown-editor';

const sample = `## Заголовок

Абзац с **акцентом**, [ссылкой](https://example.com) и \`inline code\`.

| Технология | Роль | Уровень |
| ---------- | ---- | ------- |
| React      | UI   | Senior  |
| NestJS     | API  | Middle  |
`;

const meta = {
  title: 'Shared/MarkdownEditor',
  component: MarkdownEditor,
  parameters: { layout: 'padded' },
  args: {
    value: '',
    // Нужен только для типов, настоящий обработчик подставляет `render`.
    onChange: () => undefined,
    sourceLabel: 'MARKDOWN',
    splitLabel: 'split',
    previewLabel: 'preview',
    ariaLabel: 'Markdown',
    renderPreview: (source: string) => <Markdown>{source}</Markdown>,
  },
  argTypes: {
    value: { control: false },
    onChange: { control: false },
    renderPreview: { control: false },
  },
  // Компонент управляемый, без своего состояния в истории ввод бы не работал.
  render: (args) => {
    const [value, setValue] = useState(args.value ?? '');
    return <MarkdownEditor {...args} value={value} onChange={setValue} />;
  },
} satisfies Meta<typeof MarkdownEditor>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Слева исходник, справа живое превью. */
export const Split: Story = {
  name: 'Split + превью',
  args: { value: sample },
};

export const Empty: Story = {
  name: 'Пустой',
  args: { value: '' },
};

export const WithError: Story = {
  name: 'С ошибкой',
  args: { value: '', error: 'Заполните полное описание' },
};
