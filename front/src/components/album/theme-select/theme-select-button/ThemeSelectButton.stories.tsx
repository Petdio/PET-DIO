import type { Meta, StoryObj } from '@storybook/react';

import ThemeSelectButton from './ThemeSelectButton';

const meta = {
  title: 'album/ThemeSelectButton',
  component: ThemeSelectButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeSelectButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { isFiltered: true },
};
