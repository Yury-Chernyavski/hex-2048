export const calcCellSize = (radius: number): {width: number, height: number} => {
	const numOfCol = radius * 2 - 2;
	const width = 500 / ((3 * numOfCol / 4) + 1);
	const height = Math.sqrt(3) * width / 2;

	return {width, height};
}
