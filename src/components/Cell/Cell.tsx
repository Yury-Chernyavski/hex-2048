import { ICell } from "@/models";
import { FC } from "react";
import "./Cell.css";

export const Cell: FC<ICell> = ({
	style,
	children,
	coordinates
}): JSX.Element => {
	return (
		<div
			className="cell"
			style={style}
			// data-x={coordinates?.x}
			// data-y={coordinates?.y}
			// data-z={coordinates?.z}
			// data-value={coordinates?.value}
		>
			{children}
		</div>
	)
}
