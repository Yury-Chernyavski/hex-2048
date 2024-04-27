import { useCallback, useEffect, useRef } from "react";

export const useThrottle = <T>(fn: (e: T) => void, duration: number) => {
	const timeout = useRef<number>(0);
	const isThrottle = useRef<boolean>(false);
	const lastValue = useRef<T | null>(null);

	const callback = useCallback((event: T) => {
		lastValue.current = event;
		if (isThrottle.current) {
			return;
		}

		if (!isThrottle.current) {
			lastValue.current && fn(lastValue.current);
			isThrottle.current = true;

			timeout.current = window.setTimeout(() => {
				if (lastValue.current && lastValue.current !== event) {
					fn(lastValue.current);
				}
				isThrottle.current = false;
			}, duration);
		}


	}, [fn, duration])

	useEffect(() => {
		return () => {
			window.clearTimeout(timeout.current);
		}
	}, []);

	return callback;
}
