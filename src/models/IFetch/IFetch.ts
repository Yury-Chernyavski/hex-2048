import { Dispatch, SetStateAction } from "react";

export interface IFetch<T> {
	hexCells: T[],
	updateBoard: boolean,
	setUpdateBoard: Dispatch<SetStateAction<boolean>>
}
