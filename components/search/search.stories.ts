import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { expect } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";

import component from "./search";

const meta: Meta<typeof component> = {
	title: "Search",
	component,
	tags: ["autodocs"],
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

export const P2PKHSearch: Story = {
	name: "P2PKH Search",
	play: async ({ canvasElement }) => {
		const rootElement = within(canvasElement);

		const inputElement = await rootElement.findByTestId("search-input");

		const hashes = [
			"1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
			"17VZNX1SN5NtKa8UQFxwQbFeFc3iqRYhem",
			"1QLbz7JHiBTspS962RLKV8GndWFwi5j6Qr",
		];

		for (const address of hashes) {
			userEvent.clear(inputElement);
			userEvent.type(inputElement, address);
			const resultsElement = await rootElement.findByTestId("search-results");
			expect(resultsElement.innerText).toContain(`Address: ${address}`);
			expect(resultsElement.innerText).not.toContain(`Transaction:`);
			expect(resultsElement.innerText).not.toContain(`No results found :(`);
		}
	},
};

export const P2SHAddressSearch: Story = {
	name: "P2SH Address Search",
	play: async ({ canvasElement }) => {
		const rootElement = within(canvasElement);

		const inputElement = await rootElement.findByTestId("search-input");

		const hashes = [
			"3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy",
			"3D2oetdNuZUqQHPJmcMDDHYoqkyNVsFk9r",
			"3Cbq7aT1tY8kMxWLbitaG7yT6bPbKChq64",
		];

		for (const address of hashes) {
			userEvent.clear(inputElement);

			userEvent.type(inputElement, address);
			const resultsElement = await rootElement.findByTestId("search-results");
			expect(resultsElement.innerText).toContain(`Address: ${address}`);
			expect(resultsElement.innerText).not.toContain(`Transaction:`);
			expect(resultsElement.innerText).not.toContain(`No results found :(`);
		}
	},
};

export const Bech32addressSearch: Story = {
	name: "Bech32 Address Search",
	play: async ({ canvasElement }) => {
		const rootElement = within(canvasElement);

		const inputElement = await rootElement.findByTestId("search-input");

		const hashes = [
			"bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4",
			"bc1q9x30z7rz52c97jwc2j79w76y7l3ny54nlvd4ew",
			"bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq",
		];

		for (const address of hashes) {
			userEvent.clear(inputElement);
			userEvent.type(inputElement, address);
			const resultsElement = await rootElement.findByTestId("search-results");
			expect(resultsElement.innerText).toContain(`Address: ${address}`);
			expect(resultsElement.innerText).not.toContain(`Transaction:`);
			expect(resultsElement.innerText).not.toContain(`No results found :(`);
		}
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
