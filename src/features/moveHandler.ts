import { groupAxis } from "@/helpers/groupAxis";
import { IHexCoord, IMoveHandler } from "@/models";

export const moveHandler = ({event, hexCoord}: IMoveHandler) => {
	let key: keyof IHexCoord;

	switch (event) {
		case "w": {
			key = "x";
			const sortByAxis = groupAxis<IHexCoord>(hexCoord, key);
			console.log(sortByAxis);
			break;
		}
		case "s": {
			key = "x";
			const sortByAxis = groupAxis<IHexCoord>(hexCoord, key);
			console.log(sortByAxis);
			break;
		}
		case "q":
		case "d":
		case "a":
		case "e": {
			console.log(event);
		}
	}
}
