import { getAddress } from "@/utils/blockchain";

export default async function AddressPage({ params: { address } }: { params: { address: string } }) {
	const { balance, unspent, sent, received, totalTransactions } = await getAddress(address);

	return (
		<>
			<div>Address: {address}</div>
			<div>Balance: {balance}</div>
			<div>Unspent: {unspent}</div>
			<div>Sent: {sent}</div>
			<div>received: {received}</div>
			<div>Total transactions: {totalTransactions}</div>
		</>
	);
}
