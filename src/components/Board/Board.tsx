import { FC, useEffect, useState } from "react";
import { fetchData } from "@/api";
import { hexToPixel } from "@/helpers/hexToPixel";
import { setGrid } from "@/helpers/setGrid";
import { useCalcCellSize } from "@/hooks/useCalcCellSize";
import { IHexCoord, TPixelCoord } from "@/models";
import { Cell } from "@/components";
import { useThrottle } from "@/hooks/useThrottle";
import { moveHandler } from "@/features/moveHandler";

export const Board: FC = () => {
	const radius: number = 2;
	const sizeCell = useCalcCellSize(radius);
	const [pixelGridCoords, setPixelGridCoords] = useState<TPixelCoord[]>([]);
	const [hexCells, setHexCells] = useState<IHexCoord[]>([]);
	const [pixelCells, setPixelCells] = useState<TPixelCoord[]>([]);
	const [updateBoard, setUpdateBoard] = useState<boolean>(false);
	const fn = useThrottle<string>(moveHandler, 750);
	
	const handleKeyDown = (event: KeyboardEvent) => {
		fn(event.key);
	}

	useEffect(() => {
		setPixelGridCoords(hexToPixel(setGrid(radius), sizeCell.width));
	}, [sizeCell]);

	useEffect(() => {
		const getData = async () => {
			try {
				const res = await fetchData<IHexCoord>({
					radius: 2,
					body: hexCells,
				});

				res && setHexCells([...hexCells, ...res.data]);
				setUpdateBoard(false);
			} catch (e) {
				console.error(e);
			}
		};

		getData();
	}, [updateBoard]);

	useEffect(() => {
		setPixelCells([...hexToPixel(hexCells, sizeCell.width)]);
	}, [hexCells, sizeCell]);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		}
	}, [])

	return (
		<div>
			{pixelCells.map((c, index) => (
				<Cell
					key={index}
					style={{
						width: `${sizeCell.width}px`,
						height: `${sizeCell.height}px`,
						top: `${c.x}px`,
						left: `${c.y}px`,
					}}>
					{c.value}
				</Cell>
			))}
			{pixelGridCoords.map((c, index) => (
				<Cell
					key={index}
					style={{
						width: `${sizeCell.width}px`,
						height: `${sizeCell.height}px`,
						top: `${c.x}px`,
						left: `${c.y}px`,
					}}
					// coordinates={c}
				/>
			))}
		</div>
	);
};
