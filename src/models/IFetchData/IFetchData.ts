
export interface IFetchData<T> {
	radius?: number,
	body: T[] | [],
	abortSignal: AbortSignal
}
