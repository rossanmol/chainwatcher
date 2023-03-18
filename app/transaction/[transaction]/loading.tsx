export default function Loading() {
	return (
		<section className="container mx-auto flex justify-center pt-12">
			<div
				role="status"
				className="col-span-3 flex h-[452px] w-full max-w-xl animate-pulse flex-col gap-1 space-y-4 divide-y divide-gray-200 overflow-hidden break-words rounded border-2 border-slate-300 bg-slate-50 p-4 shadow dark:divide-gray-700 dark:border-gray-700 md:p-6"
			>
				{[...Array(6)].map(() => (
					<div className="flex items-center justify-between pt-4">
						<div>
							<div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
							<div className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
						</div>
						<div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
					</div>
				))}
			</div>
		</section>
	);
}
