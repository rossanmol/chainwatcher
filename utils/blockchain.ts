import {
	BlockchainAddressResponse,
	BlockchainTransactionResponse,
	CurrencyResponse,
} from "./blockchain.schema";

function convertBalance(balance: number) {
	return Number((balance / Math.pow(10, 10)).toFixed(10));
}

export async function getCurrencies() {
	const res = await fetch("https://api.coingate.com/v2/rates");
	const json = await res.json();

	const parsedJson = CurrencyResponse.parse(json);
	return parsedJson;
}

export async function getAddress(hash: string) {
	const res = await fetch(
		`https://api.blockchair.com/bitcoin/dashboards/address/${hash}?key=G___aunp0Qn4vEVyqVJc38t1u6OkJsNX`
	);

	const json = await res.json();
	const parsedJson = BlockchainAddressResponse.parse(json);
	const address = parsedJson.data[hash].address;

	return {
		totalTransactions: address.transaction_count,
		received: convertBalance(address.received),
		sent: convertBalance(address.spent),
		unspent: convertBalance(address.unspent_output_count),
		balance: convertBalance(address.balance),
	};
}

export async function getTransaction(hash: string) {
	console.log("wow fetching", Math.random());
	const res = await fetch(
		`https://api.blockchair.com/bitcoin/dashboards/transaction/${hash}`
	);
	const json = await res.json();
	const parsedJson = BlockchainTransactionResponse.parse(json);
	const transaction = parsedJson.data[hash].transaction;

	return {
		hash: transaction.hash,
		receivedTime: new Date(transaction.time).toISOString(),
		status: parsedJson.context.state > 3 ? "confirmed" : "pending",
		sizeInBytes: transaction.size,
		confirmations: parsedJson.context.state,
		totalBtcInput: transaction.input_total,
		totalBtcOutput: transaction.output_total,
		totalFees: transaction.fee,
	};
}
