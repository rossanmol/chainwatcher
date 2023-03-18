import { expect } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";

import component from "./top-widget";

const meta: Meta<typeof component> = {
	title: "Top Widget",
	component,
	tags: ["autodocs"],
};

type Story = StoryObj<typeof component>;

export const SingleItem: Story = {
	args: {
		title: "Leaderboard",
		items: [{ id: "one", url: "/wow" }],
	},
	play: async ({ canvasElement }) => {
		const rootElement = within(canvasElement);

		const widgetItems = await rootElement.findAllByTestId("widget-item");
		expect(widgetItems.length).toBe(1);

		const titleElement = await rootElement.findByTestId("widget-title");
		expect(titleElement.innerText).toBe("Leaderboard");
	},
};

export const FewItems: Story = {
	args: {
		title: "Leaderboard",
		items: [
			{ id: "one", url: "/wow" },
			{ id: "two", url: "/wow2" },
			{ id: "three", url: "/wow3" },
		],
	},
	play: async ({ canvasElement }) => {
		const rootElement = within(canvasElement);

		const widgetItems = await rootElement.findAllByTestId("widget-item");
		expect(widgetItems.length).toBe(3);

		const titleElement = await rootElement.findByTestId("widget-title");
		expect(titleElement.innerText).toBe("Leaderboard");
	},
};

export const NoItems: Story = {
	args: {
		title: "Leaderboard",
		items: [],
	},
	play: async ({ canvasElement }) => {
		const rootElement = within(canvasElement);

		const noResultsElement = await rootElement.findByTestId("no-results");
		expect(noResultsElement).toBeVisible();

		const titleElement = await rootElement.findByTestId("widget-title");
		expect(titleElement.innerText).toBe("Leaderboard");
	},
};

export default meta;
