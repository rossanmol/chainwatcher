import { BlockchainAddress, BlockchainTransaction } from "./blockchain.model";

function convertBalance(balance: number) {
	return Number((balance / Math.pow(10, 10)).toFixed(10));
}

export async function getAddress(hash: string) {
	const res = await fetch(`https://blockchain.info/rawaddr/${hash}?limit=0`);
	const json = await res.json();

	if ("error" in json) {
		throw Error(
			typeof json.error === "string"
				? json.error
				: "Unexpected error occured when fetching address"
		);
	}

	const address = json as BlockchainAddress;

	return {
		totalTransactions: address.n_tx,
		received: convertBalance(address.total_received),
		sent: convertBalance(address.total_sent),
		unspent: convertBalance(address.n_unredeemed),
		balance: convertBalance(address.final_balance),
	};
}

export async function getTransaction(hash: string) {
	const res = await fetch(`https://blockchain.info/rawaddr/${hash}`);
	const json = await res.json();

	if ("error" in json) {
		throw Error(
			typeof json.error === "string"
				? json.error
				: "Unexpected error occured when fetching transaction"
		);
	}

	const transaction = json as BlockchainTransaction;

	return {
		hash: transaction.hash,
		receivedTime: transaction,
		status: transaction.tx_index,
		sizeInBytes: transaction.size,
		confirmations: 10,
		totalBtcInput: transaction.vin_sz,
		totalBtcOutput: transaction.vout_sz,
		totalFees: 5,
	};
}
