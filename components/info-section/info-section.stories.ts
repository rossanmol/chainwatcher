import { expect } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/testing-library";

import component from "./info-section";

const meta: Meta<typeof component> = {
	title: "Info Section",
	component,
	tags: ["autodocs"],
};

type Story = StoryObj<typeof component>;
export const ShortContents: Story = {
	args: {
		title: "Title",
		value: "Value",
	},
	play: async ({ canvasElement, args }) => {
		const rootElement = within(canvasElement);

		const titleEl = await rootElement.findByTestId("info-section-title");
		expect(titleEl.innerText).toBe(args.title);

		const valueEl = await rootElement.findByTestId("info-section-value");
		expect(valueEl.innerText).toBe(args.value);
	},
};

export const LongText: Story = {
	args: {
		title: "Really long title is what we want",
		value: "And super long description, like if it had between 15 to 20 words.",
	},
	play: async ({ canvasElement, args }) => {
		const rootElement = within(canvasElement);

		const titleEl = await rootElement.findByTestId("info-section-title");
		expect(titleEl.innerText).toBe(args.title);

		const valueEl = await rootElement.findByTestId("info-section-value");
		expect(valueEl.innerText).toBe(args.value);
	},
};

export default meta;
