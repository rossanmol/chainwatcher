import { PrismaClient } from "@prisma/client";

export async function increaseAddressCount(hash: string) {
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

export async function increaseTransactionCount(hash: string) {
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
