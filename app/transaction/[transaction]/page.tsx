import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getTransaction } from "@/utils/blockchain";
import { getExchangeRate, getReadableCurrency } from "@/utils/currency";
import { PrismaClient } from "@prisma/client";

import CopyToClipboardButton from "@/components/copy-to-clipboard/copy-to-clipboard";
import InfoSection from "@/components/info-section/info-section";
import SubscribeButton from "@/components/subscribe-button/subscribe-button";

interface Page {
	params: {
		transaction: string;
	};
}

async function increaseCount(hash: string) {
	const prisma = new PrismaClient();

	await prisma.transaction.upsert({
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

export async function generateMetadata({ params: { transaction } }: Page) {
	return {
		title: `${transaction} transaction | ChainWatcher`,
		description: `View ${transaction} transaction. Explore the world of blockchain with our cutting-edge app. Access real-time BTC address and transaction data, subscribe to hash updates, and enjoy customizable currency displays in USD, EUR, or BTC. Elevate your crypto experience today.`,
	};
}

export default async function TransactionPage({ params: { transaction } }: Page) {
	const cookieStore = cookies();
	const cookieCurrency = cookieStore.get("currency");
	const [exchangeRate, payload] = await Promise.all([
		getExchangeRate(cookieCurrency?.value),
		getTransaction(transaction),
	]);

	if (!payload) {
		notFound();
	}

	try {
		// it is completely fine if counter does not work, allow the visitor to access the page anyways
		await increaseCount(payload.hash);
	} catch (error) {
		console.error("Failed to increase count");
	}

	return (
		<section className="container mx-auto flex justify-center pt-12">
			<section className="col-span-3 flex w-full max-w-xl flex-col gap-1 break-words rounded-lg border-2 border-pink-300 bg-pink-50 p-2">
				<h1 className="text-2xl font-black" data-testid="page-title">
					Bitcoin Transaction
				</h1>
				<div className="text-xs text-pink-400">Occured on {payload.receivedTime}</div>

				<div className="my-2">
					<span
						data-testid="transaction-status"
						className={`${
							payload.status === "confirmed"
								? "border-green-400 bg-green-300 text-green-700"
								: "border-yellow-400 bg-yellow-300 text-yellow-700"
						} rounded-md border-2 p-1`}
					>
						{payload.status}
					</span>
				</div>
				<InfoSection
					title="Hash Id"
					value={
						<>
							<span data-testid="transaction-hash">{payload.hash}</span>
							<CopyToClipboardButton text={payload.hash} />
						</>
					}
				/>

				<InfoSection title="Confirmations" value={payload.confirmations} />
				<InfoSection title="Size (in bytes)" value={payload.sizeInBytes} />
				<InfoSection
					title="BTC Input"
					value={getReadableCurrency(payload.totalBtcInput, exchangeRate.value, exchangeRate.currency)}
				/>
				<InfoSection
					title="BTC Output"
					value={getReadableCurrency(payload.totalBtcOutput, exchangeRate.value, exchangeRate.currency)}
				/>
				<InfoSection
					title="Fees"
					value={getReadableCurrency(payload.totalFees, exchangeRate.value, exchangeRate.currency)}
					data-testid="transaction-fees"
				/>
				<div className="text-right">
					<SubscribeButton transaction={transaction} />
				</div>
			</section>
		</section>
	);
}
