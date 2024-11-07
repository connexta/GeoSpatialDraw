import { bboxPolygon } from '@turf/turf'
import { GeometryJSON } from '../geometry'
import Shape from './shape'
import GeoJSON from 'ol/format/GeoJSON'
import Feature from 'ol/Feature'
import { Polygon } from 'ol/geom'

/**
 * Detects shapes of GeometryJSON objects by evaluating their geometric contents
 */
class ShapeDetector {
  private geoFormat: GeoJSON

  /**
   * Constructs an instance of the ShapeDetector
   */
  constructor() {
    this.geoFormat = new GeoJSON()
  }

  /**
   * Gets the shape of GeometryJSON object
   * @param geoJSON - GeometryJSON object
   * @returns Shape of geometry
   */
  shapeFromGeoJSON(geoJSON: GeometryJSON): Shape {
    const feature = this.geoFormat.readFeature(geoJSON)
    return this.shapeFromFeature(feature as Feature)
  }

  /**
   * Gets the shape of an Open Layers feature
   * @param feature - Open Layers feature
   * @returns Shape of geometry
   */
  shapeFromFeature(feature: Feature): Shape {
    if (this.isLineFeature(feature)) {
      return 'Line'
    } else if (this.isBoundingBoxFeature(feature)) {
      return 'Bounding Box'
    } else if (this.isPointFeature(feature)) {
      return 'Point'
    } else if (this.isPointRadiusFeature(feature)) {
      return 'Point Radius'
    } else {
      return 'Polygon'
    }
  }

  /**
   * Checks if feature matches shape
   * @param feature - Open Layers feature
   * @returns true if geometry is a line
   */
  isLineFeature(feature: Feature): boolean {
    return feature.getGeometry()?.getType() === 'LineString'
  }

  /**
   * Checks if feature matches shape
   * @param feature - Open Layers feature
   * @returns true if geometry is a point
   */
  isPointFeature(feature: Feature): boolean {
    return (
      feature.getGeometry()?.getType() === 'Point' &&
      (feature.get('buffer') === undefined || feature.get('buffer') <= 0)
    )
  }

  /**
   * Checks if feature matches shape
   * @param feature - Open Layers feature
   * @returns true if geometry is a bounding box
   */
  isBoundingBoxFeature(feature: Feature): boolean {
    if (!this.isPolygonFeature(feature)) {
      return false
    } else {
      const coordinates = (feature.getGeometry() as Polygon).getCoordinates()[0]
      const extent = feature.getGeometry()?.getExtent()
      if (!extent) {
        return false
      }
      const expectedCoordinates = bboxPolygon(extent as GeoJSON.BBox).geometry
        .coordinates[0] as [number, number][]
      return (
        coordinates.length === 5 &&
        expectedCoordinates.every((expectedPoint) =>
          coordinates.some(
            (point) =>
              point[0] === expectedPoint[0] && point[1] === expectedPoint[1]
          )
        )
      )
    }
  }

  /**
   * Checks if feature matches shape
   * @param feature - Open Layers feature
   * @returns true if geometry is a point radius
   */
  isPointRadiusFeature(feature: Feature): boolean {
    return (
      feature.getGeometry()?.getType() === 'Point' &&
      feature.get('buffer') &&
      feature.get('buffer') > 0
    )
  }

  /**
   * Checks if feature matches shape
   * @param feature - Open Layers feature
   * @returns true if geometry is a polygon
   */
  isPolygonFeature(feature: Feature): boolean {
    return feature.getGeometry()?.getType() === 'Polygon'
  }
}

export default ShapeDetector
