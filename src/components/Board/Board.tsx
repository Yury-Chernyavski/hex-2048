import { fetchData } from "@/api";
import { Cell } from "@/components";
import { colors } from "@/constants/colors";
import { moveHandler } from "@/features/moveHandler";
import { hexToPixel } from "@/helpers/hexToPixel";
import { setGrid } from "@/helpers/setGrid";
import { useCalcCellSize } from "@/hooks/useCalcCellSize";
import { useThrottle } from "@/hooks/useThrottle";
import { IHexCoord, TPixelCoord } from "@/models";
import { FC, useEffect, useLayoutEffect, useState } from "react";

export const Board: FC = () => {
	const radius: number = 3;
	const sizeCell = useCalcCellSize(radius);
	const [pixelGridCoords, setPixelGridCoords] = useState<TPixelCoord[]>([]);
	const [hexCells, setHexCells] = useState<IHexCoord[]>([]);
	const [pixelCells, setPixelCells] = useState<TPixelCoord[]>([]);
	const [updateBoard, setUpdateBoard] = useState<boolean>(false);
	const moveThrottle = useThrottle(moveHandler, 750);

	const handleKeyDown = (event: KeyboardEvent) => {
		moveThrottle({
			radius,
			event: event.key,
			hexCells,
			setHexCells,
			setUpdateBoard,
		});
	};

	useLayoutEffect(() => {
		setPixelGridCoords(hexToPixel(setGrid(radius), sizeCell.width));
	}, [sizeCell]);

	useEffect(() => {
		const getData = async () => {
			try {
				const res = await fetchData<IHexCoord>({
					radius,
					body: hexCells,
				});

				res && setHexCells([...hexCells, ...res.data]);
			} catch (e) {
				console.error(e);
			}
		};

		getData();
		setUpdateBoard(false);
	}, [updateBoard, radius]);

	useLayoutEffect(() => {
		setPixelCells([...hexToPixel(hexCells, sizeCell.width)]);
	}, [hexCells, sizeCell.width]);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [hexCells]);

	return (
		<div>
			{pixelCells.map((c, index) => (
				<Cell
					key={index}
					coordinates={hexCells[index]}
					style={{
						width: `${sizeCell.width}px`,
						height: `${sizeCell.height}px`,
						top: `${c.x}px`,
						left: `${c.y}px`,
					}} />
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
				/>
			))}
		</div>
	);
};
