import crypto from "crypto";
import { NextResponse } from "next/server";
import { getAddress, getTransaction } from "@/utils/blockchain";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

export const SubscribeSchema = z.object({
	address: z.string().optional(),
	transaction: z.string().optional(),
});

const client = new PrismaClient();

function generateHash(value: string) {
	const hash = crypto.createHash("sha1");
	hash.update(value);
	return hash.digest("hex");
}

export async function POST(request: Request) {
	const json = await request.json();
	const payload = SubscribeSchema.parse(json);

	const address = payload.address && (await getAddress(payload.address));
	const transaction = payload.transaction && (await getTransaction(payload.transaction));

	if (address) {
		const hash = await generateHash(JSON.stringify(address));
		await client.addressSubscription.upsert({
			where: {
				id: address.hash,
			},
			create: {
				id: address.hash,
				hash,
				createdAt: new Date(),
			},
			update: {
				hash,
				createdAt: new Date(),
			},
		});
	}

	if (transaction) {
		const hash = await generateHash(JSON.stringify(transaction));
		await client.transactionSubscription.upsert({
			where: {
				id: transaction.hash,
			},
			create: {
				id: transaction.hash,
				hash,
				createdAt: new Date(),
			},
			update: {
				hash,
				createdAt: new Date(),
			},
		});
	}

	return NextResponse.json({ success: true });
}
