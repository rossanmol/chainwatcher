"use client";

export default function InfoSection({ title, value }: { title: string; value: string | number | JSX.Element }) {
	return (
		<div>
			<div data-testid="info-section-title" className="text-md font-bold text-slate-900">
				{title}
			</div>
			<div data-testid="info-section-value" className="w-100 text-sm text-slate-400">
				{value}
			</div>
		</div>
	);
}
