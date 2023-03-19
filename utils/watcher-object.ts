import { z } from "zod";

export enum WatcherObjectType {
	address = "address",
	transaction = "transaction",
}

export function getWatcherObject(type: WatcherObjectType) {
	const localStorageKey = getLocalStorageKey(type);
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

export function updateWatcherObject(type: WatcherObjectType, hash: string, sha1Hash: string) {
	const localStorageKey = getLocalStorageKey(type);
	const watcherObject = getWatcherObject(type);
	const limit = 3;

	if (Object.keys(watcherObject).length >= limit) {
		throw new Error(`The limit of ${limit} subscriptions for ${type} has been reached.`);
	}

	localStorage.setItem(
		localStorageKey,
		JSON.stringify({
			...watcherObject,
			[hash]: sha1Hash,
		})
	);
}

export function clearFromWatcherObject(type: WatcherObjectType, hash: string) {
	const localStorageKey = getLocalStorageKey(type);
	const watcherObject = getWatcherObject(type);
	delete watcherObject[hash];
	localStorage.setItem(localStorageKey, JSON.stringify(watcherObject));
}

export function isKeyPartOfWatcherObject(type: WatcherObjectType, hash: string) {
	const watcherObject = getWatcherObject(type);
	return !!watcherObject[hash];
}

function getLocalStorageKey(type: WatcherObjectType) {
	return `${type}-watcher`;
}
