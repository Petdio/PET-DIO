import type { Meta, StoryObj } from '@storybook/react';

import ThemeSelectBottomSheet from './ThemeSelectBottomSheet';

const meta = {
  title: 'album/ThemeSelectBottomSheet',
  component: ThemeSelectBottomSheet,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeSelectBottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    themeNameList: [],
    isOpen: true,
    themeIdx: 0,
  },
};
