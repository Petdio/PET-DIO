import type { Meta, StoryObj } from '@storybook/react';

import Subtitle from './Subtitle';

const meta = {
  title: 'studio/Subtitle',
  component: Subtitle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Subtitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { content: '이미지를 저장해요.', mode: 'common' },
};
