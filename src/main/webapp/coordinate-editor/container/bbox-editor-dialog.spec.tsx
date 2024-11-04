import '../../internal/tests'
import * as React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { makeEmptyGeometry } from '../../geometry'
import { LAT_LON } from '../units'
import {
  BBoxEditorDialog,
  updateGeoWithExtentBBox,
  finalizeGeo,
} from './bbox-editor-dialog'

describe('bboxEditorDialog', () => {
  let startGeo: any
  beforeEach(() => {
    startGeo = makeEmptyGeometry('', 'Polygon')
    startGeo.geometry.coordinates = [
      [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ],
    ]
    startGeo.bbox = [0, 0, 0, 0]
  })
  describe('<BBoxEditorDialog />', () => {
    it('render', () => {
      const wrapper = shallow(
        // @ts-ignore
        <BBoxEditorDialog
          // @ts-ignore
          geo={startGeo}
          // @ts-ignore
          coordinateUnit={LAT_LON}
          onUpdateGeo={() => {}}
        />
      )
      expect(wrapper.exists()).to.equal(true)
    })
  })
  describe('updateGeoWithExtentBBox', () => {
    it('default', () => {
      // @ts-ignore
      const updated = updateGeoWithExtentBBox(startGeo, [-5, -10, 5, 10])
      expect(updated.bbox).to.deep.equal([-5, -10, 5, 10])
      expect(updated.geometry.coordinates).to.deep.equal([
        [
          [-5, -10],
          [-5, 10],
          [5, 10],
          [5, -10],
          [-5, -10],
        ],
      ])
    })
  })
  describe('finalizeGeo', () => {
    it('reversed coordinates', () => {
      // @ts-ignore
      const geo = updateGeoWithExtentBBox(startGeo, [5, 10, -5, -10])
      const updated = finalizeGeo(geo)
      expect(updated.bbox).to.deep.equal([-5, -10, 5, 10])
      expect(updated.geometry.coordinates).to.deep.equal([
        [
          [-5, -10],
          [-5, 10],
          [5, 10],
          [5, -10],
          [-5, -10],
        ],
      ])
    })
    it('half reversed coordinates', () => {
      // @ts-ignore
      const geo = updateGeoWithExtentBBox(startGeo, [-5, 10, 5, -10])
      const updated = finalizeGeo(geo)
      expect(updated.bbox).to.deep.equal([-5, -10, 5, 10])
      expect(updated.geometry.coordinates).to.deep.equal([
        [
          [-5, -10],
          [-5, 10],
          [5, 10],
          [5, -10],
          [-5, -10],
        ],
      ])
    })
  })
})
