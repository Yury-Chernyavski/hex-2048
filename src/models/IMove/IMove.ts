import { Dispatch, SetStateAction } from "react";
import { ISortedData } from "../ISortedData/ISortedDate";
import { IHexCoord } from "../IHexCoord/IHexCoord";

export interface IWorkAxes {
	firstAxis: "x" | "y" | "z",
	secondAxis: "x" | "y" | "z",
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
	mainAxis: keyof T,
	workAxes: IWorkAxes,
	sortedHexArr: ISortedData<T>,
	setHexCells: Dispatch<SetStateAction<T[]>>,
	setUpdateBoard: Dispatch<SetStateAction<boolean>>
}
