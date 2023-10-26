import type { Meta, StoryObj } from '@storybook/react';

import DetailModal from './DetailModal';

const meta = {
  title: 'album/DetailModal',
  component: DetailModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DetailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    imgInfo: {
      imgSrc:
        'https://ih1.redbubble.net/image.4687883701.0033/flat,750x,075,f-pad,750x1000,f8f8f8.jpg',
      date: '2023년 10월 23일',
    },
    themeName: '우주복',
    isOpen: true,
  },
};
