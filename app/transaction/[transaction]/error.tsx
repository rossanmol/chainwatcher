"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
	return (
		<section className="container mx-auto flex justify-center pt-12">
			<div
				role="status"
				className="text-red-500 text-center col-span-3 flex h-[452px] w-full max-w-xl animate-pulse flex-col gap-1 space-y-4 divide-y divide-gray-200 overflow-hidden break-words rounded border-2 border-slate-300 bg-slate-50 p-4 shadow dark:divide-gray-700 dark:border-gray-700 md:p-6"
			>
				{error.message}
			</div>
		</section>
	);
}
