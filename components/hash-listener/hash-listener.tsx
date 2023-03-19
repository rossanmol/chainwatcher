"use client";

import { useEffect } from "react";
import { useToast } from "@/utils/use-toast";
import { WatcherObjectType, getWatcherObject, updateWatcherObject } from "@/utils/watcher-object";

export default function HashListener() {
	const { toast } = useToast();

	useEffect(() => {
		const fetchData = async () => {
			const transactions = getWatcherObject(WatcherObjectType.transaction);
			const addresses = getWatcherObject(WatcherObjectType.address);
			const transactionKeys = Object.keys(transactions);
			const addressKeys = Object.keys(addresses);

			try {
				const params = new URLSearchParams();
				for (const key of transactionKeys) {
					params.append("transaction", key);
				}
				for (const key of addressKeys) {
					params.append("address", key);
				}

				const size = Array.from(params.entries()).length;
				const query = size ? `?${params.toString()}` : "";

				const response = await fetch(`/api/hash-difference${query}`, {
					method: "GET",
					cache: "no-cache",
					headers: {
						"content-type": "application/json",
					},
				});
				const result = await response.json();

				for (const key of transactionKeys) {
					const sha1Hash = result.transaction[key];
					if (sha1Hash && sha1Hash !== transactions[key]) {
						updateWatcherObject(WatcherObjectType.transaction, key, sha1Hash);
						toast({
							title: `Transaction update.`,
							description: key,
						});
					}
				}

				for (const key of addressKeys) {
					const sha1Hash = result.address[key];
					if (sha1Hash && sha1Hash !== addresses[key]) {
						updateWatcherObject(WatcherObjectType.address, key, sha1Hash);
						toast({
							title: `Address update.`,
							description: key,
						});
					}
				}

				console.log(result);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();

		const intervalId = setInterval(() => {
			fetchData();
		}, 30000); // Fetch every 30 seconds

		return () => clearInterval(intervalId); // Clean up the interval on unmount
	}, [toast]);

	return <></>;
}
