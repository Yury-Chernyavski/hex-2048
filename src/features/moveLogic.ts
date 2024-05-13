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
		cells.sort((a, b) => a[newWorkAxes.firstAxis] - b[newWorkAxes.firstAxis])

		cells.forEach((cell, index, arr) => {
			if (arr[index - 1]) {
				const prevElem = newCoords[newCoords.length - 1];
				// const oldPrevElem = cells[index - 1];
				// FIXME: this solution doesn't work correctly
				if (cell.value === prevElem.value && index < 2) {
					newCoords.pop();
					newCoords.push({
						...cell,
						[newWorkAxes.firstAxis]: prevElem[newWorkAxes.firstAxis],
						[newWorkAxes.secondAxis]: prevElem[newWorkAxes.secondAxis],
						value: cell.value * 2
					})
				} else {
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
