import { expect } from 'chai'
import MockDrawingContext from './test/mock-drawing-context'
import BoundingBoxDrawingControl from './bounding-box-drawing-control'

describe('BoundingBoxDrawingControl', () => {
  const makePolygonJSON = () =>
    ({
      type: 'Feature',
      properties: {
        color: '#996600',
        shape: 'Bounding Box',
        id: 'identifier',
        buffer: 0,
        bufferUnit: 'meters',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [10, 10],
            [50, 10],
            [50, 50],
            [10, 50],
            [10, 10],
          ],
        ],
      },
      bbox: [10, 10, 50, 50],
    } as any)
  describe('constructor', () => {
    it('default', () => {
      const context = new MockDrawingContext()
      const receiver = () => {}
      new BoundingBoxDrawingControl(context as any, receiver)
    })
  })
  describe('setGeo', () => {
    it('default', () => {
      const context = new MockDrawingContext()
      const receiver = () => {}
      const control = new BoundingBoxDrawingControl(context as any, receiver)
      control.setGeo(makePolygonJSON())
      const expected = makePolygonJSON()
      expect(
        context
          .getMethodCalls()
          .updateFeature[0][0].getGeometry()
          .getCoordinates()
      ).to.deep.equal(expected.geometry.coordinates)
      expect(context.getMethodCalls().updateFeature.length).to.equal(1)
      expect(context.getMethodCalls().removeFeature.length).to.equal(0)
      expect(control.isDrawing()).to.equal(true)
    })
  })
  describe('startDrawing', () => {
    it('default', () => {
      const context = new MockDrawingContext()
      const receiver = () => {}
      const control = new BoundingBoxDrawingControl(context as any, receiver)
      control.startDrawing()
      expect(context.getMethodCalls().addInteractions.length).to.equal(0)
      expect(
        context.getMethodCalls().addInteractionsWithoutModify.length
      ).to.equal(1)
      expect(context.getMethodCalls().setEvent.length).to.equal(1)
      expect(context.getMethodCalls().setDrawInteraction.length).to.equal(1)
      expect(context.getMethodCalls().updateFeature.length).to.equal(0)
      expect(context.getMethodCalls().removeFeature.length).to.equal(1)
      expect(control.isDrawing()).to.equal(true)
    })
  })
  describe('cancelDrawing', () => {
    it('default', () => {
      const context = new MockDrawingContext()
      const receiver = () => {}
      const control = new BoundingBoxDrawingControl(context as any, receiver)
      control.cancelDrawing()
      expect(context.getMethodCalls().removeListeners.length).to.equal(1)
      expect(context.getMethodCalls().removeInteractions.length).to.equal(1)
      expect(control.isDrawing()).to.equal(false)
    })
  })
  describe('extentChanged', () => {
    const makeExtent = () => {
      return [11, 20, 50, 60] as any
    }
    const makeExpectedJSON = () => ({
      type: 'Feature',
      properties: {
        color: '#996600',
        shape: 'Bounding Box',
        id: '',
        buffer: 0,
        bufferUnit: 'meters',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [11, 20],
            [50, 20],
            [50, 60],
            [11, 60],
            [11, 20],
          ],
        ],
      },
      bbox: makeExtent(),
    })
    it('default', () => {
      const context = new MockDrawingContext()
      let updated = null
      const receiver = (geoJSON: any) => {
        updated = geoJSON
      }
      const control = new BoundingBoxDrawingControl(context as any, receiver)
      control.extentChanged({
        extent: makeExtent(),
      })
      const expected = makeExpectedJSON()
      expect(updated).to.deep.equal(expected)
    })
    it('startDrawing -> extentChanged', () => {
      const context = new MockDrawingContext()
      let updated = null
      const receiver = (geoJSON: any) => {
        updated = geoJSON
      }
      // @ts-ignore
      const control = new BoundingBoxDrawingControl(context, receiver)
      control.startDrawing()
      // @ts-ignore
      control.setGeo(makePolygonJSON())
      control.extentChanged({
        // @ts-ignore
        extent: makeExtent(),
      })
      const expected = makeExpectedJSON()
      expected.properties.id = 'identifier'
      expected.properties.color = '#996600'
      expect(updated).to.deep.equal(expected)
    })
  })
})
