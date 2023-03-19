"use client";

import { useEffect, useState } from "react";
import { WatcherObjectType, getWatcherObject } from "@/utils/watcher-object";

import TopWidget from "@/components/top-widget/top-widget";

export default function SubscriptionWidget({ type, title }: { type: WatcherObjectType; title: string }) {
	const [keys, setKeys] = useState<string[]>([]);

	useEffect(() => {
		const watcherObject = getWatcherObject(type);
		setKeys(Object.keys(watcherObject));
	}, [type]);

	return <TopWidget title={title} items={keys.map((key) => ({ id: key, url: `/${type}/${key}` }))} />;
}
