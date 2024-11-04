import * as ol from 'openlayers'
import { expect } from 'chai'
import MockDrawingContext from './test/mock-drawing-context'
import PointDrawingControl from './point-drawing-control'

describe('PointDrawingControl', () => {
  const makeFeature = () =>
    new ol.Feature({
      geometry: new ol.geom.Point([50, 50]),
      color: '#996600',
      shape: 'Point',
      id: '',
      buffer: 0,
      bufferUnit: 'meters',
    })
  const makeGeoJSON = () => ({
    type: 'Feature',
    properties: {
      color: '#996600',
      shape: 'Point',
      id: '',
      buffer: 0,
      bufferUnit: 'meters',
    },
    geometry: {
      type: 'Point',
      coordinates: [50, 50],
    },
    bbox: [50, 50, 50, 50],
  })
  let context: MockDrawingContext = new MockDrawingContext()
  let recievedGeo: any = null
  const receiver = (geoJSON: any) => {
    recievedGeo = geoJSON
  }
  let control: PointDrawingControl = new PointDrawingControl(
    context as any,
    receiver
  )
  beforeEach(() => {
    recievedGeo = null
    context = new MockDrawingContext()
    control = new PointDrawingControl(context as any, receiver)
  })
  describe('constructor', () => {
    it('default', () => {
      expect(control).to.not.equal(undefined)
      expect(control).to.not.equal(null)
    })
  })
  describe('onCompleteDrawing', () => {
    it('default', () => {
      control.onCompleteDrawing({
        feature: makeFeature(),
      })
      const expected = makeGeoJSON()
      expect(recievedGeo).to.deep.equal(expected)
      expect(context.getMethodCalls().updateFeature.length).to.equal(1)
    })
    it('startDrawing -> onCompleteDrawing', () => {
      control.startDrawing()
      // @ts-ignore
      control.setGeo(makeGeoJSON())
      control.onCompleteDrawing({
        feature: makeFeature(),
      })
      const expected = makeGeoJSON()
      expect(recievedGeo).to.deep.equal(expected)
    })
  })
  describe('onCompleteModify', () => {
    it('default', () => {
      control.onCompleteModify({
        features: {
          getArray: () => [makeFeature()],
        },
      })
      const expected = makeGeoJSON()
      expect(recievedGeo).to.deep.equal(expected)
    })
  })
  describe('setGeo', () => {
    it('default', () => {
      // @ts-ignore
      control.setGeo(makeGeoJSON())
      expect(context.getMethodCalls().updateFeature.length).to.equal(1)
      expect(context.getMethodCalls().removeFeature.length).to.equal(0)
      expect(control.isDrawing()).to.equal(true)
    })
  })
  describe('startDrawing', () => {
    it('default', () => {
      control.startDrawing()
      expect(context.getMethodCalls().addInteractions.length).to.equal(1)
      expect(context.getMethodCalls().setEvent.length).to.equal(4)
      expect(context.getMethodCalls().setDrawInteraction.length).to.equal(1)
      expect(context.getMethodCalls().updateFeature.length).to.equal(0)
      expect(context.getMethodCalls().removeFeature.length).to.equal(1)
      expect(control.isDrawing()).to.equal(true)
    })
  })
  describe('cancelDrawing', () => {
    it('default', () => {
      control.cancelDrawing()
      expect(context.getMethodCalls().removeListeners.length).to.equal(1)
      expect(context.getMethodCalls().removeInteractions.length).to.equal(1)
      expect(control.isDrawing()).to.equal(false)
    })
  })
})
