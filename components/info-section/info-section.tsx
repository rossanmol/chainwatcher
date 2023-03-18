"use client";

import { FaRegClipboard } from "react-icons/fa";

export default function InfoSection({
	title,
	value,
}: {
	title: string;
	value: string | number | JSX.Element;
}) {
	return (
		<div>
			<div className="font-bold text-md text-slate-900">{title}</div>
			<div className="text-slate-400 text-sm w-100">{value}</div>
		</div>
	);
}
