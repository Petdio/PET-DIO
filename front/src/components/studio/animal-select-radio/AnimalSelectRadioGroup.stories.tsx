import type { Meta, StoryObj } from '@storybook/react';

import AnimalSelectRadioGroup from './AnimalSelectRadioGroup';

const meta = {
  title: 'studio/AnimalSelectRadioGroup',
  component: AnimalSelectRadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AnimalSelectRadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { animalItems: ['개', '고양이'] },
};
