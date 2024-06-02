import { ISize } from "@/models";
import { useEffect, useState } from "react";

export const useCalcCellSize = (radius: number): ISize => {
	const [sizeCell, setSizeCell] = useState<ISize>({
		width: 0,
		height: 0,
	});
	
	useEffect(() => {
		const numOfCol = radius * 2 - 2;
		const width = 500 / ((3 * numOfCol / 4) + 1);
		const height = Math.sqrt(3) * width / 2;
		setSizeCell({ width, height });
	}, [radius]);

	return sizeCell;
}
