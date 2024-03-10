import { IHexCoord } from '@/models';
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ICell extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	coordinates?: IHexCoord,
	// value?: number
}
