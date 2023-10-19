import type { Meta, StoryObj } from '@storybook/react';
import BottomNav from './BottomNav';

const meta = {
  title: 'common/BottomNav',
  component: BottomNav,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BottomNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { activeNum: 0 },
};
