import HexBackground from "@/assets/hexagon-background.svg?react";
import { COLORS } from "@/constants/colors";
import { ICell } from "@/models";
import { FC, useLayoutEffect, useState } from "react";
import "./Cell.css";

export const Cell: FC<ICell> = ({
	style,
	coordinates,
}): JSX.Element => {
	const [scale, setScale] = useState<number>(1);

	useLayoutEffect(() => {
		setScale(1.3);

		setTimeout(() => setScale(1), 100);
	}, []);


	return (
		<div
			className="cell"
			style={style}
			data-x={coordinates?.x}
			data-y={coordinates?.y}
			data-z={coordinates?.z}
			data-value={coordinates?.value}>
			{coordinates && 
				<>
					<HexBackground
						style={{
							fill: `${COLORS[coordinates?.value]}`,
							height: "100%",
							width: "100%",
							transform: `scale(${scale})`,
							transition: "transform .2s"
						}}
					/>
					<span>{coordinates.value}</span>
				</>
			}
		</div>
	);
};
