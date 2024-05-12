import { groupAxis } from "@/helpers/groupAxis";
import { IHexCoord, IMoveLogic, IWorkAxes } from "@/models";
import { moveLogic } from "./moveLogic";

export const moveHandler = (moveData: IMoveLogic<IHexCoord>) => {
	let newWorkAxes: IWorkAxes<IHexCoord>;

	switch (moveData.event) {
		case "w": {
			newWorkAxes = { mainAxis: "x", firstAxis: "y", secondAxis: "z" };
			const groupedByAxis = groupAxis<IHexCoord>(moveData.hexCells, newWorkAxes.mainAxis);
			console.log(groupedByAxis);
			
			moveLogic({ ...moveData, newWorkAxes, groupedHexArr: groupedByAxis });
			break;
		}
		case "s": {
			newWorkAxes = { mainAxis: "x", firstAxis: "z", secondAxis: "y" };
			const groupedByAxis = groupAxis<IHexCoord>(moveData.hexCells, newWorkAxes.mainAxis);
			console.log(groupedByAxis);
			moveLogic({ ...moveData, newWorkAxes, groupedHexArr: groupedByAxis });
			break;
		}
		case "q": {
			newWorkAxes = { mainAxis: "y", firstAxis: "x", secondAxis: "z" };
			const groupedByAxis = groupAxis<IHexCoord>(moveData.hexCells, newWorkAxes.mainAxis);
			console.log(groupedByAxis);
			moveLogic({ ...moveData, newWorkAxes, groupedHexArr: groupedByAxis });
			break;
		}
		case "d": {
			newWorkAxes = { mainAxis: "y", firstAxis: "z", secondAxis: "x" };
			const groupedByAxis = groupAxis<IHexCoord>(moveData.hexCells, newWorkAxes.mainAxis);
			console.log(groupedByAxis);
			moveLogic({ ...moveData, newWorkAxes, groupedHexArr: groupedByAxis });
			break;
		}
		case "e": {
			newWorkAxes = { mainAxis: "z", firstAxis: "y", secondAxis: "x" };
			const groupedByAxis = groupAxis<IHexCoord>(moveData.hexCells, newWorkAxes.mainAxis);
			moveLogic({ ...moveData, newWorkAxes, groupedHexArr: groupedByAxis });
			break;
		}
		case "a": {
			newWorkAxes = { mainAxis: "z", firstAxis: "x", secondAxis: "y" };
			const groupedByAxis = groupAxis<IHexCoord>(moveData.hexCells, newWorkAxes.mainAxis);
			moveLogic({ ...moveData, newWorkAxes, groupedHexArr: groupedByAxis });
			break;
		}
	}
}
