import type { Meta, StoryObj } from "@storybook/react";

import component from "./copy-to-clipboard";

const meta: Meta<typeof component> = {
	title: "Copy to Clipboard Button",
	component,
	tags: ["autodocs"],
	argTypes: {
		text: {
			control: "string",
		},
	},
};

type Story = StoryObj<typeof component>;
export const CopyToClipboard: Story = {
	args: {
		text: "hello",
	},
};

export default meta;
