import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getAddress } from "@/utils/blockchain";
import { getExchangeRate, getReadableCurrency } from "@/utils/currency";
import { increaseAddressCount } from "@/utils/increase-count";

import InfoSection from "@/components/info-section/info-section";
import SubscribeButton from "@/components/subscribe-button/subscribe-button";

interface Page {
	params: {
		address: string;
	};
}
export async function generateMetadata({ params: { address } }: Page) {
	return {
		title: `${address} address | ChainWatcher`,
		description: `View ${address} address. Explore the world of blockchain with our cutting-edge app. Access real-time BTC address and transaction data, subscribe to hash updates, and enjoy customizable currency displays in USD, EUR, or BTC. Elevate your crypto experience today.`,
	};
}

export default async function AddressPage({ params: { address } }: Page) {
	const cookieStore = cookies();
	const cookieCurrency = cookieStore.get("currency");
	const [exchangeRate, payload] = await Promise.all([getExchangeRate(cookieCurrency?.value), getAddress(address)]);

	if (!payload) {
		notFound();
	}

	try {
		// it is completely fine if counter does not work, allow the visitor to access the page anyways
		await increaseAddressCount(address);
	} catch (error) {
		console.error("Failed to increase count");
	}

	return (
		<section className="container mx-auto flex justify-center pt-12">
			<section className="col-span-3 flex w-full max-w-xl flex-col gap-1 break-words rounded-lg border-2 border-slate-300 bg-slate-50 p-2">
				<h1 className="text-2xl font-black">Bitcoin Address</h1>
				<div className="text-xs text-slate-400">{payload.hash}</div>

				<div className="my-2">
					<span className="rounded-md border-2 border-slate-400 bg-slate-300 p-1 text-green-700">
						{getReadableCurrency(payload.balance, exchangeRate.value, exchangeRate.currency)}
					</span>
				</div>
				<InfoSection title="Total transactions " value={payload.totalTransactions} />
				<InfoSection
					title="Spent"
					value={getReadableCurrency(payload.spent, exchangeRate.value, exchangeRate.currency)}
				/>
				<InfoSection
					title="Received"
					value={getReadableCurrency(payload.received, exchangeRate.value, exchangeRate.currency)}
				/>
				<InfoSection title="Transactions" value={payload.totalTransactions} />
				<InfoSection
					title="Unspent"
					value={getReadableCurrency(payload.unspent, exchangeRate.value, exchangeRate.currency)}
				/>
				<InfoSection title="Unspent Output Count" value={payload.unspentOutputCount} />

				<div className="text-right">
					<SubscribeButton address={address} />
				</div>
			</section>
		</section>
	);
}
