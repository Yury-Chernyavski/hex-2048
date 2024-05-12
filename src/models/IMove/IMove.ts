import { Dispatch, SetStateAction } from "react";
import { IHexCoord } from "../IHexCoord/IHexCoord";
import { IGroupedData } from "../ISortedData/ISortedDate";
import { IWorkAxes } from "../IWorkAxes/IWorkAxes";

export interface IMoveLogic<T> extends IMoveHandler{
	radius: number,
	oldWorkAxes: IWorkAxes<IHexCoord> | null,
	setHexCells: Dispatch<SetStateAction<T[]>>,
	setOldWorkAxes: Dispatch<SetStateAction<IWorkAxes<IHexCoord> | null>>,
}
export interface IMoveHandler{
	event: string,
	hexCells: IHexCoord[],
	// radius: number,
	// setHexCells: Dispatch<SetStateAction<IHexCoord[]>>,
}

export interface IMoveData<T> extends IMoveLogic<T> {
	newWorkAxes: IWorkAxes<T>,
	groupedHexArr: IGroupedData<T>,
}
// export type IMoveData<T> = IMoveHandler & IMoveLogic<T>;


