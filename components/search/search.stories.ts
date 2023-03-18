import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { expect } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";

import component from "./search";

const meta: Meta<typeof component> = {
	title: "Search",
	component,
	tags: ["autodocs"],
	parameters: {
		nextjs: {
			appDirectory: true,
			navigation: {
				pathname: "/",
				query: {},
			},
		},
	},
};

type Story = StoryObj<typeof component>;

export const InvalidSearch: Story = {
	play: async ({ canvasElement, args }) => {
		const rootElement = within(canvasElement);

		const inputElement = await rootElement.findByTestId("search-input");

		userEvent.type(inputElement, "hello");
		const resultsElement = await rootElement.findByTestId("search-results");
		expect(resultsElement.innerText).toContain("No results found :(");
	},
};

export const AddressSearch: Story = {
	play: async ({ canvasElement }) => {
		const rootElement = within(canvasElement);

		const inputElement = await rootElement.findByTestId("search-input");

		const address = "1AJbsFZ64EpEfS5UAjAfcUG8pH8Jn3rn1F";
		userEvent.type(inputElement, address);
		const resultsElement = await rootElement.findByTestId("search-results");
		expect(resultsElement.innerText).toContain(`Address: ${address}`);
		expect(resultsElement.innerText).not.toContain(`Transaction:`);
		expect(resultsElement.innerText).not.toContain(`No results found :(`);
	},
};

export const ShortAddressSearch: Story = {
	play: async ({ canvasElement }) => {
		const rootElement = within(canvasElement);

		const inputElement = await rootElement.findByTestId("search-input");

		const address = "1A1zP1eP5QGefi2DMPTfTL5SLmv2";
		userEvent.type(inputElement, address);
		const resultsElement = await rootElement.findByTestId("search-results");
		expect(resultsElement.innerText).toContain(`Address: ${address}`);
		expect(resultsElement.innerText).not.toContain(`Transaction:`);
		expect(resultsElement.innerText).not.toContain(`No results found :(`);
	},
};

export const TransactionSearch: Story = {
	play: async ({ canvasElement }) => {
		const rootElement = within(canvasElement);

		const inputElement = await rootElement.findByTestId("search-input");

		const transaction = "8e5e6b898750a7afbe683a953fbf30bd990bb57ccd2d904c76df29f61054e743";
		userEvent.type(inputElement, transaction);
		const resultsElement = await rootElement.findByTestId("search-results");
		expect(resultsElement.innerText).toContain(`Transaction: ${transaction}`);
		expect(resultsElement.innerText).not.toContain(`Address:`);
		expect(resultsElement.innerText).not.toContain(`No results found :(`);
	},
};

export const SmallScreenView: Story = {
	parameters: {
		viewport: {
			//👇 The viewports you want to use
			viewports: INITIAL_VIEWPORTS,
			//👇 Your own default viewport
			defaultViewport: "iphone6",
		},
	},
	play: async ({ canvasElement, cont }) => {
		const rootElement = within(canvasElement);

		expect(await rootElement.findByTestId("search-input")).not.toBeVisible();
		expect(await rootElement.findByTestId("mobile-button-container")).toBeVisible();

		userEvent.click(await rootElement.findByTestId("mobile-button"));
		expect(await rootElement.findByTestId("search-input")).toBeVisible();
		expect(await rootElement.findByTestId("mobile-close-button")).toBeVisible();

		userEvent.type(await rootElement.findByTestId("search-input"), "hello");
		const resultsElement = await rootElement.findByTestId("search-results");
		expect(resultsElement).toBeVisible();

		userEvent.click(await rootElement.findByTestId("mobile-close-button"));
		expect(await rootElement.findByTestId("search-input")).not.toBeVisible();
		expect(await rootElement.findByTestId("mobile-button-container")).toBeVisible();
	},
};

export default meta;
