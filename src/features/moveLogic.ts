import { IHexCoord, IMoveLogic } from "@/models";

export const moveLogic = ({
	// mainAxis,
	groupedHexArr,
	radius,
	workAxes,
	setHexCells,
	setUpdateBoard
}: IMoveLogic<IHexCoord>) => {
	const border = radius - 1;
	const newCoords: IHexCoord[] = [];

	for (const cells of Object.values(groupedHexArr)) {
		// console.log(prevWorkAxes, cells);
		// if (prevWorkAxes && workAxes.firstAxis !== prevWorkAxes?.firstAxis) {
		// 	prevWorkAxes = workAxes;
		// 	cells.reverse();
		// }
		// console.log(prevWorkAxes, cells);
		cells.forEach((cell, index, arr) => {
			if (arr[index - 1]) {
				const prevElem = newCoords[newCoords.length - 1];
				if (prevElem && cell.value === prevElem.value) {
					newCoords.pop();
					newCoords.push({
						...cell,
						[workAxes.firstAxis]: prevElem[workAxes.firstAxis],
						[workAxes.secondAxis]: prevElem[workAxes.secondAxis],
						value: cell.value * 2
					})
				} else {
					newCoords.push({
						...cell,
						[workAxes.firstAxis]: prevElem[workAxes.firstAxis] + 1,
						[workAxes.secondAxis]: prevElem[workAxes.secondAxis] - 1,
					})
				}
			} else {
				if (cell[workAxes.mainAxis] >= 0) {
					newCoords.push({
						...cell,
						[workAxes.firstAxis]: -border,
						[workAxes.secondAxis]: border - cell[workAxes.mainAxis]
					});
				} else {
					newCoords.push({
						...cell,
						[workAxes.firstAxis]: -border - cell[workAxes.mainAxis],
						[workAxes.secondAxis]: border
					})
				}
			}
		})
	}
	setHexCells(newCoords);
	setUpdateBoard(true);
}
