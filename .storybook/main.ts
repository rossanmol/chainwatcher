import path from "path";
import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
	stories: ["../components/**/*.stories.@(js|jsx|ts|tsx)", "../app/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
	framework: {
		name: "@storybook/nextjs",
		options: {
			nextConfigPath: path.resolve(__dirname, "../next.config.js"),
		},
	},
	docs: {
		autodocs: "tag",
	},
};

export const parameters = {
	nextjs: {
		appDirectory: true,
		navigation: {
			pathname: "/",
			query: {},
		},
	},
};

export default config;
