import * as ol from 'openlayers'
import { GeometryJSON, Extent, LengthUnit, Geometry } from '../geometry'
import { makeBufferedGeo } from '../geometry'
import * as _ from 'lodash'
import { adjustGeoCoordsForAntimeridian } from '../geometry/utilities'

type BufferedGeo = {
  buffered: GeometryJSON
  original: Geometry
  buffer?: number
  bufferUnit: LengthUnit
}

/**
 * Renders Renderable objects on an Open Layers Map
 */
class Renderer {
  private map: ol.Map
  private vectorLayer: ol.layer.Vector
  private geoFormat: ol.format.GeoJSON
  private maxZoom: number
  private bufferCache: { [id: string]: BufferedGeo }

  /**
   * Constructs renderer
   * @param map - Open Layers map to render to
   * @param style - style to apply to rendered geometries
   * @param maxZoom - maximum zoom to allow when panning on map
   */
  constructor(
    map: ol.Map,
    style: ol.style.Style | ol.StyleFunction | ol.style.Style[],
    maxZoom: number
  ) {
    this.map = map
    this.geoFormat = new ol.format.GeoJSON()
    this.maxZoom = maxZoom
    const vectorSource = new ol.source.Vector({
      features: [],
    })
    this.vectorLayer = new ol.layer.Vector({
      source: vectorSource,
      zIndex: 1,
    })
    this.vectorLayer.setStyle(style)
    this.map.addLayer(this.vectorLayer)
    this.bufferCache = {}
  }

  /**
   * Renders array of GeometryJSON objects
   * @param geometryList - array of geometry JSON
   */
  renderList(geometryList: GeometryJSON[]): void {
    const boundMakeGeometryFeature = this.makeGeometryFeature.bind(this)
    const features = geometryList.map(boundMakeGeometryFeature) as ol.Feature[]
    this.vectorLayer.getSource().addFeatures(features)
  }

  private getBufferedGeo(geometry: GeometryJSON): GeometryJSON {
    const cached = this.bufferCache[geometry.properties.id]
    if (
      cached &&
      _.isEqual(cached.original.coordinates, geometry.geometry.coordinates) &&
      cached.buffer === geometry.properties.buffer &&
      cached.bufferUnit === geometry.properties.bufferUnit
    ) {
      return cached.buffered
    } else {
      const bufferedGeo = makeBufferedGeo(geometry)
      this.bufferCache[geometry.properties.id] = {
        original: geometry.geometry,
        buffered: bufferedGeo,
        buffer: geometry.properties.buffer,
        bufferUnit: geometry.properties.bufferUnit,
      }
      return bufferedGeo
    }
  }

  private makeGeometryFeature(geometry: GeometryJSON): ol.Feature {
    const copy = _.cloneDeep(geometry)
    adjustGeoCoordsForAntimeridian(copy)
    const buffered = this.getBufferedGeo(copy)
    // Must adjust the coordinates again because buffering undoes the
    // adjustments we made above.
    adjustGeoCoordsForAntimeridian(buffered)
    const feature = this.geoFormat.readFeature(buffered)
    feature.setId(geometry.properties.id)
    return feature
  }

  /**
   * Renders a GeometryJSON object
   * @param geometry - GeometryJSON object
   */
  addGeo(geometry: GeometryJSON): void {
    const feature = this.makeGeometryFeature(geometry)
    // Note: In the future we may want to optimize performance
    // here by using feature ids to update only what has
    // changed and remove only what has been removed.
    this.vectorLayer.getSource().addFeature(feature)
  }

  /**
   * Removes all rendered geometry
   */
  clearGeos(): void {
    this.vectorLayer.getSource().clear()
  }

  /**
   * Pans to GeometryJSON
   * @param geometry - GeometryJSON
   */
  panToGeo(geometry: GeometryJSON) {
    this.panToExtent(this.getExtent(geometry))
  }

  /**
   * Pans to array of GeometryJSON
   * @param geometryList - array of geometry JSON
   */
  panToGeoList(geometryList: GeometryJSON[]) {
    if (geometryList.length > 0) {
      let minX = Number.MAX_SAFE_INTEGER
      let minY = Number.MAX_SAFE_INTEGER
      let maxX = Number.MIN_SAFE_INTEGER
      let maxY = Number.MIN_SAFE_INTEGER
      geometryList.forEach((geometry: GeometryJSON) => {
        const extent = this.getExtent(geometry)
        minX = Math.min(minX, extent[0])
        minY = Math.min(minY, extent[1])
        maxX = Math.max(maxX, extent[2])
        maxY = Math.max(maxY, extent[3])
      })
      this.panToExtent([minX, minY, maxX, maxY])
    }
  }

  /**
   * Pans to extent
   * @param extent - Extent
   */
  panToExtent(extent: Extent) {
    this.map.getView().fit(extent, {
      size: this.map.getSize(),
      duration: 500,
      maxZoom: this.maxZoom,
    })
  }

  getExtent(geometry: GeometryJSON): Extent {
    let extent
    if (geometry.bbox) {
      extent = _.clone(geometry.bbox)
    } else {
      const feature = this.geoFormat.readFeature(geometry)
      extent = _.clone(feature.getGeometry().getExtent())
    }
    const minX = extent[0]
    const maxX = extent[2]
    const width = Math.abs(maxX - minX)
    const crossesAntimeridian = width > 180
    if (crossesAntimeridian) {
      extent[0] = maxX
      extent[2] = minX + 360
    }
    return extent
  }

  /**
   * Resizes map after the map container has changed size
   */
  resizeMap() {
    this.map.updateSize()
  }
}

export default Renderer
