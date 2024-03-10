import { ICell } from "@/models";
import { FC } from "react";

export const Cell: FC<ICell> = ({
	style,
	children,
	coordinates
}): JSX.Element => {
	return (
		<div
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
