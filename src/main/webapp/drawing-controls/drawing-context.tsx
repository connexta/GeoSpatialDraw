import * as ol from 'openlayers'
import { GeometryJSON, makeBufferedGeo } from '../geometry'
import { adjustGeoCoordsForAntimeridian } from '../geometry/utilities'

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
  private map: ol.Map
  private drawLayer: ol.layer.Vector
  private bufferLayer: ol.layer.Vector
  private modify: ol.interaction.Modify
  private snap: ol.interaction.Snap
  private draw: ol.interaction.Interaction | null
  private listenerList: ListenerRecord[]
  private style: ol.style.Style | ol.StyleFunction | ol.style.Style[]
  private geoFormat: ol.format.GeoJSON
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
    map: ol.Map
    drawingStyle: ol.style.Style | ol.StyleFunction | ol.style.Style[]
  }) {
    this.bufferUpdateEvent = this.bufferUpdateEvent.bind(this)
    this.animationFrameId = 0
    this.geoFormat = new ol.format.GeoJSON()
    this.style = drawingStyle
    this.draw = null
    this.listenerList = []
    this.map = map
    this.drawLayer = new ol.layer.Vector({
      source: new ol.source.Vector(),
      style: drawingStyle,
      zIndex: 2,
      updateWhileInteracting: true,
    })
    this.bufferLayer = new ol.layer.Vector({
      source: new ol.source.Vector(),
      style: drawingStyle,
      zIndex: 1,
    })
    this.map.addLayer(this.bufferLayer)
    this.map.addLayer(this.drawLayer)
    this.modify = new ol.interaction.Modify({
      source: this.drawLayer.getSource(),
    })
    this.snap = new ol.interaction.Snap({
      source: this.drawLayer.getSource(),
    })
  }

  updateBuffer(buffer: number, bufferUnit: string): void {
    this.updatedBuffer = buffer
    this.updatedBufferUnit = bufferUnit
    const featureList = this.drawLayer.getSource().getFeatures()
    if (featureList.length) {
      const feature = featureList[0]
        this.updateBufferFeature(feature)
    }
  }

  getStyle(): ol.style.Style | ol.StyleFunction | ol.style.Style[] {
    return this.style
  }

  removeFeature(): void {
    this.drawLayer.getSource().clear()
  }

  updateFeature(feature: ol.Feature): void {
    this.removeFeature()
    const geo: GeometryJSON = JSON.parse(this.geoFormat.writeFeature(feature))
    adjustGeoCoordsForAntimeridian(geo)
    const adjustedFeature = this.geoFormat.readFeature(geo)
    this.drawLayer.getSource().addFeature(adjustedFeature)
  }

  updateBufferFeature(feature: ol.Feature, animate: boolean = true): void {
    this.bufferLayer.getSource().clear()
    const buffer: number | undefined = this.updatedBuffer ? this.updatedBuffer : feature.get('buffer')
    const bufferUnit: string | undefined = this.updatedBufferUnit ? this.updatedBufferUnit : feature.get('bufferUnit')
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
      this.bufferLayer.getSource().addFeature(bufferFeature)
      if (animate) {
        this.setEvent('map', 'pointerdrag', this.bufferUpdateEvent)
      }
    }
  }

  protected bufferUpdateEvent() {
    const featureList = this.drawLayer.getSource().getFeatures()
    if (featureList.length) {
      const feature = featureList[0]
      this.animationFrameId = requestAnimationFrame(() => {
        this.updateBufferFeature(feature)
      })
    }
  }

  setModifyInteraction(modify: ol.interaction.Modify): void {
    this.modify = modify
  }

  getSource(): ol.source.Vector {
    return this.drawLayer.getSource()
  }

  setDrawInteraction(draw: ol.interaction.Interaction): void {
    this.draw = draw
  }

  setEvent(target: ListenerTarget, event: string, handler: EventHandler): void {
    const listenerTarget = this[target]
    if (listenerTarget !== null) {
      listenerTarget.on(event, handler)
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
      this.map.un(event, handler)
    } else {
      const listenerTarget = this[target]
      if (listenerTarget !== null) {
        listenerTarget.un(event, handler)
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
    this.drawLayer.getSource().clear()
    this.bufferLayer.getSource().clear()
  }

  remakeInteractions(): void {
    this.modify = new ol.interaction.Modify({
      source: this.drawLayer.getSource(),
    })
    this.snap = new ol.interaction.Snap({
      source: this.drawLayer.getSource(),
    })
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
    return (
      radius *
      this.map
        .getView()
        .getProjection()
        .getMetersPerUnit()
    )
  }
}

export default DrawingContext
