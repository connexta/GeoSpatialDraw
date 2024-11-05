import * as ol from 'openlayers'
import * as turf from '@turf/turf'
import DrawingContext from './drawing-context'
import UpdatedGeoReceiver from './geo-receiver'
import BasicDrawingControl from './basic-drawing-control'
import { Shape } from '../shape-utils'
import { GeometryJSON, METERS, KILOMETERS } from '../geometry'
import {
  getDistanceInMeters,
  getDistanceFromMeters,
} from '../internal/distance'

type DrawingFeatures = {
  feature: ol.Feature
  bufferFeature: ol.Feature
}

/**
 * Drawing Control for a circle/point radius
 */
class PointRadiusDrawingControl extends BasicDrawingControl {
  private animationFrameId: number
  private animationFrame: () => void
  private initalCenter: [number, number]

  /**
   * Creates drawing control
   * @param context - Drawing context
   * @param receiver - callback for returning updates to GeometryJSON
   */
  constructor(context: DrawingContext, receiver: UpdatedGeoReceiver) {
    super(context, receiver)
    this.animationFrameId = 0
    this.animationFrame = () => {}
    this.onCompleteDrawing = this.onCompleteDrawing.bind(this)
    this.onStartDrawing = this.onStartDrawing.bind(this)
    this.onStartModify = this.onStartModify.bind(this)
    this.onCompleteModify = this.onCompleteModify.bind(this)
    this.initalCenter = [0, 0]
  }

  private startDrawAnimation(feature: ol.Feature) {
    let revision = feature.getRevision()
    this.animationFrame = () => {
      const update = feature.getRevision()
      if (update !== revision) {
        revision = update
        const pointFeature = new ol.Feature(
          this.updatePointFromRadiusLine(this.toLine(feature))
        )
        this.applyPropertiesToFeature(pointFeature)
        this.context.updateBufferFeature(pointFeature, false)
      }
      this.animationFrameId = requestAnimationFrame(this.animationFrame)
    }
    this.animationFrame()
  }

  private stopDrawAnimation(feature: ol.Feature): GeometryJSON {
    cancelAnimationFrame(this.animationFrameId)
    this.animationFrame = () => {}
    const point = this.updatePointFromRadiusLine(this.toLine(feature))
    const pointFeature = new ol.Feature(point)
    const bufferUnit = this.properties.bufferUnit || METERS
    const radius = getDistanceInMeters(this.properties.buffer || 0, bufferUnit)
    let bestFitRadiusUnit = bufferUnit
    if (bestFitRadiusUnit === METERS && radius > 1000) {
      bestFitRadiusUnit = KILOMETERS
    }
    this.setProperties({
      ...this.properties,
      buffer: getDistanceFromMeters(radius, bestFitRadiusUnit),
      bufferUnit: bestFitRadiusUnit,
    })
    const geoJSON: GeometryJSON = this.writeExtendedGeoJSON(
      pointFeature
    ) as GeometryJSON
    return geoJSON
  }

  private reorientRadiusLineFeature(center: [number, number]) {
    this.initalCenter = center
    const line = this.makeRadiusLineFromPoint(center)
    const feature = new ol.Feature(line)
    this.applyPropertiesToFeature(feature)
    this.context.updateFeature(feature)
  }

  onCompleteDrawing(e: any) {
    this.mouseDragActive = false
    const feature = this.getFeatureFromDrawEvent(e)
    const geoJSON = this.stopDrawAnimation(feature)
    this.applyPropertiesToFeature(feature)
    this.receiver(geoJSON)
  }

  onStartDrawing(e: any) {
    this.mouseDragActive = true
    const feature = this.getFeatureFromDrawEvent(e)
    const source = this.context.getSource()
    source.getFeatures().forEach((f) => source.removeFeature(f))
    this.initalCenter = this.toLine(feature).getCoordinates()[0]
    this.startDrawAnimation(feature)
  }

  onStartModify(e: any) {
    this.mouseDragActive = true
    const feature = this.getFeatureModifyEvent(e)
    const line = this.toLine(feature)
    const clickedPoint = line.getClosestPoint(e.mapBrowserEvent.coordinate)
    const distanceMap = line
      .getCoordinates()
      .map((point) => turf.distance(point, clickedPoint))
    feature.set('hidden', distanceMap[0] < distanceMap[1])
    this.startDrawAnimation(feature)
  }

