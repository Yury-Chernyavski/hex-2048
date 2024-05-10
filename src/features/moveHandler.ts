import { groupAxis } from "@/helpers/groupAxis";
import { IHexCoord, IMoveHandler, IWorkAxes } from "@/models";
import { moveLogic } from "./moveLogic";

export const moveHandler = (moveData: IMoveHandler) => {
	// let mainAxis: keyof IHexCoord;
	let workAxes: IWorkAxes<IHexCoord>;

	switch (moveData.event) {
		case "w": {
			// mainAxis = "x";
			workAxes = { mainAxis: "x", firstAxis: "y", secondAxis: "z" };
			const groupedByAxis = groupAxis<IHexCoord>(moveData.hexCells, workAxes.mainAxis);
			moveLogic({ ...moveData, workAxes, groupedHexArr: groupedByAxis });
			break;
		}
		// case "s": {
		// 	mainAxis = "x";
		// 	workAxes = { firstAxis: "z", secondAxis: "y" };
		// 	const sortByAxis = groupAxis<IHexCoord>(moveData.hexCells, mainAxis);
		// 	moveLogic({ ...moveData, workAxes, mainAxis, sortedHexArr: sortByAxis })
		// 	break;
		// }
		// case "q": {
		// 	mainAxis = "y";
		// 	workAxes = { firstAxis: "x", secondAxis: "z" };
		// 	const sortByAxis = groupAxis<IHexCoord>(moveData.hexCells, mainAxis);
		// 	moveLogic({ ...moveData, workAxes, mainAxis, sortedHexArr: sortByAxis });
		// 	break;
		// }
		// case "d": {
		// 	mainAxis = "y";
		// 	workAxes = { firstAxis: "z", secondAxis: "x" };
		// 	const sortByAxis = groupAxis<IHexCoord>(moveData.hexCells, mainAxis);
		// 	moveLogic({ ...moveData, workAxes, mainAxis, sortedHexArr: sortByAxis });
		// 	break;
		// }
		// case "e": {
		// 	mainAxis = "z";
		// 	workAxes = { firstAxis: "y", secondAxis: "x" };
		// 	const sortByAxis = groupAxis<IHexCoord>(moveData.hexCells, mainAxis);
		// 	moveLogic({ ...moveData, workAxes, mainAxis, sortedHexArr: sortByAxis });
		// 	break;
		// }
		// case "a": {
		// 	mainAxis = "z";
		// 	workAxes = { firstAxis: "x", secondAxis: "y" };
		// 	const sortByAxis = groupAxis<IHexCoord>(moveData.hexCells, mainAxis);
		// 	moveLogic({ ...moveData, workAxes, mainAxis, sortedHexArr: sortByAxis });
		// 	break;
		// }
	}
}
