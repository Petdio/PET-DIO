import type { Meta, StoryObj } from '@storybook/react';

import GenerateAlert from './GenerateAlert';

const meta = {
  title: 'common/GenerateAlert',
  component: GenerateAlert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GenerateAlert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
