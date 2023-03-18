import crypto from "crypto";
import { NextResponse } from "next/server";
import { getAddress } from "@/utils/blockchain";

function generateHash(value: string) {
	const hash = crypto.createHash("sha1");
	hash.update(value);
	return hash.digest("hex");
}

export async function GET(request: Request) {
	const url = new URL(request.url);

	const hash = url.searchParams.get("hash");

	const address = hash && (await getAddress(hash));
	const sha1Hash = generateHash(JSON.stringify(address));
	return NextResponse.json({ sha1Hash });
}
