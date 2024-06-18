import * as React from 'react'
import * as ol from 'openlayers'
import {
  storiesOf,
  action,
  select,
  array,
  text,
  number,
  boolean,
} from '../../internal/storybook'
import { makeEmptyGeometry } from '../../geometry'
import { AllShapesEditorDialog } from '../'
import {
  shapeList,
  tableComponentFactory,
} from '../../internal/storybook-helpers'

const TableComponent = tableComponentFactory({
  geo: {
    propType: 'GeometryJSON',
    required: true,
    description: 'GeometryJSON to edit',
  },
  onOk: {
    propType: '(geo: GeometryJSON) => void',
    required: true,
    description: 'Okay button handler',
  },
  shape: {
    propType: 'Shape',
    required: true,
    description: 'Geometry shape to edit',
  },
})

const stories = storiesOf('coordinates/AllShapesEditorDialog', module)

stories.addParameters({
  info: {
    TableComponent,
  },
})

const makeGeometry = (shape) => makeEmptyGeometry('id', shape)

stories.add('basic', () => {
  const shape = select('shape', shapeList, 'Polygon')
  const geo = makeGeometry(shape)
  return <AllShapesEditorDialog geo={geo} onOk={action('onOk')} shape={shape} />
})
