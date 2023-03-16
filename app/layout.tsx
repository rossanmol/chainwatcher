import { Roboto } from "next/font/google";

import "./globals.css";
import Link from "next/link";

import CurrencySelect from "@/components/currency-select/currency-select";
import Search from "@/components/search/search";

export const metadata = {
	title: "ChainWatcher - Search Blockhain Addreses and Transactions",
	description:
		"Explore the world of blockchain with our cutting-edge app. Access real-time BTC address and transaction data, subscribe to hash updates, and enjoy customizable currency displays in USD, EUR, or BTC. Elevate your crypto experience today.",
};

const roboto = Roboto({
	weight: "400",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={roboto.className}>
				<header className="flex items-center justify-between gap-2 border-b-2 border-slate-400 bg-slate-100 p-2">
					<Link className="text-xl font-black text-slate-800" href="/">
						ChainWatcher
					</Link>
					<Search className="flex w-full max-w-xl" />
					<CurrencySelect />
				</header>
				<main className="col-span-3 min-h-screen border-l border-l-slate-200 bg-slate-300 pt-4 dark:border-l-slate-700 xl:col-span-4">
					{children}
				</main>
			</body>
		</html>
	);
}
