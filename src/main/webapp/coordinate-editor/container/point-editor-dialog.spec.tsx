import '../../internal/tests'
import * as React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { makeEmptyGeometry } from '../../geometry'
import { PointEditorDialog } from './point-editor-dialog'
import { LAT_LON } from '../units'

describe('<PointEditorDialog />', () => {
  it('render', () => {
    const startGeo = makeEmptyGeometry('', 'Line')
    startGeo.geometry.coordinates = [
      [10, 12],
      [30, 50],
      [45, 34],
      [32, 24],
      [10, 12],
    ]
    startGeo.bbox = [10, 12, 45, 50]
    const wrapper = shallow(
      // @ts-ignore
      <PointEditorDialog
        geo={startGeo}
        // @ts-ignore
        coordinateUnit={LAT_LON}
        onUpdateGeo={() => {}}
      />
    )
    expect(wrapper.exists()).to.equal(true)
  })
})
