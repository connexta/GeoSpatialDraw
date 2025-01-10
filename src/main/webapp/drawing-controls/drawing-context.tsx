import { GeometryJSON, makeBufferedGeo } from '../geometry'
import { adjustGeoCoordsForAntimeridian } from '../geometry/utilities'
import Map from 'ol/Map'
import { Vector as VectorLayer } from 'ol/layer'
import { Interaction, Modify, Snap } from 'ol/interaction'
import Feature from 'ol/Feature'
import GeoJSON from 'ol/format/GeoJSON'
import { Style } from 'ol/style'
import { StyleFunction } from 'ol/style/Style'
import VectorSource from 'ol/source/Vector'
import { EventTypes } from 'ol/Observable'

type EventHandler = (e: any) => void

type ListenerTarget = 'draw' | 'snap' | 'modify' | 'map'

type ListenerRecord = {
  target: ListenerTarget
  event: string
  handler: EventHandler
}

/**
 * Open Layers drawing context provides a layer between the drawing controls
 * and the openlayers map, normalizing interactions with the openlayers map
 * accross all drawing controls.
 */
class DrawingContext {
  private map: Map
  private drawLayer: VectorLayer
  private bufferLayer: VectorLayer
  private modify: Modify
  private snap: Snap
  private draw: Interaction | null
  private listenerList: ListenerRecord[]
  private style: Style | StyleFunction | Style[]
  private geoFormat: GeoJSON
  private animationFrameId: number
  private updatedBuffer: number | undefined
  private updatedBufferUnit: string | undefined

  /**
   * Constructs an instance of the drawing context
   * @param map - reference to openlayers map
   * @param drawingStyle - drawingStyle to be used by all drawing controls
   */
  constructor({
    map,
    drawingStyle,
  }: {
    map: Map
    drawingStyle: Style | StyleFunction | Style[]
  }) {
    this.bufferUpdateEvent = this.bufferUpdateEvent.bind(this)
    this.animationFrameId = 0
    this.geoFormat = new GeoJSON()
    this.style = drawingStyle
    this.draw = null
    this.listenerList = []
    this.map = map
    this.drawLayer = new VectorLayer({
      source: new VectorSource(),
      updateWhileInteracting: true,
      updateWhileAnimating: true,
      style: drawingStyle,
      zIndex: 2,
    })
    this.bufferLayer = new VectorLayer({
      source: new VectorSource(),
      updateWhileInteracting: true,
      updateWhileAnimating: true,

      style: drawingStyle,
      zIndex: 1,
    })
    this.map.addLayer(this.bufferLayer)
    this.map.addLayer(this.drawLayer)
    const source = this.drawLayer.getSource()
    if (source) {
      this.modify = new Modify({
        source,
      })
      this.snap = new Snap({
        source,
      })
    }
  }

  updateBuffer(buffer: number, bufferUnit: string): void {
    this.updatedBuffer = buffer
    this.updatedBufferUnit = bufferUnit
    const featureList = this.drawLayer.getSource()?.getFeatures()
    if (featureList?.length) {
      const feature = featureList[0]
      this.updateBufferFeature(feature)
    }
  }

  getStyle(): Style | StyleFunction | Style[] {
    return this.style
  }

  removeFeature(): void {
    this.drawLayer.getSource()?.clear()
  }

  updateFeature(feature: Feature): void {
    this.removeFeature()
    const geo: GeometryJSON = JSON.parse(this.geoFormat.writeFeature(feature))
    adjustGeoCoordsForAntimeridian(geo)
    const adjustedFeature = this.geoFormat.readFeature(geo)
    this.drawLayer.getSource()?.addFeature(adjustedFeature)
  }

