import { getNewCells } from "@/api";
import { Cell } from "@/components";
import { KEYS } from "@/constants/keys";
import { moveHandler } from "@/features/moveHandler";
import { hexToPixel } from "@/helpers/hexToPixel";
import { setGrid } from "@/helpers/setGrid";
import { useCalcCellSize } from "@/hooks/useCalcCellSize";
import { useThrottle } from "@/hooks/useThrottle";
import { IHexCoord, IMoveLogic, IWorkAxes, TPixelCoord } from "@/models";
import { FC, useEffect, useLayoutEffect, useState } from "react";

export const Board: FC = () => {
	const radius: number = 10;
	const sizeCell = useCalcCellSize(radius);
	const [pixelGridCoords, setPixelGridCoords] = useState<TPixelCoord[]>([]);
	const [hexCells, setHexCells] = useState<IHexCoord[]>([]);
	const [pixelCells, setPixelCells] = useState<TPixelCoord[]>([]);
	const [oldWorkAxes, setOldWorkAxes] = useState<IWorkAxes<IHexCoord> | null>(null);
	const moveThrottle = useThrottle<IMoveLogic<IHexCoord>>(moveHandler, 750);

	const handleKeyDown = (event: KeyboardEvent) => {
		if (KEYS.includes(event.key)) {
			moveThrottle({
				radius,
				event: event.key,
				hexCells,
				setHexCells,
				oldWorkAxes,
				setOldWorkAxes
			});

			// getNewCells(radius, hexCells)
			// 	.then(newCells => newCells && setHexCells(prevData => ([...prevData, ...newCells])));
		}
	};

	useLayoutEffect(() => {
		setPixelGridCoords(hexToPixel(setGrid(radius), sizeCell.width));
		console.log(pixelGridCoords);
		
	}, [sizeCell]);

	useEffect(() => {
		getNewCells(radius, hexCells)
			.then(newCells => newCells && setHexCells([...hexCells, ...newCells]),
		);
		// const getData = async () => {
		// 		try {
		// 		const data = await getNewCells(radius, hexCells);
		// 		data && setHexCells([...hexCells, ...data]);
		// 	} catch (e) {
		// 		console.error(e);
		// 	}
		// };

		// getData();
	}, [radius, oldWorkAxes]);

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
