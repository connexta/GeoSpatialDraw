import { expect } from 'chai'
import { makeGeometry, adjustGeoCoordsForAntimeridian } from './utilities'

describe('geometry', () => {
  describe('makeGeometry', () => {
    it('basic line', () => {
      const geometry = makeGeometry(
        'identifier',
        {
          type: 'LineString',
          coordinates: [
            [10, 30],
            [15, 40],
            [20, 25],
          ],
        },
        'purple',
        'Line'
      )
      expect(geometry.type).to.equal('Feature')
      expect(geometry.properties.id).to.equal('identifier')
      expect(geometry.properties.color).to.equal('purple')
      expect(geometry.properties.shape).to.equal('Line')
      expect(geometry.properties.buffer).to.equal(0)
      expect(geometry.properties.bufferUnit).to.equal('meters')
      expect(geometry.geometry.type).to.equal('LineString')
      expect(geometry.geometry.coordinates).to.deep.equal([
        [10, 30],
        [15, 40],
        [20, 25],
      ])
      expect(geometry.bbox).to.deep.equal([10, 25, 20, 40])
    })
    it('buffered line', () => {
      const geometry = makeGeometry(
        'identifier',
        {
          type: 'LineString',
          coordinates: [
            [10, 30],
            [15, 40],
            [20, 25],
          ],
        },
        'purple',
        'Line',
        50,
        'miles'
      )
      expect(geometry.type).to.equal('Feature')
      expect(geometry.properties.id).to.equal('identifier')
      expect(geometry.properties.color).to.equal('purple')
      expect(geometry.properties.shape).to.equal('Line')
      expect(geometry.properties.buffer).to.equal(50)
      expect(geometry.properties.bufferUnit).to.equal('miles')
      expect(geometry.geometry.type).to.equal('LineString')
      expect(geometry.geometry.coordinates).to.deep.equal([
        [10, 30],
        [15, 40],
        [20, 25],
      ])
      expect(geometry.bbox[0]).to.be.below(10)
      expect(geometry.bbox[1]).to.be.below(25)
      expect(geometry.bbox[2]).to.be.above(20)
      expect(geometry.bbox[3]).to.be.above(40)
    })
    it('buffered point', () => {
      const geometry = makeGeometry(
        'identifier',
        {
          type: 'Point',
          coordinates: [10, 30],
        },
        'purple',
        'Point Radius',
        50,
        'miles'
      )
      expect(geometry.type).to.equal('Feature')
      expect(geometry.properties.id).to.equal('identifier')
      expect(geometry.properties.color).to.equal('purple')
      expect(geometry.properties.shape).to.equal('Point Radius')
      expect(geometry.properties.buffer).to.equal(50)
      expect(geometry.properties.bufferUnit).to.equal('miles')
      expect(geometry.geometry.type).to.equal('Point')
      expect(geometry.bbox[0]).to.be.below(10)
      expect(geometry.bbox[1]).to.be.below(30)
      expect(geometry.bbox[2]).to.be.above(10)
      expect(geometry.bbox[3]).to.be.above(30)
    })
    it('buffered tiny point', () => {
      const geometry = makeGeometry(
        'identifier',
        {
          type: 'Point',
          coordinates: [10, 30],
        },
        'purple',
        'Point Radius',
        Number.MIN_VALUE,
        'feet'
      )
      expect(geometry.type).to.equal('Feature')
      expect(geometry.properties.id).to.equal('identifier')
      expect(geometry.properties.color).to.equal('purple')
      expect(geometry.properties.shape).to.equal('Point Radius')
      expect(geometry.properties.buffer).to.equal(Number.MIN_VALUE)
      expect(geometry.properties.bufferUnit).to.equal('feet')
      expect(geometry.geometry.type).to.equal('Point')
      expect(geometry.bbox[0]).to.equal(10)
      expect(geometry.bbox[1]).to.equal(30)
      expect(geometry.bbox[2]).to.equal(10)
      expect(geometry.bbox[3]).to.equal(30)
    })
  })
  describe('adjustGeoCoordsForAntimeridian', () => {
    it('adjusts LineStrings that cross the antimeridian', () => {
      const geometry = makeGeometry(
        'identifier',
        {
          type: 'LineString',
          coordinates: [
            [170, 0],
            [-170, 0],
          ],
        },
        'purple',
        'Line'
      )
      adjustGeoCoordsForAntimeridian(geometry)
      expect(geometry.geometry.coordinates).to.deep.equal([
        [170, 0],
        [190, 0],
      ])
    })
    it('adjusts Polygons that cross the antimeridian', () => {
      const geometry = makeGeometry(
        'identifier',
        {
          type: 'Polygon',
          coordinates: [
            [
              [170, 0],
              [170, 10],
              [-170, 10],
              [-170, 0],
              [170, 0],
            ],
          ],
        },
        'purple',
        'Polygon'
      )
      adjustGeoCoordsForAntimeridian(geometry)
      expect(geometry.geometry.coordinates).to.deep.equal([
        [
          [170, 0],
          [170, 10],
          [190, 10],
          [190, 0],
          [170, 0],
        ],
      ])
    })
  })
})
