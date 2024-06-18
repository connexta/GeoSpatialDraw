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
import { makePointRadiusGeo, METERS } from '../../geometry'
import { CircleGeoEditor } from '../'
import {
  coordinateUnitList,
  lengthUnitList,
  tableComponentFactory,
} from '../../internal/storybook-helpers'

const TableComponent = tableComponentFactory({
  geo: {
    propType: 'GeometryJSON',
    required: true,
    description: 'GeometryJSON to edit',
  },
  coordinateUnit: {
    propType: 'CoordinateUnit',
    required: true,
    description: 'Coordinate unit',
  },
  onUpdateGeo: {
    propType: '(geo: GeometryJSON) => void',
    required: true,
    description: 'Called when GeometryJSON changes',
  },
})

const stories = storiesOf('coordinates/CircleGeoEditor', module)

stories.addParameters({
  info: {
    TableComponent,
    propTablesExclude: [React.Fragment, Map],
  },
})

coordinateUnitList.forEach((coordinateUnit) => {
  stories.add(coordinateUnit, () => {
    const lat = number('lat', 50)
    const lon = number('lon', 50)
    const radius = number('radius', 10)
    const radiusUnit = select('radius unit', lengthUnitList, METERS)
    const geometry = makePointRadiusGeo('id', lat, lon, radius, radiusUnit)
    return (
      <CircleGeoEditor
        geo={geometry}
        coordinateUnit={coordinateUnit}
        onUpdateGeo={action('onUpdateGeo')}
      />
    )
  })
})
