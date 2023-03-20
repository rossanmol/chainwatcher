"use client";

export default function NotFound() {
	return (
		<section className="container mx-auto flex justify-center pt-12">
			<div
				role="status"
				className="col-span-3 flex h-[452px] w-full max-w-xl animate-pulse flex-col gap-1 space-y-4 divide-y divide-gray-200 overflow-hidden break-words rounded border-2 border-pink-300 bg-pink-50 p-4 text-center text-red-500 shadow dark:divide-gray-700 dark:border-gray-700 md:p-6"
			>
				Not found
			</div>
		</section>
	);
}
