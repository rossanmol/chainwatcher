import { getTransaction } from "@/utils/blockchain";
import { PrismaClient } from "@prisma/client";

import CopyToClipboardButton from "@/components/copy-to-clipboard/copy-to-clipboard";
import InfoSection from "@/components/info-section/info-section";

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

async function getCount(hash: string) {
	const prisma = new PrismaClient();

	const result = await prisma.transaction.findFirst({
		where: {
			id: hash,
		},
	});

	console.log(result);
	return result?.count || 0;
}

export default async function TransactionPage({
	params: { transaction },
}: {
	params: { transaction: string };
}) {
	const payload = await getTransaction(transaction);
	await increaseCount(payload.hash);
	const transactionCount = await getCount(payload.hash);

	return (
		<>
			<section className="flex justify-center container mx-auto pt-12">
				<section className="col-span-3 flex w-full max-w-xl flex-col gap-1 break-words rounded-lg border-2 border-slate-300 bg-slate-200 p-2">
					<h1 className="text-2xl font-black">Bitcoin Transaction</h1>
					<div className="text-xs text-slate-400">
						Occured on {payload.receivedTime}
					</div>

					<div className="my-2">
						<span
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
								{payload.hash}
								<CopyToClipboardButton text={payload.hash} />
							</>
						}
					/>

					<InfoSection title="Confirmations" value={payload.confirmations} />
					<InfoSection title="Size (in bytes)" value={payload.sizeInBytes} />
					<InfoSection title="BTC Input" value={payload.totalBtcInput} />
					<InfoSection title="BTC output" value={payload.totalBtcOutput} />
					<InfoSection title="Fees" value={payload.totalFees} />
					<InfoSection title="Views" value={transactionCount} />
				</section>
			</section>
		</>
	);
}