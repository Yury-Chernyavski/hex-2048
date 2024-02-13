import { FC, useEffect, useState } from "react";
import { fetchData } from "../../api";
import { IHexCoord } from "../../models";

export const Board: FC = () => {
	const [hexCells, setHexCells] = useState<IHexCoord[]>([]);
	useEffect(() => {
		const getData = async () => {
			try {
				const res = await fetchData<IHexCoord>({
					radius: 2,
					body: hexCells,
				});

				res && setHexCells(res.data);
			} catch (e) {
				console.error(e);
			}
		};

		getData();
	}, []);

	console.log(hexCells);
	
	return <div></div>;
};
