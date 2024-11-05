import * as React from 'react'
import { Shape } from '../../shape-utils'
import { GeometryJSON } from '../../geometry'
import { BBoxEditorDialog } from './bbox-editor-dialog'
import { CircleEditorDialog } from './circle-editor-dialog'
import { LineEditorDialog } from './line-editor-dialog'
import { PointEditorDialog } from './point-editor-dialog'
import { PolygonEditorDialog } from './polygon-editor-dialog'

type Props = {
  /** Geometry GeoJSON */
  geo: GeometryJSON
  /** Okay button handler */
  onOk: (geo: GeometryJSON) => void
  /** Geometry shape */
  shape: Shape
}

const AllShapesEditorDialog: React.FC<Props> = ({ shape, geo, onOk }) => {
  switch (shape) {
    case 'Polygon':
      return <PolygonEditorDialog geo={geo} onOk={onOk} />
    case 'Line':
      return <LineEditorDialog geo={geo} onOk={onOk} />
    case 'Point':
      return <PointEditorDialog geo={geo} onOk={onOk} />
    case 'Point Radius':
      return <CircleEditorDialog geo={geo} onOk={onOk} />
    case 'Bounding Box':
      return <BBoxEditorDialog geo={geo} onOk={onOk} />
    default:
      throw new Error(`Shape ${shape} is not supported!`)
  }
}

export default AllShapesEditorDialog
