import type { Meta, StoryObj } from '@storybook/react';

import NoImage from './NoImage';

const meta = {
  title: 'album/NoImage',
  component: NoImage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NoImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