  onCompleteModify(e: any) {
    this.mouseDragActive = false
    const feature = this.getFeatureModifyEvent(e)
    feature.set('hidden', false)
    const geoJSON = this.stopDrawAnimation(feature)
    const center = this.toLine(feature).getCoordinates()[0]
    if (!this.pointsEqual(center, this.initalCenter)) {
      this.reorientRadiusLineFeature(center)
    }
    this.receiver(geoJSON)
  }

  makeFeatures(geoJSON: GeometryJSON): DrawingFeatures {
    const bufferFeature = this.geoFormat.readFeature(geoJSON)
    const line = this.makeRadiusLineFromPoint(
      this.toPoint(bufferFeature).getCoordinates()
    )
    const feature = new ol.Feature(line)
    return {
      feature,
      bufferFeature,
    }
  }

  private makeRadiusLineFromPoint(
    point: [number, number],
    bearing: number = 90
  ): ol.geom.LineString {
    const bufferUnit = this.properties.bufferUnit || METERS
    const meters = getDistanceInMeters(this.properties.buffer || 0, bufferUnit)
    const destination = turf.rhumbDestination(point, meters, bearing, {
      units: 'meters',
    })
    const end = (destination.geometry as GeoJSON.Point).coordinates as [
      number,
      number
    ]
    return new ol.geom.LineString([point, end])
  }

  private pointsEqual(a: [number, number], b: [number, number]) {
    return a[0] === b[0] && a[1] === b[1]
  }

  private toLine(feature: ol.Feature): ol.geom.LineString {
    return feature.getGeometry() as ol.geom.LineString
  }

  private toPoint(feature: ol.Feature): ol.geom.Point {
    return feature.getGeometry() as ol.geom.Point
  }

  private updatePointFromRadiusLine(line: ol.geom.LineString): ol.geom.Point {
    const center = line.getCoordinates()[0]
    if (this.pointsEqual(center, this.initalCenter)) {
      const distance = turf.rhumbDistance(
        line.getCoordinates()[0],
        line.getCoordinates()[1],
        {
          units: 'meters',
        }
      )
      const buffer = getDistanceFromMeters(distance, this.properties.bufferUnit)
      this.setProperties({
        ...this.properties,
        buffer,
      })
    }
    return new ol.geom.Point(line.getCoordinates()[0])
  }

  private getFeatureFromDrawEvent(e: any): ol.Feature {
    return e.feature
  }

  private getFeatureModifyEvent(e: any): ol.Feature {
    return e.features.getArray()[0]
  }

  setGeo(geoJSON: GeometryJSON): void {
    this.cancelDrawing()
    this.setProperties((geoJSON as GeometryJSON).properties || {})
    const { feature, bufferFeature } = this.makeFeatures(geoJSON)
    this.initalCenter = this.toPoint(bufferFeature).getCoordinates()
    this.applyPropertiesToFeature(feature)
    this.applyPropertiesToFeature(bufferFeature)
    this.context.updateFeature(feature)
    this.context.updateBufferFeature(bufferFeature, false)
    this.startDrawingInteraction()
  }

  getStaticStyle(): ol.style.Style | ol.style.Style[] {
    const circleFeature = new ol.Feature(new ol.geom.Circle([0, 0], 1))
    this.applyPropertiesToFeature(circleFeature)
    const style = this.context.getStyle()
    if (typeof style === 'function') {
      return style(circleFeature, 1)
    } else {
      return style
    }
  }

  startDrawing(): void {
    this.context.removeFeature()
    this.startDrawingInteraction()
  }

  private startDrawingInteraction(): void {
    const drawInteraction = new ol.interaction.Draw({
      type: this.getGeoType(),
      style: this.getStaticStyle(),
      maxPoints: 2,
      source: this.context.getSource(),
      condition: ol.events.condition.always,
      freehandCondition: ol.events.condition.never,
    })
    this.drawingActive = true
    this.context.setModifyInteraction(
      new ol.interaction.Modify({
        insertVertexCondition: () => false,
        deleteCondition: () => false,
        source: this.context.getSource(),
      })
    )
    this.context.setDrawInteraction(drawInteraction)
    this.context.setEvent('draw', 'drawend', this.onCompleteDrawing)
    this.context.setEvent('draw', 'drawstart', this.onStartDrawing)
    this.context.setEvent('modify', 'modifyend', this.onCompleteModify)
    this.context.setEvent('modify', 'modifystart', this.onStartModify)
    this.context.addInteractions()
  }

  getShape(): Shape {
    return 'Point Radius'
  }

  getGeoType(): ol.geom.GeometryType {
    return 'LineString'
  }

  cancelDrawing() {
    // uses custom modify interaction
    this.context.remakeInteractions()
    super.cancelDrawing()
  }
}

export default PointRadiusDrawingControl
