import * as ol from 'openlayers'
import * as turf from '@turf/turf'
import { expect } from 'chai'
import PointRadiusDrawingControl from './point-radius-drawing-control'
import MockDrawingContext from './test/mock-drawing-context'
describe('PointRadiusDrawingControl', () => {
  const makeCoordinates = () => [
    [50, 50],
    // @ts-ignore
    turf.rhumbDestination([50, 50], 70, 90, {
      units: 'meters',
    }).geometry.coordinates,
  ]
  const makeFeature = () =>
    new ol.Feature({
      // @ts-ignore
      geometry: new ol.geom.LineString(makeCoordinates()),
      color: '#996600',
      shape: 'Point Radius',
      buffer: 70,
      bufferUnit: 'meters',
      id: '',
    })
  const makeGeoJSON = () => ({
    type: 'Feature',
    properties: {
      color: '#996600',
      shape: 'Point Radius',
      buffer: 70,
      bufferUnit: 'meters',
      id: '',
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
    recievedGeo.properties.buffer = Math.round(recievedGeo.properties.buffer)
  }
  let control: PointRadiusDrawingControl = new PointRadiusDrawingControl(
    context as any,
    receiver
  )
  beforeEach(() => {
    recievedGeo = null
    context = new MockDrawingContext()
    control = new PointRadiusDrawingControl(context as any, receiver)
  })
  describe('constructor', () => {
    it('default', () => {
      expect(control).to.not.equal(undefined)
      expect(control).to.not.equal(null)
    })
  })
  describe('onCompleteDrawing', () => {
    it('default', () => {
      // @ts-ignore
      control.setGeo(makeGeoJSON())
      control.onCompleteDrawing({
        feature: makeFeature(),
      })
      const expected = makeGeoJSON()
      expect(recievedGeo).to.deep.equal(expected)
      expect(context.getMethodCalls().updateFeature.length).to.not.equal(0)
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
      // @ts-ignore
      control.setGeo(makeGeoJSON())
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
