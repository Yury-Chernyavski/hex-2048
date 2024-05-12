import { IHexCoord, IMoveData } from "@/models";

export const moveLogic = ({
	radius,
	newWorkAxes,
	oldWorkAxes,
	groupedHexArr,
	setHexCells,
	setOldWorkAxes,
}: IMoveData<IHexCoord>) => {
	const border = radius - 1;
	const newCoords: IHexCoord[] = [];

	for (const cells of Object.values(groupedHexArr)) {
		if (newWorkAxes.firstAxis !== oldWorkAxes?.firstAxis) {
			cells.reverse();
		}
		setOldWorkAxes(newWorkAxes);

		cells.forEach((cell, index, arr) => {
			if (arr[index - 1]) {
				const prevElem = newCoords[newCoords.length - 1];
				if (prevElem && cell.value === prevElem.value) {
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
	
	setHexCells(newCoords);
}
