"use client";

import { useToast } from "@/utils/use-toast";

import { Button } from "../ui/button";

export default function SubscribeButton({ address, transaction }: { address?: string; transaction?: string }) {
	const { toast } = useToast();

	return (
		<Button
			onClick={async () => {
				await fetch("/api/subscribe", {
					method: "POST",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify({
						address,
						transaction,
					}),
				});

				toast({
					title: `Subscribed for updates`,
					description: `${address || transaction}`,
				});
			}}
		>
			Subscribe
		</Button>
	);
}
