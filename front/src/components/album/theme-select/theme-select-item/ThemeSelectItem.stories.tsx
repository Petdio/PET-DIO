import type { Meta, StoryObj } from '@storybook/react';

import ThemeSelectItem from './ThemeSelectItem';

const meta = {
  title: 'album/ThemeSelectItem',
  component: ThemeSelectItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeSelectItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    themeName: '우주복',
  },
};
