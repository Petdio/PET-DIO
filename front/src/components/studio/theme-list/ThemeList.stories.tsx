import type { Meta, StoryObj } from "@storybook/react";

import ThemeList from "./ThemeList";

const meta = {
  title: "studio/ThemeList",
  component: ThemeList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ThemeList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
