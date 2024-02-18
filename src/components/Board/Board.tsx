import { fetchData } from "@/api";
import { hexToPixel } from "@/helpers/hexToPixel";
import { setGrid } from "@/helpers/setGrid";
import { useCalcCellSize } from "@/hooks/useCalcCellSize";
import { IHexCoord, TPixelCoord } from "@/models";
import { FC, useEffect, useState } from "react";

export const Board: FC = () => {
	const radius: number = 2;
	const sizeCell = useCalcCellSize(radius);
	// const [hexGridCoords, setHexGridCoords] = useState<IHexCoord[]>([]);
	const [pixelGridCoords, setPixelGridCoords] = useState<TPixelCoord[]>([]);
	const [hexCells, setHexCells] = useState<IHexCoord[]>([]);
	
	useEffect(() => {
		setPixelGridCoords(hexToPixel(setGrid(radius), radius));
	}, []);
	console.log(sizeCell);
	
	// TODO: rewrite a custom hook useFetch and delete logic below
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

	return (
		<div>
			{pixelGridCoords.map((c, index) => {
				return (
					<div key={index}>
						{c.x} {c.y}
					</div>
				);
			})}
			<div>
				{sizeCell.width} {sizeCell.height}
			</div>
		</div>
	);
};
