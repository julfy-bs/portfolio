import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

import Avatar from './avatar';
import mdx from './avatar.mdx';

type AvatarProps = ComponentProps<typeof Avatar>;

const meta: Meta<AvatarProps> = {
  title: 'avatar',
  component: Avatar,
  args: {
    size: 'big',
    image: '',
    alt: '',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 40,
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      description: 'Размер Аватара.',
      table: { defaultValue: { summary: 'big' } },
      options: ['small', 'big'],
      control: { type: 'radio' },
    },
    image: {
      description: 'Ссылка на картинку.',
      table: { defaultValue: { summary: '' } },
      control: { type: 'file', accept: ['.png', '.jpg', '.jpeg'] },
    },
    alt: {
      description: 'Описание alt для картинки.',
      table: { defaultValue: { summary: 'Фото пользователя.' } },
      control: 'text',
    },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: mdx,
      story: { inline: true }, // render the story in an iframe
      source: { type: 'code' }, // forces the raw source code (rather than the rendered JSX).
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const ExampleAvatar: Story = {
  render: ({ ...args }) => <Avatar {...args} />,
};
