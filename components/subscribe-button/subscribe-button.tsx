"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/utils/use-toast";
import { z } from "zod";

import { Button } from "../ui/button";

function parseWatcherObject(localStorageKey: string) {
	const value = typeof localStorage != "undefined" ? localStorage.getItem(localStorageKey) : null;
	if (!value) {
		return {};
	}

	const watcherObjectSchema = z.record(z.string(), z.string());
	try {
		const json = JSON.parse(value);
		return watcherObjectSchema.parse(json);
	} catch {
		return {};
	}
}

export default function SubscribeButton(params: { address: string } | { transaction: string }) {
	const { toast } = useToast();

	const [isSubscribed, setIsSubscribed] = useState(false);

	useEffect(() => {
		const type = "address" in params ? `address` : `transaction`;
		const hash = "address" in params ? params.address : params.transaction;
		const localStorageKey = `${type}-watcher`;
		const watcherObject = parseWatcherObject(localStorageKey);
		setIsSubscribed(!!watcherObject[hash]);
	}, []);

	return (
		<Button
			variant={isSubscribed ? "destructive" : "default"}
			onClick={async () => {
				const type = "address" in params ? `address` : `transaction`;
				const hash = "address" in params ? params.address : params.transaction;
				const localStorageKey = `${type}-watcher`;
				const watcherObject = parseWatcherObject(localStorageKey);

				if (isSubscribed) {
					delete watcherObject[hash];
					localStorage.setItem(localStorageKey, JSON.stringify(watcherObject));
					setIsSubscribed(false);

					return toast({
						title: `Unsubscribed for ${type} updates`,
						description: hash,
					});
				}

				const hashResponse = await fetch(`/api/${type}-hash`, {
					cache: "no-cache",
				});
				const json = await hashResponse.json();

				localStorage.setItem(
					localStorageKey,
					JSON.stringify({
						...watcherObject,
						[hash]: json.sha1Hash,
					})
				);

				setIsSubscribed(true);

				toast({
					title: `Subscribed for ${type} updates`,
					description: hash,
				});
			}}
		>
			{isSubscribed ? "Unsubscribe" : "Subscribe"}
		</Button>
	);
}
