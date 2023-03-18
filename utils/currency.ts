import { Currency, CurrencyResponse, CurrencySchema } from "./blockchain.schema";

export function getReadableCurrency(btcAmount: number, exchangeRate: number, currency: Currency) {
	const amount = btcAmount * exchangeRate;

	return `${currency === Currency.btc ? amount : amount.toFixed(2)} ${currency}`;
}

export async function getExchangeRate(rawCurrency?: string | undefined) {
	const currency = parseCurrency(rawCurrency);
	if (currency === Currency.btc) {
		return {
			currency,
			value: 1,
		};
	}

	const res = await fetch(`https://api.coingate.com/v2/rates/merchant/BTC/${currency}`);
	const json = await res.json();

	return {
		currency,
		value: CurrencyResponse.parse(json),
	};
}

export function parseCurrency(currency: string | undefined) {
	const parsedCurrency = CurrencySchema.safeParse(currency);
	return parsedCurrency.success ? parsedCurrency.data : Currency.btc;
}
