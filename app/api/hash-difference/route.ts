import { NextResponse } from "next/server";
import { getAddress, getTransaction } from "@/utils/blockchain";
import { generateHash } from "@/utils/hash";

async function getAddressHashes(addressIds: string[]) {
	const addresses = await Promise.all(addressIds.map((id) => getAddress(id)));
	let addressMap: Record<string, string> = {};
	for (const address of addresses) {
		if (!address) {
			continue;
		}

		addressMap[address.hash] = generateHash(JSON.stringify(address));
	}
	return addressMap;
}

async function getTransactionHashed(transactionIds: string[]) {
	const transactions = await Promise.all(transactionIds.map((id) => getTransaction(id)));
	let transactionMap: Record<string, string> = {};
	for (const transaction of transactions) {
		if (!transaction) {
			continue;
		}

		transactionMap[transaction.hash] = generateHash(JSON.stringify(transaction));
	}
	return transactionMap;
}

export async function GET(request: Request) {
	const url = new URL(request.url);

	const transactionIds = url.searchParams.getAll("transaction");
	const addressIds = url.searchParams.getAll("address");

	const [address, transaction] = await Promise.all([
		getAddressHashes(addressIds),
		getTransactionHashed(transactionIds),
	]);

	return NextResponse.json({ address, transaction });
}
