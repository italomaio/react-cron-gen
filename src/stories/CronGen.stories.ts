import type { Meta, StoryObj } from "@storybook/react-vite";
import { CronGen } from "../components";
import { fn } from "storybook/test";
import "@/styles.css";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "UI/CronGen",
  component: CronGen,
  parameters: {
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    type: { control: "select", options: ["unix", "quartz"] },
    locale: { control: "select", options: ["pt-BR", "en-US"] },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    onValueChange: fn((values) => console.log(values)),
  },
} satisfies Meta<typeof CronGen>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Basic: Story = {
  args: {
    locale: "en-US",
    type: "unix",
  },
};
