import { expect } from 'chai'
import {
  makeBBoxGeo,
  makeLineGeo,
  makePointGeo,
  makePointRadiusGeo,
  makePolygonGeo,
} from './shape-factory'

describe('shape-factory', () => {
  describe('makePointGeo', () => {
    it('default', () => {
      const geo = makePointGeo('id', 10, 50)
      expect(geo.geometry.coordinates).to.deep.equal([50, 10])
      expect(geo.geometry.type).to.equal('Point')
      expect(geo.properties.buffer).to.equal(0)
    })
  })
  describe('makePointRadiusGeo', () => {
    it('default', () => {
      const geo = makePointRadiusGeo('id', 10, 50, 600, 'miles')
      expect(geo.geometry.coordinates).to.deep.equal([50, 10])
      expect(geo.geometry.type).to.equal('Point')
      expect(geo.properties.buffer).to.equal(600)
      expect(geo.properties.bufferUnit).to.equal('miles')
    })
  })
  describe('makePolygonGeo', () => {
    it('default', () => {
      const geo = makePolygonGeo(
        'id',
        [
          [10, 50],
          [20, 60],
          [30, 80],
        ],
        5,
        'kilometers'
      )
      expect(geo.geometry.coordinates).to.deep.equal([
        [
          [10, 50],
          [20, 60],
          [30, 80],
          [10, 50],
        ],
      ])
      expect(geo.geometry.type).to.equal('Polygon')
      expect(geo.properties.buffer).to.equal(5)
      expect(geo.properties.bufferUnit).to.equal('kilometers')
    })
  })
  describe('makeLineGeo', () => {
    it('default', () => {
      const geo = makeLineGeo(
        'id',
        [
          [10, 50],
          [20, 60],
          [30, 80],
        ],
        50,
        'meters'
      )
      expect(geo.geometry.coordinates).to.deep.equal(
        [
          [10, 50],
          [20, 60],
          [30, 80],
        ],
        5,
        'kilometers'
      )
      expect(geo.geometry.type).to.equal('LineString')
      expect(geo.properties.buffer).to.equal(50)
      expect(geo.properties.bufferUnit).to.equal('meters')
    })
  })
  describe('makeBBoxGeo', () => {
    it('default', () => {
      const geo = makeBBoxGeo('id', [10, 20, 50, 55])
      expect(geo.bbox).to.deep.equal([10, 20, 50, 55])
      expect(geo.geometry.type).to.equal('Polygon')
      expect(geo.properties.buffer).to.equal(0)
    })
  })
})
