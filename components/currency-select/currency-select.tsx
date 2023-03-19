"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Currency } from "@/utils/blockchain.schema";
import { parseCurrency } from "@/utils/currency";
import Cookies from "universal-cookie";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function CurrencySelect({ selectedCurrency }: { selectedCurrency: string | undefined }) {
	const parsedCurrency = parseCurrency(selectedCurrency);
	const router = useRouter();
	const [currency, setCurrency] = useState(parsedCurrency);
	const currenciesMap = new Map([
		[Currency.btc, "BTC (₿)"],
		[Currency.eur, "EUR (€)"],
		[Currency.usd, "USD ($)"],
	]);

	useEffect(() => {
		const cookies = new Cookies();
		const dateCopy = new Date();
		dateCopy.setFullYear(dateCopy.getFullYear() + 1);

		cookies.set("currency", currency, {
			expires: dateCopy,
			path: "/",
		});
		router.refresh();
	}, [currency, router]);

	return (
		<>
			<Select onValueChange={(value) => setCurrency(value as Currency)}>
				<SelectTrigger className="w-[130px] bg-pink-100">
					<SelectValue placeholder={currenciesMap.get(currency)} />
				</SelectTrigger>
				<SelectContent>
					{Array.from(currenciesMap).map(([key, title]) => (
						<SelectItem value={key} key={key}>
							{title}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</>
	);
}
