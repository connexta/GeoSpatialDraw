import * as turf from '@turf/turf'
import { makeGeometry } from './utilities'
import { GeometryJSON, Geometry, Extent, DEFAULT_PROPERTIES } from './geometry'
import { Shape } from '../shape-utils'
import { LengthUnit } from './units'

/**
 * Creates a GeometryJSON object from a GeoJSON Geometry object
 *
 * @param id - unique id for geometry
 * @param geometry - GeoJSON Geometry object
 * @param shape - geometry shape
 * @param buffer - buffer size
 * @param bufferUnit - buffer size unit of measurement
 *
 * @returns GeometryJSON
 */
const makeGeometryJSONFromGeometry = (
  id: string,
  geometry: Geometry,
  shape: Shape,
  buffer: number = 0,
  bufferUnit: LengthUnit = DEFAULT_PROPERTIES.bufferUnit
): GeometryJSON =>
  makeGeometry(
    id,
    geometry,
    DEFAULT_PROPERTIES.color,
    shape,
    buffer,
    bufferUnit
  )

/**
 * Creates a Point GeometryJSON object
 *
 * @param id - unique id for geometry
 * @param lat - center lattitude
 * @param lon - center longitude
 *
 * @returns GeometryJSON
 */
const makePointGeo = (id: string, lat: number, lon: number): GeometryJSON =>
  makeGeometryJSONFromGeometry(
    id,
    {
      type: 'Point',
      coordinates: [lon, lat],
    } as GeoJSON.Point,
    'Point'
  )

/**
 * Creates a Point Radius GeometryJSON object
 *
 * @param id - unique id for geometry
 * @param lat - center lattitude
 * @param lon - center longitude
 * @param radius - radius length
 * @param radiusUnit - radius length unit of measurement
 *
 * @returns GeometryJSON
 */
const makePointRadiusGeo = (
  id: string,
  lat: number,
  lon: number,
  radius: number,
  radiusUnit: LengthUnit
): GeometryJSON =>
  makeGeometryJSONFromGeometry(
    id,
    {
      type: 'Point',
      coordinates: [lon, lat],
    } as GeoJSON.Point,
    'Point Radius',
    radius,
    radiusUnit
  )

/**
 * Creates a Polygon GeometryJSON object
 *
 * @param id - unique id for geometry
 * @param lonLatCoordinateList - array of coordinates in the format of [[longitude, lattitude], ...]
 * @param buffer - buffer size
 * @param bufferUnit - buffer size unit of measurement
 *
 * @returns GeometryJSON
 */
const makePolygonGeo = (
  id: string,
  lonLatCoordinateList: [number, number][],
  buffer: number,
  bufferUnit: LengthUnit
): GeometryJSON =>
  makeGeometryJSONFromGeometry(
    id,
    {
      type: 'Polygon',
      coordinates: [[...lonLatCoordinateList, lonLatCoordinateList[0]]],
    } as GeoJSON.Polygon,
    'Polygon',
    buffer,
    bufferUnit
  )

/**
 * Creates a Line GeometryJSON object
 *
 * @param id - unique id for geometry
 * @param lonLatCoordinateList - array of coordinates in the format of [[longitude, lattitude], ...]
 * @param buffer - buffer size
 * @param bufferUnit - buffer size unit of measurement
 *
 * @returns GeometryJSON
 */
const makeLineGeo = (
  id: string,
  lonLatCoordinateList: [number, number][],
  buffer: number,
  bufferUnit: LengthUnit
): GeometryJSON =>
  makeGeometryJSONFromGeometry(
    id,
    {
      type: 'LineString',
      coordinates: lonLatCoordinateList,
    } as GeoJSON.LineString,
    'Line',
    buffer,
    bufferUnit
  )

/**
 * Creates a Bounding Box GeometryJSON object
 *
 * @param id - unique id for geometry
 * @param extent - Extent of bounding box
 *
 * @returns GeometryJSON
 */
const makeBBoxGeo = (id: string, extent: Extent): GeometryJSON =>
  makeGeometryJSONFromGeometry(
    id,
    {
      ...turf.bboxPolygon(extent).geometry,
    } as GeoJSON.Polygon,
    'Bounding Box'
  )

export {
  makeBBoxGeo,
  makeLineGeo,
  makePointGeo,
  makePointRadiusGeo,
  makePolygonGeo,
}
