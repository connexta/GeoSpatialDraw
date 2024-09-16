import * as ol from 'openlayers';
import DrawingContext from './drawing-context';
import UpdatedGeoReceiver from './geo-receiver';
import BasicDrawingControl from './basic-drawing-control';
import { Shape } from '../shape-utils';
import { GeometryJSON, Extent } from '../geometry';
type ExtentEvent = {
    extent: Extent;
};
/**
 * Drawing Control for drawing a bounding box
 */
declare class BoundingBoxDrawingControl extends BasicDrawingControl {
    /**
     * Creates drawing control
     * @param context - Drawing context
     * @param receiver - callback for returning updates to GeometryJSON
     */
    constructor(context: DrawingContext, receiver: UpdatedGeoReceiver);
    getGeoType(): ol.geom.GeometryType;
    getShape(): Shape;
    getDefaultStaticStyle(): ol.style.Style | ol.style.Style[];
    setGeo(geoJSON: GeometryJSON): void;
    startDrawing(): void;
    private startDrawingInteraction;
    extentChanged(e: ExtentEvent): void;
    extentToGeoJSON(bbox: Extent): GeometryJSON;
}
export default BoundingBoxDrawingControl;
