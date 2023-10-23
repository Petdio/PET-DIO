import type { Meta, StoryObj } from '@storybook/react';

import ChevronButton from './ChevronButton';

const meta = {
  title: 'album/ChevronButton',
  component: ChevronButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ChevronButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { direction: 'left' },
};
