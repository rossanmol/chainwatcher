import { expect } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/testing-library";

import component from "./currency-select";

const meta: Meta<typeof component> = {
	title: "Currency Select",
	component,
	tags: ["autodocs"],
};

type Story = StoryObj<typeof component>;
export const ShortContents: Story = {
	args: {
		title: "Title",
		value: "Value",
	},
};

export const CurrencySelect: Story = {};

export default meta;
