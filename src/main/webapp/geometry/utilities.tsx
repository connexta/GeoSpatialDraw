import * as turf from '@turf/turf'
import { Position, Polygon, LineString } from '@turf/turf'
import buffer from '@turf/buffer'
import * as _ from 'lodash'
import { Shape } from '../shape-utils'
import { LengthUnit, METERS } from './units'
import {
  GeometryJSON,
  Geometry,
  Extent,
  BUFFER_SHAPE_PROPERTY,
  CIRCLE_BUFFER_PROPERTY_VALUE,
  DEFAULT_GEOMETRY,
  DEFAULT_PROPERTIES,
  POLYGON_LINE_BUFFER_PROPERTY_VALUE,
} from './geometry'
import { getDistanceInMeters } from '../internal/distance'

const MINIMUM_POLYGON_OR_LINE_COORDINATE_LENGTH_FOR_TURF_JS = 2

/**
 * Creates a full GeometryJSON object from GeoJSON
 *
 * @param id - unique id for geometry
 * @param geometryJSON - base GeoJSON object to extend
 * @param color - CSS color for geometry
 * @param shape - geometry shape
 * @param buffer - buffer size
 * @param bufferUnit - buffer size unit of measurement
 *
 * @returns GeometryJSON
 */
const makeGeometry = (
  id: string,
  geometryJSON: any,
  color: string,
  shape: Shape,
  buffer: number = 0,
  bufferUnit: LengthUnit = METERS
): GeometryJSON => {
  const geometry: Geometry = turf.getGeom(_.cloneDeep(geometryJSON))
  const json: GeometryJSON = {
    type: 'Feature',
    properties: {
      id,
      color,
      shape,
      buffer,
      bufferUnit,
    },
    geometry,
    bbox: [0, 0, 0, 0],
  }
  json.bbox = geoToExtent(makeBufferedGeo(json))
  return json
}

/**
 * Creates an empty GeometryJSON object
 *
 * @param id - unique id for geometry
 * @param shape - geometry shape
 * @param initialProperties - hash of properties to pass to new GeometryJSON
 *
 * @returns GeometryJSON
 */
const makeEmptyGeometry = (
  id: string,
  shape: Shape,
  initialProperties: object = {}
): GeometryJSON => ({
  type: 'Feature',
  properties: {
    ...DEFAULT_PROPERTIES,
    ...initialProperties,
    shape,
    id,
    buffer: shape === 'Point Radius' ? Number.MIN_VALUE : 0,
    bufferUnit: METERS,
  },
  bbox: [0, 0, 0, 0],
  geometry: _.cloneDeep(DEFAULT_GEOMETRY[shape]),
})

/**
 * Creates a buffered GeometryJSON object from a source
 * GeometryJSON object using it's geometry and buffer values
 *
 * @param geo - source GeometryJSON object
 *
 * @returns GeometryJSON with buffer applied
 */
const makeBufferedGeo = (geo: GeometryJSON): GeometryJSON => {
  if (
    ((geo.geometry.type === 'Polygon' &&
      geo.geometry.coordinates[0].length >=
        MINIMUM_POLYGON_OR_LINE_COORDINATE_LENGTH_FOR_TURF_JS) ||
      (geo.geometry.type === 'LineString' &&
        geo.geometry.coordinates.length >=
          MINIMUM_POLYGON_OR_LINE_COORDINATE_LENGTH_FOR_TURF_JS) ||
      geo.geometry.type === 'Point') &&
    geo.properties.shape !== 'Bounding Box' &&
    geo.properties.buffer &&
    geo.properties.bufferUnit &&
    geo.properties.buffer > 0
  ) {
    // Copy JSON since turf.buffer has side effects
    geo = _.cloneDeep(geo)
    const radius = getDistanceInMeters(
      geo.properties.buffer || 0,
      geo.properties.bufferUnit
    )
    let bufferedGeo
    if (geo.geometry.type === 'Point') {
      if (radius > 0) {
        const point = geo.geometry as turf.Point
        bufferedGeo = turf.circle(point.coordinates, radius, {
          units: 'meters',
        })
        bufferedGeo = {
          ...geo,
          geometry: bufferedGeo.geometry,
        }
      } else {
        bufferedGeo = geo
      }
    } else {
      bufferedGeo = buffer(geo, radius, {
        units: 'meters',
      })
    }
    if (bufferedGeo === undefined) {
      return geo
    } else if (bufferedGeo.properties) {
      bufferedGeo.properties[BUFFER_SHAPE_PROPERTY] =
        geo.geometry.type === 'Point'
          ? CIRCLE_BUFFER_PROPERTY_VALUE
          : POLYGON_LINE_BUFFER_PROPERTY_VALUE
    }
    return bufferedGeo as GeometryJSON
  }
  return geo
}

/**
 * Converts an arbitrary bbox value from GeoJSON to a 2D extent value
 *
 * @param bbox - 2D/3D GeoJSON bbox value
 *
 * @returns Extent
 */
const bboxToExtent = (bbox: turf.BBox): Extent => [
  bbox[0],
  bbox[1],
  bbox[2],
  bbox[3],
]

/**
 * Calculates the 2D extent of a GeometryJSON object
 *
 * @param geo - GeometryJSON object
 *
 * @returns Extent
 */
const geoToExtent = (geo: GeometryJSON): Extent => {
  return bboxToExtent(turf.bbox(geo))
}

const convertCoordsToDisplay = (coordinates: Position[]) => {
  const coords = _.cloneDeep(coordinates)
  coords.forEach((coord) => {
    if (coord[0] < 0) {
      coord[0] += 360
    }
  })
  return coords
}

/**
 * If the geo crosses the antimeridian, this will updates its coordinates so
 * that no longitudes are negative. Typically used before displaying a geo on
 * a map. The coordinates are updated in place.
 *
 * @param geo - GeometryJSON object
 */
const adjustGeoCoordsForAntimeridian = (geo: GeometryJSON) => {
  const geometry = geo.geometry
  const bbox = geo.bbox || turf.bbox(geo.geometry)
  const width = Math.abs(bbox[0] - bbox[2])
  const crossesAntimeridian = width > 180
  if (crossesAntimeridian) {
    if (geometry.type === 'LineString') {
      const lineStringCoords = (geometry as LineString).coordinates
      geometry.coordinates = convertCoordsToDisplay(lineStringCoords)
    } else if (geometry.type === 'Polygon') {
      const coords = (geometry as Polygon).coordinates[0]
      geometry.coordinates[0] = convertCoordsToDisplay(coords)
    }
  }
}

export {
  bboxToExtent,
  geoToExtent,
  makeGeometry,
  makeBufferedGeo,
  makeEmptyGeometry,
  adjustGeoCoordsForAntimeridian,
}
