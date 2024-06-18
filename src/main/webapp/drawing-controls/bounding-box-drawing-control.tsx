import * as ol from 'openlayers'
import * as turf from '@turf/turf'
import DrawingContext from './drawing-context'
import UpdatedGeoReceiver from './geo-receiver'
import BasicDrawingControl from './basic-drawing-control'
import { Shape } from '../shape-utils'
import { GeometryJSON, Extent } from '../geometry'

type ExtentEvent = {
  extent: Extent
}

/**
 * Drawing Control for drawing a bounding box
 */
class BoundingBoxDrawingControl extends BasicDrawingControl {
  /**
   * Creates drawing control
   * @param context - Drawing context
   * @param receiver - callback for returning updates to GeometryJSON
   */
  constructor(context: DrawingContext, receiver: UpdatedGeoReceiver) {
    super(context, receiver)
    this.extentChanged = this.extentChanged.bind(this)
  }

  getGeoType(): ol.geom.GeometryType {
    return 'Polygon'
  }

  getShape(): Shape {
    return 'Bounding Box'
  }

  getDefaultStaticStyle(): ol.style.Style | ol.style.Style[] {
    const feature = new ol.Feature(
      new ol.geom.Polygon([
        [
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
        ],
      ])
    )
    this.applyPropertiesToFeature(feature)
    const style = this.context.getStyle()
    if (typeof style === 'function') {
      return style(feature, 1)
    } else {
      return style
    }
  }

  setGeo(geoJSON: GeometryJSON): void {
    this.cancelDrawing()
    this.setProperties((geoJSON as GeometryJSON).properties || {})
    const feature = this.geoFormat.readFeature(geoJSON)
    const extent = feature.getGeometry().getExtent()
    this.applyPropertiesToFeature(feature)
    this.context.updateFeature(feature)
    this.context.updateBufferFeature(feature)
    const style = this.getDefaultStaticStyle()
    // @ts-ignore ol.interaction.Extent is not in typescript for this version of Open Layers
    const drawInteraction = new ol.interaction.Extent({
      extent,
      pointerStyle: style,
      boxStyle: style,
    })
    this.startDrawingInteraction(drawInteraction)
  }

  startDrawing(): void {
    this.context.removeFeature()
    const style = this.getDefaultStaticStyle()
    // @ts-ignore ol.interaction.Extent is not in typescript for this version of Open Layers
    const drawInteraction = new ol.interaction.Extent({
      pointerStyle: style,
      boxStyle: style,
    })
    this.startDrawingInteraction(drawInteraction)
  }

  private startDrawingInteraction(
    drawInteraction: ol.interaction.Interaction
  ): void {
    this.drawingActive = true
    this.context.setDrawInteraction(drawInteraction)
    this.context.setEvent('draw', 'extentchanged', this.extentChanged)
    this.context.addInteractionsWithoutModify()
  }

  extentChanged(e: ExtentEvent): void {
    if (e.extent !== null) {
      const geoJSON = this.extentToGeoJSON(e.extent)
      this.receiver(geoJSON)
      const feature = this.geoFormat.readFeature(geoJSON)
      this.applyPropertiesToFeature(feature)
      this.context.updateFeature(feature)
      this.context.updateBufferFeature(feature)
    }
  }

  extentToGeoJSON(bbox: Extent): GeometryJSON {
    const bboxPolygon = turf.bboxPolygon(bbox)
    return {
      bbox,
      type: 'Feature',
      properties: {
        ...this.properties,
        shape: this.getShape(),
      },
      geometry: bboxPolygon.geometry as turf.Polygon,
    }
  }
}

export default BoundingBoxDrawingControl
