import '../../internal/tests'
import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { makeEmptyGeometry } from '../../geometry'
import { PolygonEditorDialog } from './polygon-editor-dialog'

describe('<PolygonEditorDialog />', () => {
  let startGeo
  beforeEach(() => {
    startGeo = makeEmptyGeometry('', 'Line')
    startGeo.geometry.coordinates = [
      [
        [10, 12],
        [30, 50],
        [45, 34],
        [32, 24],
        [10, 12],
      ],
    ]
    startGeo.bbox = [10, 12, 45, 50]
  })
  it('render', () => {
    const wrapper = shallow(
      <PolygonEditorDialog geo={startGeo} onOk={() => {}} />
    )
    expect(wrapper.exists()).to.equal(true)
  })
})
