import type { Meta, StoryObj } from '@storybook/react';

import AlbumPage from './page';

const meta = {
  title: 'Pages/AlbumPage',
  component: AlbumPage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AlbumPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { albumList: [] },
};
