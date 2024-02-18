import { IHexCoord } from "@/models";

export const setGrid = (radius: number): IHexCoord[] => {
	const hexGrid: IHexCoord[] = []
	const start = radius * -1 + 1;
	const end = radius - 1;

	for (let x = start; x <= end; x++) {
		for (let y = start; y <= end; y++) {
			const z = -x - y;
			if (z >= start && z <= end) hexGrid.push({ x, y, z, value: 0 });
		}
	}
	return hexGrid;
}
