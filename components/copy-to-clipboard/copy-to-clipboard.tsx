"use client";

import { FaRegClipboard } from "react-icons/fa";

export default function CopyToClipboardButton({ text }: { text: string }) {
	return (
		<span onClick={() => navigator.clipboard.writeText(text)}>
			<FaRegClipboard className="text-md ml-1 inline cursor-pointer align-top text-pink-900" />
		</span>
	);
}
