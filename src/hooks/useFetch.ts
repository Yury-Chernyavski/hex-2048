import { fetchData } from "@/api";
import { useEffect, useState } from "react";

export const useFetch = <T>(hexCell: T[]): T[] => {
	const [data, setData] = useState<T[]>(hexCell);

	useEffect(() => {
		const getData = async () => {
			try {
				const res = await fetchData<T>({
					radius: 2,
					body: data,
				});

				res && setData([...hexCell, ...res.data]);
			} catch (e) {
				console.error(e);
			}
		};

		getData();
	}, []);

	return data;
}
