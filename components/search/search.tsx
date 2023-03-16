"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Search({ className }: { className: string }) {
	const router = useRouter();
	const [address, setAddress] = useState<string | undefined>();
	const [transaction, setTransaction] = useState<string | undefined>();

	return (
		<form
			className={className}
			onSubmit={(e) => {
				e.preventDefault();
				if (address) {
					return router.push(`/address/${address}`);
				}

				if (transaction) {
					return router.push(`/transaction/${transaction}`);
				}
			}}
		>
			<Input
				onChange={(event) => {
					const { value } = event.target;

					const sanitizedValue = value.trim();
					const addressMatch = sanitizedValue.match(
						/([13]|bc1)[A-HJ-NP-Za-km-z1-9]{27,34}/
					);
					const transactionMatch = sanitizedValue.match(/^[a-fA-F0-9]{64}$/);

					if (addressMatch) {
						setAddress(addressMatch[0]);
					}

					if (transactionMatch) {
						setTransaction(addressMatch[0]);
					}
				}}
				className="rounded-r-none bg-white"
				placeholder="Search Adresses and Transactions"
			/>
			<Button className="rounded-l-none">
				<FaSearch />
			</Button>
		</form>
	);
}
