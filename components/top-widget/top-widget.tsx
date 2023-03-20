"use client";

import Link from "next/link";

import CopyToClipboardButton from "../copy-to-clipboard/copy-to-clipboard";

interface Entry {
	id: string;
	url: string;
}

export default function TopWidget({ items, title }: { items: Entry[]; title: string }) {
	return (
		<section className="flex flex-col gap-2 rounded-md border-2 border-pink-300 bg-pink-100" data-testid="top-widget">
			<div
				className="border-b-2 border-pink-300 bg-pink-400 p-2 text-center font-black text-pink-800"
				data-testid="widget-title"
			>
				{title}
			</div>
			<div className="flex flex-col gap-1 p-4">
				{items.map((item) => (
					<div className="flex" key={item.id}>
						<ol>
							<li className="flex flex-row" data-testid="widget-item">
								<Link
									className="block w-48 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-pink-600"
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
					<div data-testid="no-results" className="text-center text-pink-500">
						Missing Data :(
					</div>
				)}
			</div>
		</section>
	);
}
