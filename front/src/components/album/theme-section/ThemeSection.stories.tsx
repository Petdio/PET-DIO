import type { Meta, StoryObj } from '@storybook/react';

import ThemeSection from './ThemeSection';

const meta = {
  title: 'album/ThemeSection',
  component: ThemeSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    themeName: '우주복',
    imgList: [
      {
        albumId: 0,
        albumURL:
          'https://static.displate.com/857x1200/displate/2023-04-06/11f93ddb07ad9e1aa4e1281d77d6bcc2_423963312516d8608dbcee6a41f6b374.jpg',
        albumCreated: '2023년 10월 24일',
      },
      {
        albumId: 0,
        albumURL:
          'https://pics.craiyon.com/2023-07-04/6b144ee610894f449a9ede38cebad5d8.webp',
        albumCreated: '2023년 10월 24일',
      },
      {
        albumId: 0,
        albumURL:
          'https://ih1.redbubble.net/image.4687883701.0033/flat,750x,075,f-pad,750x1000,f8f8f8.jpg',
        albumCreated: '2023년 10월 24일',
      },
      {
        albumId: 0,
        albumURL:
          'https://static.displate.com/857x1200/displate/2023-04-05/6f7f534eb294d8e489a24161f5842323_6964e21b0d986e9abe66409a75cb594c.jpg',
        albumCreated: '2023년 10월 24일',
      },
    ],
  },
};
