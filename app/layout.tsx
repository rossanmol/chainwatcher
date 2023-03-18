import { Roboto } from "next/font/google";

import "./globals.css";
import { cookies } from "next/headers";
import Link from "next/link";

import CurrencySelect from "@/components/currency-select/currency-select";
import Search from "@/components/search/search";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
	title: "ChainWatcher - Search Blockhain Addreses and Transactions",
	description:
		"Explore the world of blockchain with our cutting-edge app. Access real-time BTC address and transaction data, subscribe to hash updates, and enjoy customizable currency displays in USD, EUR, or BTC. Elevate your crypto experience today.",
};

const font = Roboto({
	weight: "400",
	subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const cookieStore = cookies();
	const cookieCurrency = cookieStore.get("currency");
	const currency = cookieCurrency?.value;

	return (
		<html lang="en">
			<body className={font.className}>
				<header className="relative flex items-center justify-between gap-2 border-b-2 border-pink-500 bg-pink-600 p-3">
					<Link prefetch={false} className="text-xl font-black text-slate-50" href="/">
						ChainWatcher
					</Link>
					<Search className="flex w-full max-w-xl" />
					<CurrencySelect selectedCurrency={currency} />
				</header>
				<Toaster></Toaster>
				<main className="col-span-3 min-h-screen bg-slate-100 dark:border-l-slate-700 xl:col-span-4">{children}</main>
			</body>
		</html>
	);
}
