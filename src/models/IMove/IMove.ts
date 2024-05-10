import { Dispatch, SetStateAction } from "react";
import { IGroupedData } from "../ISortedData/ISortedDate";
import { IHexCoord } from "../IHexCoord/IHexCoord";

export interface IWorkAxes<T> {
	mainAxis: keyof T,
	firstAxis: keyof T,
	secondAxis: keyof T,
}
export interface IMoveHandler {
	radius: number,
	event: string,
	hexCells: IHexCoord[],
	setHexCells: Dispatch<SetStateAction<IHexCoord[]>>,
	setUpdateBoard: Dispatch<SetStateAction<boolean>>
}

export interface IMoveLogic<T> {
	radius: number,
	// mainAxis: keyof T,
	workAxes: IWorkAxes<T>,
	groupedHexArr: IGroupedData<T>,
	setHexCells: Dispatch<SetStateAction<T[]>>,
	setUpdateBoard: Dispatch<SetStateAction<boolean>>
}
