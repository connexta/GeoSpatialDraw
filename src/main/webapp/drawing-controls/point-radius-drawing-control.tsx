import Feature from 'ol/Feature'
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
import LineString from 'ol/geom/LineString'
import Point from 'ol/geom/Point'
import {
  always as alwaysCondition,
  never as neverCondition,
} from 'ol/events/condition'
import Draw from 'ol/interaction/Draw'
import Modify from 'ol/interaction/Modify'
import { Coordinate } from 'ol/coordinate'
import { Circle } from 'ol/geom'
import { Style } from 'ol/style'
import { Type } from 'ol/geom/Geometry'

type DrawingFeatures = {
  feature: Feature
  bufferFeature: Feature
}

/**
 * Drawing Control for a circle/point radius
 */
class PointRadiusDrawingControl extends BasicDrawingControl {
  private animationFrameId: number
  private animationFrame: () => void
  private initalCenter: Coordinate

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

  private startDrawAnimation(feature: Feature) {
    let revision = feature.getRevision()
    this.animationFrame = () => {
      const update = feature.getRevision()
      if (update !== revision) {
        revision = update
        const pointFeature = new Feature(
          this.updatePointFromRadiusLine(this.toLine(feature))
        )
        this.applyPropertiesToFeature(pointFeature)
        this.context.updateBufferFeature(pointFeature, false)
      }
      this.animationFrameId = requestAnimationFrame(this.animationFrame)
    }
    this.animationFrame()
  }

  private stopDrawAnimation(feature: Feature): GeometryJSON {
    cancelAnimationFrame(this.animationFrameId)
    this.animationFrame = () => {}
    const point = this.updatePointFromRadiusLine(this.toLine(feature))
    const pointFeature = new Feature(point)
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

  private reorientRadiusLineFeature(center: Coordinate) {
    this.initalCenter = center
    const line = this.makeRadiusLineFromPoint(center)
    const feature = new Feature(line)
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
    if (source) {
      source.getFeatures().forEach((f) => source.removeFeature(f))
    }
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
      this.toPoint(bufferFeature as Feature).getCoordinates()
    )
    const feature = new Feature(line)
    return {
      feature,
      bufferFeature: bufferFeature as Feature,
    }
  }

  private makeRadiusLineFromPoint(
    point: Coordinate,
    bearing: number = 90
  ): LineString {
    const bufferUnit = this.properties.bufferUnit || METERS
    const meters = getDistanceInMeters(this.properties.buffer || 0, bufferUnit)
    const destination = turf.rhumbDestination(point, meters, bearing, {
      units: 'meters',
    })
    const end = (destination.geometry as GeoJSON.Point).coordinates as [
      number,
      number
    ]
    return new LineString([point, end])
  }

  private pointsEqual(a: Coordinate, b: Coordinate) {
    return a[0] === b[0] && a[1] === b[1]
  }

  private toLine(feature: Feature): LineString {
    return feature.getGeometry() as LineString
  }

  private toPoint(feature: Feature): Point {
    return feature.getGeometry() as Point
  }

  private updatePointFromRadiusLine(line: LineString): Point {
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
    return new Point(line.getCoordinates()[0])
  }

  private getFeatureFromDrawEvent(e: any): Feature {
    return e.feature
  }

  private getFeatureModifyEvent(e: any): Feature {
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

  getStaticStyle(): Style | Style[] {
    const circleFeature = new Feature(new Circle([0, 0], 1))
    this.applyPropertiesToFeature(circleFeature)
    const style = this.context.getStyle()
    if (typeof style === 'function') {
      return style(circleFeature, 1) as Style
    } else {
      return style
    }
  }

  startDrawing(): void {
    this.context.removeFeature()
    this.startDrawingInteraction()
  }

  private startDrawingInteraction(): void {
    const drawInteraction = new Draw({
      type: this.getGeoType() as Type,
      style: this.getStaticStyle(),
      maxPoints: 2,
      source: this.context.getSource(),
      condition: alwaysCondition,
      freehandCondition: neverCondition,
    })
    this.drawingActive = true
    this.context.setModifyInteraction(
      new Modify({
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

  getGeoType(): Type {
    return 'LineString'
  }

  cancelDrawing() {
    // uses custom modify interaction
    this.context.remakeInteractions()
    super.cancelDrawing()
  }
}

export default PointRadiusDrawingControl
