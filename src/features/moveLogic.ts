import { IHexCoord, IMoveData } from "@/models";

export const moveLogic = ({
	radius,
	newWorkAxes,
	groupedHexArr,
	setNewArrCells,
}: IMoveData<IHexCoord>) => {
	const border = radius - 1;
	const newCoords: IHexCoord[] = [];

	for (const cells of Object.values(groupedHexArr)) {
		let count: number = 0;
		cells.sort((a, b) => a[newWorkAxes.firstAxis] - b[newWorkAxes.firstAxis])
		cells.forEach((cell, index, arr) => {
			if (arr[index - 1]) {
				const prevElem = newCoords[newCoords.length - 1];
				if (cell.value === prevElem.value && count < 1) {
					newCoords.pop();
					count++;
					newCoords.push({
						...cell,
						[newWorkAxes.firstAxis]: prevElem[newWorkAxes.firstAxis],
						[newWorkAxes.secondAxis]: prevElem[newWorkAxes.secondAxis],
						value: cell.value * 2
					})
				} else {
					count = 0;
					newCoords.push({
						...cell,
						[newWorkAxes.firstAxis]: prevElem[newWorkAxes.firstAxis] + 1,
						[newWorkAxes.secondAxis]: prevElem[newWorkAxes.secondAxis] - 1,
					})
				}
			} else {
				if (cell[newWorkAxes.mainAxis] >= 0) {
					newCoords.push({
						...cell,
						[newWorkAxes.firstAxis]: -border,
						[newWorkAxes.secondAxis]: border - cell[newWorkAxes.mainAxis]
					});
				} else {
					newCoords.push({
						...cell,
						[newWorkAxes.firstAxis]: -border - cell[newWorkAxes.mainAxis],
						[newWorkAxes.secondAxis]: border
					})
				}
			}
		})
	}
	
	setNewArrCells(newCoords);
}
