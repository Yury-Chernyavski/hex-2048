import { fetchData } from "@/api";
import { IFetch } from "@/models";
import { useEffect, useState } from "react";

export const useFetch = <T>({ hexCells, updateBoard, setUpdateBoard }: IFetch<T>): T[] => {
	const [data, setData] = useState<T[]>([])

	useEffect(() => {
		const getData = async () => {
			try {
				const res = await fetchData<T>({
					radius: 2,
					body: hexCells,
				});

				res && setData(res.data);
			} catch (e) {
				console.error(e);
			}
		};

		getData();
		setUpdateBoard(false);
	}, [updateBoard]);

	return data;
}
