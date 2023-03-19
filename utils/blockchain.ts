import { BlockchainAddressResponse, BlockchainTransactionResponse } from "./blockchain.schema";

function convertBalance(balance: number) {
	return Number(balance / 1e8);
}

export async function getAddress(hash: string) {
	const res = await fetch(
		`https://api.blockchair.com/bitcoin/dashboards/address/${hash}?key=${process.env.CHAIRGATE_TOKEN}`
	);

	const json = await res.json();
	if (!json) {
		return undefined;
	}
	const parsedJson = BlockchainAddressResponse.parse(json);
	const address = parsedJson.data[hash].address;

	return {
		hash,
		totalTransactions: address.transaction_count,
		received: convertBalance(address.received),
		spent: convertBalance(address.spent),
		// Had trouble figuring out the unspent value, in the context of an address
		unspent: convertBalance(address.balance),
		unspentOutputCount: address.unspent_output_count,
		balance: convertBalance(address.balance),
	};
}

export async function getTransaction(hash: string) {
	const res = await fetch(`https://api.blockchair.com/bitcoin/dashboards/transaction/${hash}`);

	try {
		const json = await res.json();

		const parsedJson = BlockchainTransactionResponse.parse(json);
		const transaction = parsedJson.data[hash].transaction;
		return {
			hash: transaction.hash,
			receivedTime: new Date(transaction.time).toISOString(),
			status: transaction.block_id > 0 ? "confirmed" : "pending",
			sizeInBytes: transaction.size,
			confirmations: parsedJson.context.state - transaction.block_id + 1,
			totalBtcInput: convertBalance(transaction.input_total),
			totalBtcOutput: convertBalance(transaction.output_total),
			totalFees: convertBalance(transaction.fee),
		};
	} catch {
		return undefined;
	}
}
