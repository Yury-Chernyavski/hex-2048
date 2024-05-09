import { IHexCoord } from "../";

export type ISortedData<T> = {
	[key in keyof T]: T[];
}
