import { getNewCells } from "@/api";
import { Cell } from "@/components";
import { KEYS } from "@/constants/keys";
import { moveHandler } from "@/features/moveHandler";
import { hexToPixel } from "@/helpers/hexToPixel";
import { setGrid } from "@/helpers/setGrid";
import { useCalcCellSize } from "@/hooks/useCalcCellSize";
import { useThrottle } from "@/hooks/useThrottle";
import { IHexCoord, IMoveLogic, TPixelCoord } from "@/models";
import { FC, useEffect, useLayoutEffect, useState } from "react";


export const Board: FC = () => {
	const radius: number = 3;
	const sizeCell = useCalcCellSize(radius);
	const [pixelGridCoords, setPixelGridCoords] = useState<TPixelCoord[]>([]);
	const [hexCells, setHexCells] = useState<IHexCoord[]>([]);
	const [pixelCells, setPixelCells] = useState<TPixelCoord[]>([]);
	const [newArrCells, setNewArrCells] = useState<IHexCoord[]>([]);
	const moveThrottle = useThrottle<IMoveLogic<IHexCoord>>(moveHandler, 750);

	const handleKeyDown = (event: KeyboardEvent) => {
		if (KEYS.includes(event.key)) {
			moveThrottle({
				radius,
				event: event.key,
				hexCells,
				setNewArrCells,
			});
		}
	};

	useLayoutEffect(() => {
		setPixelGridCoords(hexToPixel(setGrid(radius), sizeCell.width));
	}, [sizeCell.width]);

	useEffect(() => {
		// getNewCells(radius, newArrCells)
		// 	.then(newCells => newCells && setHexCells([...newArrCells, ...newCells]),
		// );
		const getData = async () => {
			try {
				const data = await getNewCells(radius, newArrCells);
				data && setHexCells([...newArrCells, ...data]);
			} catch (e) {
				console.error(e);
			}
		};

		getData();
		// setHexCells(prevState => ([...prevState, ...newArrCells]))
	}, [radius, newArrCells]);

	useLayoutEffect(() => {
		setPixelCells([...hexToPixel(hexCells, sizeCell.width)]);
	}, [hexCells, sizeCell.width]);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	});

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
					}}
				/>
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
