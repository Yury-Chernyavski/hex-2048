import { IMoveHandler } from "@/models";
import { useCallback, useEffect, useRef } from "react";

export const useThrottle = <T extends IMoveHandler>(fn: (args: T) => void, duration: number) => {
	const timeout = useRef<number>(0);
	const isThrottle = useRef<boolean>(false);
	const lastValue = useRef<string>("");
	// const count = useRef<number>(0);

	const callback = useCallback((args: T) => {
		lastValue.current = args.event;
		console.log(args.hexCells);
		
		if (isThrottle.current) {
		// if (count.current > 1) {
			// count.current++;
			return;
		}

		if (!isThrottle.current) {
			fn(args);
			// count.current++
			isThrottle.current = true;

			timeout.current = window.setTimeout(() => {
				if (lastValue.current !== args.event) {
					console.log(args.hexCells);
					
					fn({ ...args, event: lastValue.current });
				}
				// count.current = 0;
				isThrottle.current = false;
			}, duration);
		}
	}, [fn, duration]);

	useEffect(() => {
		return () => {
			window.clearTimeout(timeout.current);
		}
	}, []);

	return callback;
}
