import * as turf from '@turf/turf';
import { Shape } from '../shape-utils';
import { LengthUnit } from './units';
/**
 * 2D extent of a geometry represented as an array in the format of
 * [minimumX, minimumY, maximumX, maximumY]
 */
type Extent = [number, number, number, number];
/**
 * Custom GeoJSON properties used in GeometryJSON
 */
type GeometryJSONProperties = {
    /**
     * CSS color of geometry
     */
    color: string;
    /**
     * Shape of geometry
     */
    shape: Shape;
    /**
     * Buffer size
     */
    buffer?: number;
    /**
     * Buffer size unit of measurement
     */
    bufferUnit: LengthUnit;
    /**
     * Unique identifier
     */
    id: string;
};
declare const DEFAULT_PROPERTIES: GeometryJSONProperties;
/**
 * GeoJSON Geometries supported by GeometryJSON
 */
type Geometry = turf.Polygon | turf.Point | turf.LineString;
/**
 * Extended GeoJSON used to represent map geometry.
 * For details on GeoJSON see: https://geojson.org/
 */
type GeometryJSON = turf.Feature & {
    bbox: Extent;
    properties: GeometryJSONProperties;
    geometry: Geometry;
};
declare const DEFAULT_GEOMETRY: {
    [shape in Shape]: Geometry;
};
/**
 * BUFFER_SHAPE_PROPERTY value for circle buffer geometry
 */
declare const CIRCLE_BUFFER_PROPERTY_VALUE = "circle";
/**
 * BUFFER_SHAPE_PROPERTY value for polygon and line buffer geometry
 */
declare const POLYGON_LINE_BUFFER_PROPERTY_VALUE = "polygon/line";
/**
 * The BUFFER_SHAPE_PROPERTY is set in
 * GeometryJSON to identify buffered geometry for use
 * in dynamic styles.
 */
declare const BUFFER_SHAPE_PROPERTY = "bufferShape";
/**
 * Value allowed in BUFFER_SHAPE_PROPERTY
 */
type BufferShape = 'circle' | 'polygon/line';
export { GeometryJSON, GeometryJSONProperties, Geometry, BufferShape, Extent, BUFFER_SHAPE_PROPERTY, CIRCLE_BUFFER_PROPERTY_VALUE, DEFAULT_GEOMETRY, DEFAULT_PROPERTIES, POLYGON_LINE_BUFFER_PROPERTY_VALUE, };
