import * as ol from 'openlayers';
import DrawingContext from './drawing-context';
import UpdatedGeoReceiver from './geo-receiver';
import ModifiableDrawingControl from './modifiable-drawing-control';
import { Shape } from '../shape-utils';
/**
 * Drawing Control for drawing a point
 */
declare class PointDrawingControl extends ModifiableDrawingControl {
    /**
     * Creates drawing control
     * @param context - Drawing context
     * @param receiver - callback for returning updates to GeometryJSON
     */
    constructor(context: DrawingContext, receiver: UpdatedGeoReceiver);
    getShape(): Shape;
    getGeoType(): ol.geom.GeometryType;
    cancelDrawing(): void;
    protected makeEmptyFeature(): ol.Feature;
}
export default PointDrawingControl;
