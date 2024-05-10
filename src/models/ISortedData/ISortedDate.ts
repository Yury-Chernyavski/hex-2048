
export type IGroupedData<T> = {
	[key in keyof T]: T[];
}
