import { IHexCoord } from "../IHexCoord/IHexCoord";

export interface IMoveHandler {
	event: string,
	hexCoord: IHexCoord[]
}
