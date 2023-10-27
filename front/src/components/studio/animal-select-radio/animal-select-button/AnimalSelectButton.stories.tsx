import type { Meta, StoryObj } from '@storybook/react';

import AnimalSelectButton from './AnimalSelectButton';

const meta = {
  title: 'studio/AnimalSelectButton',
  component: AnimalSelectButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AnimalSelectButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { content: '개', size: 'large', isSelected: false },
};
