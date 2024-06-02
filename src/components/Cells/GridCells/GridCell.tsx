import { ICell } from "@/models";
import { FC } from "react";
import "./GridCell.css";

export const GridCell: FC<ICell> = ({
	style,
}): JSX.Element => (
	<div
		style={style}
		className="gridCell"></div>
);
