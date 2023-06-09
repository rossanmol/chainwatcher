"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useComponentVisible from "@/utils/use-outside";
import { FaSearch, FaTimes } from "react-icons/fa";

import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "../ui/button";

function isValidBitcoinAddress(hash: string) {
	return (
		/^1[1-9A-HJ-NP-Za-km-z]{25,34}$/.test(hash) ||
		/^3[1-9A-HJ-NP-Za-km-z]{25,34}$/.test(hash) ||
		/^bc1([ac-hj-np-z02-9]{1,}[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{1,}){1,39}$/.test(hash)
	);
}

export default function Search({ className }: { className: string }) {
	const router = useRouter();
	const [term, setTerm] = useState<string>("");
	const [isSearchVisible, setIsSearchVisible] = useState(false);
	const [address, setAddress] = useState<string | undefined | null>();
	const [transaction, setTransaction] = useState<string | undefined | null>();
	const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible<HTMLDivElement>(false);

	useEffect(() => setIsComponentVisible(!!term.length), [term, setIsComponentVisible]);

	const submitSearch = () => {
		setIsComponentVisible(false);
		setIsSearchVisible(false);

		if (transaction) {
			return router.push(`/transaction/${transaction}`);
		}

		if (address) {
			return router.push(`/address/${address}`);
		}
	};

	return (
		<>
			<form
				className={`block  ${isSearchVisible ? "@container-normal" : "@container"} ${className} @xl:relative`}
				onSubmit={(e) => {
					e.preventDefault();
					submitSearch();
				}}
			>
				<Command
					ref={ref}
					shouldFilter={false}
					className={`absolute top-[-22px] ${
						isSearchVisible ? "absolute left-0 top-0 w-full" : "hidden"
					} z-10 h-auto w-full overflow-visible rounded-none border border-pink-100 shadow-md @xl:block @xl:rounded-lg dark:border-pink-800`}
				>
					<CommandInput
						data-testid="search-input"
						className="h-[61px] w-5/6 @xl:h-auto @xl:w-full"
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								submitSearch();
							}
						}}
						onFocus={() => setIsComponentVisible(!!term.length)}
						placeholder="Search Adresses and Transactions (P2PKH, P2SH, and Bech32)"
						onValueChange={(value) => {
							const sanitizedValue = value.trim();
							const transactionMatch = sanitizedValue.match(/^[a-fA-F0-9]{64}$/);

							setAddress(isValidBitcoinAddress(sanitizedValue) ? sanitizedValue : null);
							setTransaction(transactionMatch && transactionMatch[0]);
							setTerm(sanitizedValue);
						}}
					/>

					{isComponentVisible && (
						<CommandList data-testid="search-results">
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

				{isSearchVisible ? (
					<Button
						data-testid="mobile-close-button"
						className="absolute inset-y-0 right-0 z-10 h-full"
						type="button"
						variant="ghost"
						onClick={() => setIsSearchVisible(false)}
					>
						<FaTimes />
					</Button>
				) : (
					<div className="flex w-full justify-end @xl:hidden" data-testid="mobile-button-container">
						<Button
							data-testid="mobile-button"
							type="button"
							className="bg-pink-700 text-white"
							onClick={() => setIsSearchVisible(true)}
						>
							<FaSearch />
						</Button>
					</div>
				)}
			</form>
		</>
	);
}
