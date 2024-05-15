import { IHexCoord, IMoveHandler } from "@/models";
import { useCallback, useEffect, useRef } from "react";

export const useThrottle = <T extends IMoveHandler>(fn: (args: T) => void, duration: number) => {
	const timeout = useRef<number>(0);
	const isThrottle = useRef<boolean>(false);
	const lastValue = useRef<string>("");
	const count = useRef<number>(0);
	const hexArr = useRef<IHexCoord[]>([]);

	const callback = useCallback((args: T) => {
		lastValue.current = args.event;
		hexArr.current = args.hexCells;

		if (count.current >= 1) {
			count.current++;
			return;
		}

		fn(args);
		count.current++
		isThrottle.current = true;

		timeout.current = window.setTimeout(() => {
			if (count.current >= 2) fn({ ...args, hexCells: hexArr.current, event: lastValue.current } as T);
			count.current = 0;
		}, duration);
	}, [fn, duration]);

	useEffect(() => {
		return () => {
			window.clearTimeout(timeout.current);
		}
	}, []);

	return callback;
}