  updateBufferFeature(feature: Feature, animate: boolean = true): void {
    this.bufferLayer.getSource()?.clear()
    const buffer: number | undefined = this.updatedBuffer
      ? this.updatedBuffer
      : feature.get('buffer')
    const bufferUnit: string | undefined = this.updatedBufferUnit
      ? this.updatedBufferUnit
      : feature.get('bufferUnit')
    if (buffer !== undefined) {
      feature.set('buffer', buffer)
      feature.set('bufferUnit', bufferUnit)
      const geo: GeometryJSON = JSON.parse(this.geoFormat.writeFeature(feature))
      adjustGeoCoordsForAntimeridian(geo)
      const bufferedGeo = makeBufferedGeo(geo)
      // Must adjust the coordinates again because buffering undoes the
      // adjustments we made above.
      adjustGeoCoordsForAntimeridian(bufferedGeo)
      const bufferFeature = this.geoFormat.readFeature(bufferedGeo)
      this.bufferLayer.getSource()?.addFeature(bufferFeature)
      if (animate) {
        this.setEvent('map', 'pointerdrag', this.bufferUpdateEvent)
      }
    }
  }

  protected bufferUpdateEvent() {
    const featureList = this.drawLayer.getSource()?.getFeatures()
    if (featureList?.length) {
      const feature = featureList[0]
      this.animationFrameId = requestAnimationFrame(() => {
        this.updateBufferFeature(feature)
      })
    }
  }

  setModifyInteraction(modify: Modify): void {
    this.modify = modify
  }

  getSource(): VectorSource | undefined {
    return this.drawLayer.getSource() || undefined
  }

  setDrawInteraction(draw: Interaction): void {
    this.draw = draw
  }

  setEvent(target: ListenerTarget, event: string, handler: EventHandler): void {
    const listenerTarget = this[target]
    if (listenerTarget !== null) {
      listenerTarget.on(event as EventTypes, handler)
      this.listenerList.push({
        target,
        event,
        handler,
      })
    }
  }

  removeListener(
    target: ListenerTarget,
    event: string,
    handler: EventHandler
  ): void {
    if (target === 'map') {
      this.map.un(event as EventTypes, handler)
    } else {
      const listenerTarget = this[target]
      if (listenerTarget !== null) {
        listenerTarget.un(event as EventTypes, handler)
      }
    }
  }

  removeListeners(): void {
    for (const listener of this.listenerList) {
      this.removeListener(listener.target, listener.event, listener.handler)
    }
    this.listenerList = []
    cancelAnimationFrame(this.animationFrameId)
  }

  addInteractions(): void {
    if (this.draw !== null) {
      this.map.addInteraction(this.draw)
    }
    this.map.addInteraction(this.snap)
    this.map.addInteraction(this.modify)
  }

  addInteractionsWithoutModify(): void {
    if (this.draw !== null) {
      this.map.addInteraction(this.draw)
    }
    this.map.addInteraction(this.snap)
  }

  removeInteractions(): void {
    this.map.removeInteraction(this.modify)
    this.map.removeInteraction(this.snap)
    if (this.draw !== null) {
      this.map.removeInteraction(this.draw)
    }
    this.drawLayer.getSource()?.clear()
    this.bufferLayer.getSource()?.clear()
  }

  remakeInteractions(): void {
    const source = this.drawLayer.getSource()
    if (source) {
      this.modify = new Modify({
        source,
      })
      this.snap = new Snap({
        source,
      })
    }
  }

  setInteractionsActive(active: boolean): void {
    this.modify.setActive(active)
    this.snap.setActive(active)
    if (this.draw) {
      this.draw.setActive(active)
    }
  }

  areInteractionsActive(): boolean {
    return (
      (this.draw === null || this.draw.getActive()) &&
      this.modify.getActive() &&
      this.snap.getActive()
    )
  }

  circleRadiusToMeters(radius: number): number {
    const projection = this.map.getView().getProjection()
    if (projection) {
      const metersPerUnit = projection.getMetersPerUnit()
      if (metersPerUnit) {
        return radius * metersPerUnit
      }
    }
    return 0
  }
}

export default DrawingContext
