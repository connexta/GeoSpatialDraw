import '../../internal/tests'
import * as React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { makeEmptyGeometry } from '../../geometry'
import { LAT_LON } from '../units'
import { CircleEditorDialog } from './circle-editor-dialog'

describe('<CircleEditorDialog />', () => {
  it('render', () => {
    const startGeo = makeEmptyGeometry('', 'Point Radius')
    startGeo.geometry.coordinates = [10, 50]
    startGeo.bbox = [10, 50, 10, 50]
    const wrapper = shallow(
      // @ts-ignore
      <CircleEditorDialog
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
