import { Extent } from '../geometry';
type BBox = {
    north: number;
    south: number;
    east: number;
    west: number;
};
declare const bboxToExtent: ({ west, south, east, north }: BBox) => Extent;
declare const extentToBBox: ([west, south, east, north]: Extent) => BBox;
type BBoxEditorProps = BBox & {
    setBBox: (bbox: BBox) => void;
};
export { BBox, bboxToExtent, extentToBBox, BBoxEditorProps };
