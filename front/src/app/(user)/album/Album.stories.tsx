import type { Meta, StoryObj } from '@storybook/react';

import Album from './page';

const meta = {
  title: 'Pages/Album',
  component: Album,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Album>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { albumList: [] },
};
