import { ICell } from "@/models";
import { FC } from "react";
import "./Cell.css";
import { colors } from "@/constants/colors";
import HexBackground from "@/assets/hexagon-background.svg?react";

export const Cell: FC<ICell> = ({
	style,
	// children,
	coordinates,
}): JSX.Element => {
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
							fill: `${colors[coordinates?.value]}`,
							height: "100%",
							width: "100%",
						}}
					/>
					<span>{coordinates.value}</span>
				</>
			}
		</div>
	);
};
