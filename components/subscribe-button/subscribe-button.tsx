"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/utils/use-toast";
import {
	WatcherObjectType,
	clearFromWatcherObject,
	isKeyPartOfWatcherObject,
	updateWatcherObject,
} from "@/utils/watcher-object";

import { Button } from "../ui/button";

export default function SubscribeButton(params: { address: string } | { transaction: string }) {
	const { toast } = useToast();
	const [isSubscribed, setIsSubscribed] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const type = "address" in params ? WatcherObjectType.address : WatcherObjectType.transaction;
	const hash = "address" in params ? params.address : params.transaction;

	useEffect(() => setIsSubscribed(isKeyPartOfWatcherObject(type, hash)), [hash, type]);

	return (
		<Button
			disabled={isLoading}
			variant={isSubscribed ? "destructive" : "default"}
			onClick={async () => {
				setIsLoading(true);
				if (isSubscribed) {
					clearFromWatcherObject(type, hash);
					toast({
						title: `Unsubscribed for ${type} updates`,
						description: hash,
					});

					setIsLoading(false);
					setIsSubscribed(false);
				}

				try {
					const hashResponse = await fetch(`/api/${type}-hash`, {
						cache: "no-cache",
					});
					const json = await hashResponse.json();
					updateWatcherObject(type, hash, json.sha1Hash);

					toast({
						title: `Subscribed for ${type} updates`,
						description: hash,
					});

					setIsSubscribed(true);
					setIsLoading(false);
				} catch {
					toast({
						title: `An error occured when trying to subscribe to bellow ${type}`,
						description: hash,
						variant: "destructive",
					});
					setIsLoading(false);
				}
			}}
		>
			{isSubscribed ? "Unsubscribe" : "Subscribe"}
		</Button>
	);
}
