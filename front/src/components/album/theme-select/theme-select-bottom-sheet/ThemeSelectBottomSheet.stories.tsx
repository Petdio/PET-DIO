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
    themeNameList: [
      '우주복',
      '크리스마스',
      '히어로',
      '웨딩',
      '신사',
      '사람과 함께',
      '캐릭터',
      '캐주얼',
    ],
    isOpen: true,
    themeIdx: 0,
  },
};
