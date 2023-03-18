import Link from "next/link";
import { PrismaClient } from "@prisma/client";

import CopyToClipboardButton from "@/components/copy-to-clipboard/copy-to-clipboard";

async function getTopTransactions() {
	const prisma = new PrismaClient();

	return prisma.transaction.findMany({
		orderBy: {
			count: "desc",
		},
		take: 5,
	});
}

async function getTopAdresses() {
	const prisma = new PrismaClient();

	return prisma.address.findMany({
		orderBy: {
			count: "desc",
		},
		take: 5,
	});
}

export default async function Home() {
	const [transactions, addresses] = await Promise.all([
		getTopTransactions(),
		getTopAdresses(),
	]);

	return (
		<>
			<div className="bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-purple-600 via-pink-600 to-blue-600 px-4 py-[12vh]">
				<h1 className="mx-auto max-w-[800px] text-[5vw] font-black text-white md:text-5xl">
					The world’s most convenient place to inspect transactions and wallets.
				</h1>
			</div>

			<section className="container mx-auto pt-12 grid gap-12 justify-center sm:grid-cols-2 grid-cols-1 sm:w-[600px] w-[300px]">
				<section className="border-2 p-4 bg-slate-300 border-slate-400 flex gap-2 flex-col">
					<div className="text-slate-700 font-black">Top Transactions</div>
					<div>
						{transactions.map((transaction) => (
							<div className="flex">
								<ol className="w-48 text-sm text-slate-600 overflow-hidden text-ellipsis whitespace-nowrap">
									<Link href={`/transaction/${transaction.id}`}>
										{transaction.id}
									</Link>
									<CopyToClipboardButton text={transaction.id} />
								</ol>
							</div>
						))}
					</div>
				</section>

				<section className="border-2 p-4 bg-slate-300 border-slate-400 flex gap-2 flex-col">
					<div className="text-slate-700 font-black">Top Addresses</div>
					<div>
						{transactions.map((address) => (
							<div className="flex">
								<ol className="w-48 text-sm text-slate-600 overflow-hidden text-ellipsis whitespace-nowrap">
									<Link href={`/address/${address.id}`}>{address.id}</Link>
									<CopyToClipboardButton text={address.id} />
								</ol>
							</div>
						))}
					</div>
				</section>
			</section>
		</>
	);
}
