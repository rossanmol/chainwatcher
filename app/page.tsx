import { PrismaClient } from "@prisma/client";

import TopWidget from "@/components/top-widget/top-widget";

async function getTopTransactions() {
	const prisma = new PrismaClient();

	return prisma.transaction.findMany({
		select: {
			id: true,
		},
		orderBy: {
			count: "desc",
		},
		take: 5,
	});
}

async function getTopAdresses() {
	const prisma = new PrismaClient();

	return prisma.address.findMany({
		select: {
			id: true,
		},
		orderBy: {
			count: "desc",
		},
		take: 5,
	});
}

export default async function Home() {
	const [transactions, addresses] = await Promise.all([getTopTransactions(), getTopAdresses()]);

	return (
		<>
			<div className="bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-purple-600 via-pink-600 to-blue-600 px-4 py-[12vh]">
				<h1 className="mx-auto max-w-[800px] text-[5vw] font-black text-white md:text-5xl">
					The world’s most convenient place to inspect transactions and wallets.
				</h1>
			</div>

			<section className="container mx-auto grid w-[300px] grid-cols-1 justify-center gap-12 pt-12 sm:w-[600px] sm:grid-cols-2">
				<TopWidget
					title="Top Transactions"
					items={transactions.map((transaction) => ({ ...transaction, url: `/transaction/${transaction.id}` }))}
				/>
				<TopWidget
					title="Top Addresses"
					items={addresses.map((address) => ({ ...address, url: `/address/${address.id}` }))}
				/>
			</section>
		</>
	);
}
