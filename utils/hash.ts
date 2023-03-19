import crypto from "crypto";

export function generateHash(value: string) {
	const hash = crypto.createHash("sha1");
	hash.update(value);
	return hash.digest("hex");
}
