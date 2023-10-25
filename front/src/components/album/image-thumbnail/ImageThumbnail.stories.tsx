import type { Meta, StoryObj } from '@storybook/react';

import ImageThumbnail from './ImageThumbnail';

const meta = {
  title: 'album/ImageThumbnail',
  component: ImageThumbnail,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ImageThumbnail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    imgSrc:
      'https://i.etsystatic.com/43024071/r/il/c8edcb/4861314808/il_fullxfull.4861314808_amys.jpg',
  },
};
