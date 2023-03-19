import { NextResponse } from "next/server";
import { getTransaction } from "@/utils/blockchain";
import { generateHash } from "@/utils/hash";

export async function GET(request: Request) {
	const url = new URL(request.url);

	const hash = url.searchParams.get("hash");

	const address = hash && (await getTransaction(hash));
	const sha1Hash = generateHash(JSON.stringify(address));
	return NextResponse.json({ sha1Hash });
}
