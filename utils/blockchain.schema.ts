import { z } from "zod";

export const CurrencyResponse = z.object({
	merchant: z.object({
		USD: z.number(),
		EUR: z.number(),
	}),
	trader: z.object({
		sell: z.object({
			USD: z.number(),
			EUR: z.number(),
		}),
		buy: z.object({
			USD: z.number(),
			EUR: z.number(),
		}),
	}),
});

export const BlockchainAddressResponse = z.object({
	data: z.record(
		z.string(),
		z.object({
			address: z.object({
				transaction_count: z.number(),
				received: z.number(),
				spent: z.number(),
				unspent_output_count: z.number(),
				balance: z.number(),
			}),
		})
	),
});

export const BlockchainTransactionResponse = z.object({
	data: z.record(
		z.string(),
		z.object({
			transaction: z.object({
				hash: z.string(),
				size: z.number(),
				time: z.string(),
				input_total: z.number(),
				output_total: z.number(),
				fee: z.number(),
			}),
		})
	),
	context: z.object({
		state: z.number(),
	}),
});
