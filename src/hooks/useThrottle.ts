import { IMoveHandler } from "@/models";
import { useCallback, useEffect, useRef } from "react";

export const useThrottle = <T extends IMoveHandler>(fn: (args: T) => void, duration: number) => {
	const timeout = useRef<number>(0);
	const isThrottle = useRef<boolean>(false);
	const lastValue = useRef<string>("");

	const callback = useCallback((args: T) => {
		lastValue.current = args.event;
		if (isThrottle.current) {
			return;
		}

		if (!isThrottle.current) {
			fn(args);
			isThrottle.current = true;

			timeout.current = window.setTimeout(() => {
				if (lastValue.current && lastValue.current !== args.event) {
					fn({ ...args, event: lastValue.current } as T);
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
