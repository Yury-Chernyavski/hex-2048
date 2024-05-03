import { IHexCoord } from "@/models"

type ISortedData<T extends IHexCoord> = {
	[key in keyof T]: T[];
}

export const groupAxis = <T extends IHexCoord>(arr: T[], key: keyof T): ISortedData<T> => {
	return arr.reduce<ISortedData<T>>((map, elem) => {
		const keyValue = String(elem[key]) as keyof T;
		map[keyValue] = [...map[keyValue] || [], elem];
		return map;
	}, {} as ISortedData<T>)
}
