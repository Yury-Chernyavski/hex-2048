import { Dispatch, SetStateAction } from "react";
import { IHexCoord } from "../IHexCoord/IHexCoord";
import { IGroupedData } from "../ISortedData/ISortedDate";
import { IWorkAxes } from "../IWorkAxes/IWorkAxes";

export interface IMoveLogic<T> extends IMoveHandler {
	radius: number,
	setNewArrCells: Dispatch<SetStateAction<T[]>>,
}
export interface IMoveHandler {
	event: string,
	hexCells: IHexCoord[],
}

export interface IMoveData<T> extends IMoveLogic<T> {
	newWorkAxes: IWorkAxes<T>,
	groupedHexArr: IGroupedData<T>,
}
