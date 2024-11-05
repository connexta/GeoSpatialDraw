import * as ol from 'openlayers'
import { bboxPolygon } from '@turf/turf'
import { GeometryJSON } from '../geometry'
import Shape from './shape'

/**
 * Detects shapes of GeometryJSON objects by evaluating their geometric contents
 */
class ShapeDetector {
  private geoFormat: ol.format.GeoJSON

  /**
   * Constructs an instance of the ShapeDetector
   */
  constructor() {
    this.geoFormat = new ol.format.GeoJSON()
  }

  /**
   * Gets the shape of GeometryJSON object
   * @param geoJSON - GeometryJSON object
   * @returns Shape of geometry
   */
  shapeFromGeoJSON(geoJSON: GeometryJSON): Shape {
    const feature = this.geoFormat.readFeature(geoJSON)
    return this.shapeFromFeature(feature)
  }

  /**
   * Gets the shape of an Open Layers feature
   * @param feature - Open Layers feature
   * @returns Shape of geometry
   */
  shapeFromFeature(feature: ol.Feature): Shape {
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
  isLineFeature(feature: ol.Feature): boolean {
    return feature.getGeometry().getType() === 'LineString'
  }

  /**
   * Checks if feature matches shape
   * @param feature - Open Layers feature
   * @returns true if geometry is a point
   */
  isPointFeature(feature: ol.Feature): boolean {
    return (
      feature.getGeometry().getType() === 'Point' &&
      (feature.get('buffer') === undefined || feature.get('buffer') <= 0)
    )
  }

  /**
   * Checks if feature matches shape
   * @param feature - Open Layers feature
   * @returns true if geometry is a bounding box
   */
  isBoundingBoxFeature(feature: ol.Feature): boolean {
    if (!this.isPolygonFeature(feature)) {
      return false
    } else {
      const coordinates = (
        feature.getGeometry() as ol.geom.Polygon
      ).getCoordinates()[0]
      const extent = feature.getGeometry().getExtent()
      const expectedCoordinates = bboxPolygon(extent).geometry
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
  isPointRadiusFeature(feature: ol.Feature): boolean {
    return (
      feature.getGeometry().getType() === 'Point' && feature.get('buffer') > 0
    )
  }

  /**
   * Checks if feature matches shape
   * @param feature - Open Layers feature
   * @returns true if geometry is a polygon
   */
  isPolygonFeature(feature: ol.Feature): boolean {
    return feature.getGeometry().getType() === 'Polygon'
  }
}

export default ShapeDetector
