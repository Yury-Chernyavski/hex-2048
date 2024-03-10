import { IHexCoord, TPixelCoord } from "@/models";

export const hexToPixel = (hexData: IHexCoord[], width: number): TPixelCoord[] => {
	const pixelArr: TPixelCoord[] = [];
	hexData.map(c => {
		const x = (width / 2.1) * Math.sqrt(3) * (c.y + c.x / 2) + ((550 - width / 2) / 2);
		const y = (width / 2.1) * 3 / 2 * c.x + ((500 - width) / 2);

		pixelArr.push({ x, y, value: c.value });
	});

	return pixelArr;
}
