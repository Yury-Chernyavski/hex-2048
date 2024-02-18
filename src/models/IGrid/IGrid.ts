import { Dispatch, SetStateAction } from "react";
import { ISize } from "@/models";

export interface IGrid {
	radius: number,
	setSize: Dispatch<SetStateAction<ISize>>
}
