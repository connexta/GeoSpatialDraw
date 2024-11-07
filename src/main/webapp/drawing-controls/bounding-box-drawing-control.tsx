import * as turf from '@turf/turf'
import DrawingContext from './drawing-context'
import UpdatedGeoReceiver from './geo-receiver'
import BasicDrawingControl from './basic-drawing-control'
import { Shape } from '../shape-utils'
import { GeometryJSON, Extent as GeometryExtent } from '../geometry'
import Style from 'ol/style/Style'
import { Feature } from 'ol'
import Polygon from 'ol/geom/Polygon'
import { Extent, Interaction } from 'ol/interaction'
import { Type } from 'ol/geom/Geometry'

type ExtentEvent = {
  extent: GeometryExtent
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

  getGeoType(): Type {
    return 'Polygon'
  }

  getShape(): Shape {
    return 'Bounding Box'
  }

  getDefaultStaticStyle(): Style | Style[] {
    const feature = new Feature(
      new Polygon([
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
      return style(feature, 1) as Style
    } else {
      return style
    }
  }

  setGeo(geoJSON: GeometryJSON): void {
    this.cancelDrawing()
    this.setProperties((geoJSON as GeometryJSON).properties || {})
    const feature = this.geoFormat.readFeature(geoJSON) as Feature<Polygon>
    const extent = feature.getGeometry()?.getExtent()
    this.applyPropertiesToFeature(feature)
    this.context.updateFeature(feature)
    this.context.updateBufferFeature(feature)
    const style = this.getDefaultStaticStyle()
    const drawInteraction = new Extent({
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
    const drawInteraction = new Extent({
      pointerStyle: style,
      boxStyle: style,
    })
    this.startDrawingInteraction(drawInteraction)
  }

  private startDrawingInteraction(drawInteraction: Interaction): void {
    this.drawingActive = true
    this.context.setDrawInteraction(drawInteraction)
    this.context.setEvent('draw', 'extentchanged', this.extentChanged)
    this.context.addInteractionsWithoutModify()
  }

  extentChanged(e: ExtentEvent): void {
    if (e.extent !== null) {
      const geoJSON = this.extentToGeoJSON(e.extent)
      this.receiver(geoJSON)
      const feature = this.geoFormat.readFeature(geoJSON) as Feature<Polygon>
      this.applyPropertiesToFeature(feature)
      this.context.updateFeature(feature)
      this.context.updateBufferFeature(feature)
    }
  }

  extentToGeoJSON(bbox: GeometryExtent): GeometryJSON {
    const bboxPolygon = turf.bboxPolygon(bbox)
    return {
      bbox,
      type: 'Feature',
      properties: {
        ...this.properties,
        shape: this.getShape(),
      },
      geometry: bboxPolygon.geometry as GeoJSON.Polygon,
    }
  }
}

export default BoundingBoxDrawingControl
