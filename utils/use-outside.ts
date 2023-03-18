import { useEffect, useRef, useState } from "react";

export default function useComponentVisible<T extends Element>(initialIsVisible: boolean) {
	const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
	const ref = useRef<T>(null);

	const handleClickOutside = (event: Event) => {
		if (ref.current && !ref.current.contains(event.target as T)) {
			setIsComponentVisible(false);
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	}, []);

	return { ref, isComponentVisible, setIsComponentVisible };
}
