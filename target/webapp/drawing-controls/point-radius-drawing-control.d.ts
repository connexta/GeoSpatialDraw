import * as ol from 'openlayers';
import DrawingContext from './drawing-context';
import UpdatedGeoReceiver from './geo-receiver';
import BasicDrawingControl from './basic-drawing-control';
import { Shape } from '../shape-utils';
import { GeometryJSON } from '../geometry';
type DrawingFeatures = {
    feature: ol.Feature;
    bufferFeature: ol.Feature;
};
/**
 * Drawing Control for a circle/point radius
 */
declare class PointRadiusDrawingControl extends BasicDrawingControl {
    private animationFrameId;
    private animationFrame;
    private initalCenter;
    /**
     * Creates drawing control
     * @param context - Drawing context
     * @param receiver - callback for returning updates to GeometryJSON
     */
    constructor(context: DrawingContext, receiver: UpdatedGeoReceiver);
    private startDrawAnimation;
    private stopDrawAnimation;
    private reorientRadiusLineFeature;
    onCompleteDrawing(e: any): void;
    onStartDrawing(e: any): void;
    onStartModify(e: any): void;
    onCompleteModify(e: any): void;
    makeFeatures(geoJSON: GeometryJSON): DrawingFeatures;
    private makeRadiusLineFromPoint;
    private pointsEqual;
    private toLine;
    private toPoint;
    private updatePointFromRadiusLine;
    private getFeatureFromDrawEvent;
    private getFeatureModifyEvent;
    setGeo(geoJSON: GeometryJSON): void;
    getStaticStyle(): ol.style.Style | ol.style.Style[];
    startDrawing(): void;
    private startDrawingInteraction;
    getShape(): Shape;
    getGeoType(): ol.geom.GeometryType;
    cancelDrawing(): void;
}
export default PointRadiusDrawingControl;
