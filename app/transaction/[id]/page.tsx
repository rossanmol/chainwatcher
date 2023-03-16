import { getAddress, getTransaction } from "@/blockchain/blockchain";

export default async function TransactionPage() {
	const transaction =
		"8e5e6b898750a7afbe683a953fbf30bd990bb57ccd2d904c76df29f61054e743";

	const { hash } = await getTransaction(transaction);

	return (
		<>
			<div>hash: {hash}</div>
		</>
	);
}
