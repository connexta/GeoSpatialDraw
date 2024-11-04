import * as ol from 'openlayers'
import { expect } from 'chai'
import MockMap from './test/mock-map'
import DrawingContext from './drawing-context'

const DRAW_LAYER_INDEX = 1
const BUFFER_LAYER_INDEX = 0

describe('DrawingContext', () => {
  let context: DrawingContext
  let map: MockMap = new MockMap()
  beforeEach(() => {
    map = new MockMap()
    context = new DrawingContext({
      // @ts-ignore
      map,
      drawingStyle: new ol.style.Style(),
    })
  })
  describe('constructor', () => {
    it('default', () => {
      // @ts-ignore
      expect(map.getTestData().layerCount).to.equal(2)
      // @ts-ignore
      expect(map.getTestData().interactionsCount).to.equal(0)
    })
  })
  describe('updateFeature', () => {
    it('default', () => {
      const geometry = new ol.geom.Polygon([
        [
          [50, 50],
          [10, 10],
          [20, 20],
          [50, 50],
        ],
      ])
      const feature = new ol.Feature(geometry)
      // @ts-ignore
      const source = map.getTestData().layers[DRAW_LAYER_INDEX].getSource()
      expect(source.getFeatures().length).to.equal(0)
      // @ts-ignore
      context.updateFeature(feature)
      expect(source.getFeatures().length).to.equal(1)
      // @ts-ignore
      context.updateFeature(feature)
      expect(source.getFeatures().length).to.equal(1)
    })
  })
  describe('updateBufferFeature', () => {
    it('no buffer', () => {
      const geometry = new ol.geom.Polygon([
        [
          [50, 50],
          [10, 10],
          [20, 20],
          [50, 50],
        ],
      ])
      const feature = new ol.Feature(geometry)
      // @ts-ignore
      const source = map.getTestData().layers[BUFFER_LAYER_INDEX].getSource()
      expect(source.getFeatures().length).to.equal(0)
      // @ts-ignore
      context.updateBufferFeature(feature)
      expect(source.getFeatures().length).to.equal(0)
      // @ts-ignore
      context.updateBufferFeature(feature)
      expect(source.getFeatures().length).to.equal(0)
      // @ts-ignore
      expect(map.getTestData().eventListeners['pointerdrag'].size).to.equal(0)
      context.removeListeners()
      // @ts-ignore
      expect(source.getFeatures().length).to.equal(0)
      // @ts-ignore
      expect(map.getTestData().eventListeners['pointerdrag'].size).to.equal(0)
    })
    it('has buffer', () => {
      const geometry = new ol.geom.Polygon([
        [
          [50, 50],
          [10, 10],
          [20, 20],
          [50, 50],
        ],
      ])
      const feature = new ol.Feature({
        geometry,
        buffer: 1,
        bufferUnit: 'meters',
      })
      // @ts-ignore
      const source = map.getTestData().layers[BUFFER_LAYER_INDEX].getSource()
      expect(source.getFeatures().length).to.equal(0)
      // @ts-ignore
      context.updateBufferFeature(feature)
      expect(source.getFeatures().length).to.equal(1)
      // @ts-ignore
      context.updateBufferFeature(feature)
      expect(source.getFeatures().length).to.equal(1)
      // @ts-ignore
      expect(map.getTestData().eventListeners['pointerdrag'].size).to.equal(1)
      context.removeListeners()
      // @ts-ignore
      context.removeInteractions()
      expect(source.getFeatures().length).to.equal(0)
      // @ts-ignore
      expect(map.getTestData().eventListeners['pointerdrag'].size).to.equal(0)
    })
  })
  describe('setEvent', () => {
    it('snap', () => {
      // @ts-ignore
      context.setEvent('snap', 'event', () => {})
      // @ts-ignore
      context.removeListeners()
    })
    it('modify', () => {
      // @ts-ignore
      context.setEvent('modify', 'event', () => {})
      // @ts-ignore
      context.removeListeners()
    })
    it('draw', () => {
      // @ts-ignore
      context.setDrawInteraction(new ol.interaction.Extent())
      // @ts-ignore
      context.setEvent('draw', 'event', () => {})
      // @ts-ignore
      context.removeListeners()
    })
  })
  describe('removeListeners', () => {
    it('default', () => {
      // @ts-ignore
      context.setDrawInteraction(new ol.interaction.Extent())
      // @ts-ignore
      context.setEvent('snap', 'event', () => {})
      // @ts-ignore
      context.setEvent('draw', 'event', () => {})
      // @ts-ignore
      context.setEvent('modify', 'event', () => {})
      // @ts-ignore
      context.removeListeners()
    })
  })
  describe('addInteractions', () => {
    it('without draw interaction', () => {
      // @ts-ignore
      context.addInteractions()
      expect(map.getTestData().interactionsCount).to.equal(2)
    })
    it('with draw interaction', () => {
      // @ts-ignore
      context.setDrawInteraction(new ol.interaction.Extent())
      // @ts-ignore
      context.addInteractions()
      expect(map.getTestData().interactionsCount).to.equal(3)
    })
  })
  describe('addInteractionsWithoutModify', () => {
    it('without draw interaction', () => {
      context.addInteractionsWithoutModify()
      expect(map.getTestData().interactionsCount).to.equal(1)
    })
    it('with draw interaction', () => {
      // @ts-ignore
      context.setDrawInteraction(new ol.interaction.Extent())
      context.addInteractionsWithoutModify()
      expect(map.getTestData().interactionsCount).to.equal(2)
    })
  })
  describe('removeInteractions', () => {
    it('default', () => {
      const geometry = new ol.geom.Polygon([
        [
          [50, 50],
          [10, 10],
          [20, 20],
          [50, 50],
        ],
      ])
      const feature = new ol.Feature(geometry)
      context.updateFeature(feature)
      context.addInteractions()
      context.removeInteractions()
      expect(map.getTestData().interactionsCount).to.equal(0)
    })
  })
})
