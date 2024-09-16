import * as ol from 'openlayers';
import { GeometryJSON } from '../geometry';
import Shape from './shape';
/**
 * Detects shapes of GeometryJSON objects by evaluating their geometric contents
 */
declare class ShapeDetector {
    private geoFormat;
    /**
     * Constructs an instance of the ShapeDetector
     */
    constructor();
    /**
     * Gets the shape of GeometryJSON object
     * @param geoJSON - GeometryJSON object
     * @returns Shape of geometry
     */
    shapeFromGeoJSON(geoJSON: GeometryJSON): Shape;
    /**
     * Gets the shape of an Open Layers feature
     * @param feature - Open Layers feature
     * @returns Shape of geometry
     */
    shapeFromFeature(feature: ol.Feature): Shape;
    /**
     * Checks if feature matches shape
     * @param feature - Open Layers feature
     * @returns true if geometry is a line
     */
    isLineFeature(feature: ol.Feature): boolean;
    /**
     * Checks if feature matches shape
     * @param feature - Open Layers feature
     * @returns true if geometry is a point
     */
    isPointFeature(feature: ol.Feature): boolean;
    /**
     * Checks if feature matches shape
     * @param feature - Open Layers feature
     * @returns true if geometry is a bounding box
     */
    isBoundingBoxFeature(feature: ol.Feature): boolean;
    /**
     * Checks if feature matches shape
     * @param feature - Open Layers feature
     * @returns true if geometry is a point radius
     */
    isPointRadiusFeature(feature: ol.Feature): boolean;
    /**
     * Checks if feature matches shape
     * @param feature - Open Layers feature
     * @returns true if geometry is a polygon
     */
    isPolygonFeature(feature: ol.Feature): boolean;
}
export default ShapeDetector;
