import * as ol from 'openlayers';
import DrawingContext from './drawing-context';
import UpdatedGeoReceiver from './geo-receiver';
import DrawingControl from './drawing-control';
import { Shape } from '../shape-utils';
import { GeometryJSON, GeometryJSONProperties } from '../geometry';
type GeoProps = GeometryJSONProperties & {
    [index: string]: any;
};
declare abstract class BasicDrawingControl implements DrawingControl {
    protected context: DrawingContext;
    protected receiver: UpdatedGeoReceiver;
    protected geoFormat: ol.format.GeoJSON;
    protected mouseDragActive: boolean;
    protected drawingActive: boolean;
    protected properties: GeoProps;
    abstract setGeo(geoJSON: GeometryJSON): void;
    abstract startDrawing(): void;
    protected constructor(context: DrawingContext, receiver: UpdatedGeoReceiver);
    setProperties(properties: GeoProps): void;
    getProperties(): GeoProps;
    protected applyPropertiesToFeature(feature: ol.Feature): void;
    protected abstract getShape(): Shape;
    protected abstract getGeoType(): ol.geom.GeometryType;
    protected featureToGeo(feature: ol.Feature): GeometryJSON;
    protected writeExtendedGeoJSON(feature: ol.Feature): GeometryJSON;
    cancelDrawing(): void;
    setActive(active: boolean): void;
    isActive(): boolean;
    isMouseDragActive(): boolean;
    isDrawing(): boolean;
    updateBuffer(buffer: number, bufferUnit: string): void;
}
export default BasicDrawingControl;
