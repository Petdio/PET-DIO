import type { Meta, StoryObj } from '@storybook/react';

import PhotoAddBox from './PhotoAddBox';

const meta = {
  title: 'studio/PhotoAddBox',
  component: PhotoAddBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PhotoAddBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    imgSrc:
      'https://static.displate.com/857x1200/displate/2023-04-06/11f93ddb07ad9e1aa4e1281d77d6bcc2_423963312516d8608dbcee6a41f6b374.jpg',
  },
};
