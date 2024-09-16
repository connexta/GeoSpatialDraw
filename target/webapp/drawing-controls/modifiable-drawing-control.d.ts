import * as ol from 'openlayers';
import DrawingContext from './drawing-context';
import UpdatedGeoReceiver from './geo-receiver';
import BasicDrawingControl from './basic-drawing-control';
import { GeometryJSON } from '../geometry';
declare abstract class ModifiableDrawingControl extends BasicDrawingControl {
    protected constructor(context: DrawingContext, receiver: UpdatedGeoReceiver);
    getGeoJSONFromCompleteDrawEvent(e: any): GeometryJSON;
    getGeoJSONFromCompleteModifyEvent(e: any): GeometryJSON;
    onCompleteDrawing(e: any): void;
    onStartDrawing(_e: any): void;
    onStartModify(_e: any): void;
    onCompleteModify(e: any): void;
    makeFeature(geoJSON: GeometryJSON): ol.Feature;
    getStaticStyle(feature: ol.Feature): ol.style.Style | ol.style.Style[];
    protected abstract makeEmptyFeature(): ol.Feature;
    getDefaultStaticStyle(): ol.style.Style | ol.style.Style[];
    setGeo(geoJSON: GeometryJSON): void;
    startDrawing(): void;
    updateBuffer(buffer: number, bufferUnit: string): void;
    private startDrawingInteraction;
}
export default ModifiableDrawingControl;
