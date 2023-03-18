"use client";

import Link from "next/link";

import CopyToClipboardButton from "../copy-to-clipboard/copy-to-clipboard";

interface Entry {
	id: string;
	url: string;
}

export default function TopWidget({ items, title }: { items: Entry[]; title: string }) {
	return (
		<section className="flex flex-col gap-2 border-2 border-slate-400 bg-slate-300 p-4">
			<div className="font-black text-slate-700" data-testid="widget-title">
				{title}
			</div>
			<div className="flex flex-col gap-1">
				{items.map((item) => (
					<div className="flex">
						<ol>
							<li className="flex flex-row" data-testid="widget-item">
								<Link
									className="block w-48 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-slate-600"
									href={item.url}
								>
									{item.id}
								</Link>
								<CopyToClipboardButton text={item.id} />
							</li>
						</ol>
					</div>
				))}

				{!items.length && (
					<div data-testid="no-results" className="text-center text-slate-500">
						Missing Data :(
					</div>
				)}
			</div>
		</section>
	);
}
