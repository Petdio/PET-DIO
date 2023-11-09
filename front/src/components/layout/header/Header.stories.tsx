import type { Meta, StoryObj } from "@storybook/react";

import Header from "./Header";

const meta = {
  title: "layout/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
