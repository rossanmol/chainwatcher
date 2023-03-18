import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getAddress, getExchangeRate, getReadableCurrency } from "@/utils/blockchain";
import { Currency } from "@/utils/blockchain.schema";
import { PrismaClient } from "@prisma/client";

import CopyToClipboardButton from "@/components/copy-to-clipboard/copy-to-clipboard";
import InfoSection from "@/components/info-section/info-section";

async function increaseCount(hash: string) {
	const prisma = new PrismaClient();

	await prisma.address.upsert({
		create: {
			id: hash,
			count: 0,
		},
		update: {
			count: { increment: 1 },
		},
		where: {
			id: hash,
		},
	});
}

export default async function AddressPage({ params: { address } }: { params: { address: string } }) {
	const cookieStore = cookies();
	const cookieCurrency = cookieStore.get("currency");
	const currency = cookieCurrency?.value;

	const [exchangeRate, payload] = await Promise.all([getExchangeRate(currency), getAddress(address)]);

	if (!payload) {
		notFound();
	}

	try {
		// it is completely fine if counter does not work, allow the visitor to access the page anyways
		await increaseCount(address);
	} catch (error) {
		console.error("Failed to increase count");
	}

	return (
		<section className="container mx-auto flex justify-center pt-12">
			<section className="col-span-3 flex w-full max-w-xl flex-col gap-1 break-words rounded-lg border-2 border-slate-300 bg-slate-50 p-2">
				<h1 className="text-2xl font-black">Bitcoin Address</h1>
				<div className="text-xs text-slate-400">Total transactions {payload.totalTransactions}</div>

				<div className="my-2">
					<span className="rounded-md border-2 border-slate-400 bg-slate-300 p-1 text-green-700">
						{getReadableCurrency(payload.balance, exchangeRate.value, exchangeRate.currency)}
					</span>
				</div>
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
			</section>
		</section>
	);
}
