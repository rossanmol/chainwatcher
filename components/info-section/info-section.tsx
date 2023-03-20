"use client";

export default function InfoSection({ title, value }: { title: string; value: string | number | JSX.Element }) {
	return (
		<>
			<div data-testid="info-section-title" className="text-md font-bold text-pink-900">
				{title}
			</div>
			<div data-testid="info-section-value" className="w-100 text-sm text-pink-400">
				{value}
			</div>
		</>
	);
}
