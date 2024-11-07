import { Feature } from 'ol'
import { LineString } from 'ol/geom'
import { expect } from 'chai'
import MockDrawingContext from './test/mock-drawing-context'
import LineDrawingControl from './line-drawing-control'

describe('LineDrawingControl', () => {
  const makeFeature = () =>
    new Feature({
      geometry: new LineString([
        [50, 50],
        [10, 10],
        [20, 20],
      ]),
      color: '#996600',
      shape: 'Line',
      id: '',
      buffer: 0,
      bufferUnit: 'meters',
    })
  const makeGeoJSON = () => ({
    type: 'Feature',
    properties: {
      color: '#996600',
      shape: 'Line',
      id: '',
      buffer: 0,
      bufferUnit: 'meters',
    },
    geometry: {
      type: 'LineString',
      coordinates: [
        [50, 50],
        [10, 10],
        [20, 20],
      ],
    },
    bbox: [10, 10, 50, 50],
  })
  let context: MockDrawingContext = new MockDrawingContext()
  let recievedGeo: any = null
  const receiver = (geoJSON: any) => {
    recievedGeo = geoJSON
  }
  let control: LineDrawingControl = new LineDrawingControl(
    context as any,
    receiver
  )
  beforeEach(() => {
    recievedGeo = null
    context = new MockDrawingContext()
    control = new LineDrawingControl(context as any, receiver)
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
      const startGeo = makeGeoJSON()
      startGeo.geometry.coordinates = [
        [88, 5],
        [22, 15],
        [64, 20],
        [88, 5],
      ]
      // @ts-ignore
      control.startDrawing(startGeo)
      control.onCompleteDrawing({
        feature: makeFeature(),
      })
      const expected = makeGeoJSON()
      expected.properties.color = '#996600'
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
      expected.properties.id = ''
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
