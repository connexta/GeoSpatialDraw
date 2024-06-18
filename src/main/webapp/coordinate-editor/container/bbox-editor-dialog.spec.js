import '../../internal/tests'
import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { LAT_LON, makeEmptyGeometry } from '../../geometry'
import {
  BBoxEditorDialog,
  updateGeoWithExtentBBox,
  finalizeGeo,
} from './bbox-editor-dialog'

describe('bboxEditorDialog', () => {
  let startGeo
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
        <BBoxEditorDialog
          geo={startGeo}
          coordinateUnit={LAT_LON}
          onUpdateGeo={() => {}}
        />
      )
      expect(wrapper.exists()).to.equal(true)
    })
  })
  describe('updateGeoWithExtentBBox', () => {
    it('default', () => {
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
