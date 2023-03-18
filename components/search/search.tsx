"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useComponentVisible from "@/utils/use-outside";

import {
	Command,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";

export default function Search({ className }: { className: string }) {
	const router = useRouter();
	const [term, setTerm] = useState<string>("");
	const [address, setAddress] = useState<string | undefined | null>();
	const [transaction, setTransaction] = useState<string | undefined | null>();
	const { ref, isComponentVisible, setIsComponentVisible } =
		useComponentVisible<HTMLDivElement>(false);

	useEffect(
		() => setIsComponentVisible(!!term.length),
		[term, setIsComponentVisible]
	);

	const submitSearch = () => {
		setIsComponentVisible(false);

		if (address) {
			return router.push(`/address/${address}`);
		}

		if (transaction) {
			return router.push(`/transaction/${transaction}`);
		}
	};

	return (
		<>
			<form
				className={`block @container ${className} relative`}
				onSubmit={(e) => {
					e.preventDefault();
					submitSearch();
				}}
			>
				<Command
					ref={ref}
					shouldFilter={false}
					className="absolute top-[-22px] hidden h-auto w-full overflow-visible rounded-lg border border-slate-100 shadow-md @xl:block dark:border-slate-800"
				>
					<CommandInput
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								submitSearch();
							}
						}}
						onFocus={() => setIsComponentVisible(!!term.length)}
						placeholder="Search Adresses and Transactions"
						onValueChange={(value) => {
							const sanitizedValue = value.trim();
							const addressMatch = sanitizedValue.match(
								/^([13]|bc1)[A-HJ-NP-Za-km-z1-9]{27,34}/
							);
							const transactionMatch =
								sanitizedValue.match(/^[a-fA-F0-9]{64}$/);

							setAddress(addressMatch && addressMatch[0]);
							setTransaction(transactionMatch && transactionMatch[0]);
							setTerm(sanitizedValue);
						}}
					/>
					{isComponentVisible && (
						<CommandList>
							<CommandGroup>
								{!address && !transaction && (
									<CommandItem disabled>
										<span>No results found :(</span>
									</CommandItem>
								)}
								{address && (
									<CommandItem onSelect={submitSearch}>
										<span>Address: {address}</span>
									</CommandItem>
								)}
								{transaction && (
									<CommandItem onSelect={submitSearch}>
										<span>Transaction: {transaction}</span>
									</CommandItem>
								)}
							</CommandGroup>
						</CommandList>
					)}
				</Command>
			</form>
		</>
	);
}
