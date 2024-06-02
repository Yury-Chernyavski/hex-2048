import { fetchData } from "@/api";
import { Cell, GridCell } from "@/components";
import { KEYS } from "@/constants/keys";
import { moveHandler } from "@/features/moveHandler";
import { hexToPixel } from "@/helpers/hexToPixel";
import { setGrid } from "@/helpers/setGrid";
import { useCalcCellSize } from "@/hooks/useCalcCellSize";
import { useThrottle } from "@/hooks/useThrottle";
import { IHexCoord, IMoveLogic, TPixelCoord } from "@/models";
import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";

export const Board: FC = () => {
	const radius = useRef<number>(3);
	const sizeCell = useCalcCellSize(radius.current);
	const [pixelGridCoords, setPixelGridCoords] = useState<TPixelCoord[]>([]);
	const [hexCells, setHexCells] = useState<IHexCoord[]>([]);
	const [pixelCells, setPixelCells] = useState<TPixelCoord[]>([]);
	const [newArrCells, setNewArrCells] = useState<IHexCoord[]>([]);
	const moveThrottle = useThrottle<IMoveLogic<IHexCoord>>(moveHandler, 750);

	const handleKeyDown = (event: KeyboardEvent) => {
		if (KEYS.includes(event.key)) {
			moveThrottle({
				radius: radius.current,
				event: event.key,
				hexCells,
				setNewArrCells,
			});
		}
	};

	useLayoutEffect(() => {
		setPixelGridCoords(hexToPixel(setGrid(radius.current), sizeCell.width));
	}, [sizeCell.width]);

	useEffect(() => {
		const abortController = new AbortController();
		const abortSignal = abortController.signal;
		fetchData({ radius: radius.current, body: newArrCells, abortSignal })
			.then(res => res?.data)
			.then(data => {
				setHexCells([...newArrCells]);
				setTimeout(() => {
					data && setHexCells(prev => [...prev, ...data]);
				}, 100);
			})
			.catch(e => console.error(e));
			
		return () => {
			abortController.abort();
		}
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
				<GridCell
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
