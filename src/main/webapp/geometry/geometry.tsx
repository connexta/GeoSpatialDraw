import { Shape } from '../shape-utils'
import { LengthUnit, METERS } from './units'

/**
 * 2D extent of a geometry represented as an array in the format of
 * [minimumX, minimumY, maximumX, maximumY]
 */
type Extent = [number, number, number, number]

/**
 * Custom GeoJSON properties used in GeometryJSON
 */
type GeometryJSONProperties = {
  /**
   * CSS color of geometry
   */
  color: string
  /**
   * Shape of geometry
   */
  shape: Shape
  /**
   * Buffer size
   */
  buffer?: number
  /**
   * Buffer size unit of measurement
   */
  bufferUnit: LengthUnit
  /**
   * Unique identifier
   */
  id: string
}

const DEFAULT_PROPERTIES: GeometryJSONProperties = {
  shape: 'Polygon',
  id: '',
  color: '#996600',
  buffer: 0,
  bufferUnit: METERS,
}

/**
 * GeoJSON Geometries supported by GeometryJSON
 */
type Geometry = GeoJSON.Polygon | GeoJSON.Point | GeoJSON.LineString

/**
 * Extended GeoJSON used to represent map geometry.
 * For details on GeoJSON see: https://geojson.org/
 */
type GeometryJSON = GeoJSON.Feature & {
  bbox: Extent
  properties: GeometryJSONProperties
  geometry: Geometry
}

const DEFAULT_POLYGON: GeoJSON.Polygon = {
  type: 'Polygon',
  coordinates: [[[0, 0]]],
}

const DEFAULT_POINT: GeoJSON.Point = {
  type: 'Point',
  coordinates: [0, 0],
}

const DEFAULT_GEOMETRY: { [shape in Shape]: Geometry } = {
  Polygon: DEFAULT_POLYGON,
  'Bounding Box': DEFAULT_POLYGON,
  'Point Radius': DEFAULT_POINT,
  Line: {
    type: 'LineString',
    coordinates: [[0, 0]],
  },
  Point: DEFAULT_POINT,
}

/**
 * BUFFER_SHAPE_PROPERTY value for circle buffer geometry
 */
const CIRCLE_BUFFER_PROPERTY_VALUE = 'circle'
/**
 * BUFFER_SHAPE_PROPERTY value for polygon and line buffer geometry
 */
const POLYGON_LINE_BUFFER_PROPERTY_VALUE = 'polygon/line'
/**
 * The BUFFER_SHAPE_PROPERTY is set in
 * GeometryJSON to identify buffered geometry for use
 * in dynamic styles.
 */
const BUFFER_SHAPE_PROPERTY = 'bufferShape'
/**
 * Value allowed in BUFFER_SHAPE_PROPERTY
 */
type BufferShape = 'circle' | 'polygon/line'

export {
  GeometryJSON,
  GeometryJSONProperties,
  Geometry,
  BufferShape,
  Extent,
  BUFFER_SHAPE_PROPERTY,
  CIRCLE_BUFFER_PROPERTY_VALUE,
  DEFAULT_GEOMETRY,
  DEFAULT_PROPERTIES,
  POLYGON_LINE_BUFFER_PROPERTY_VALUE,
}
