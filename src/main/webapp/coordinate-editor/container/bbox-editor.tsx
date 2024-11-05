import * as React from 'react'
import * as Units from '../units'
import LatLonDMSBBoxEditor from '../presentation/lat-lon-dms-bbox-editor'
import LatLonBBoxEditor from '../presentation/lat-lon-bbox-editor'
import USNGBBoxEditor from '../presentation/usng-bbox-editor'
import UTMBBoxEditor from '../presentation/utm-bbox-editor'
import {
  extentToBBox,
  bboxToExtent,
  BBoxEditorProps,
} from '../bbox-editor-props'
import { Extent } from '../../geometry'

type Props = {
  /** Set extent array of bounding box in lat lon */
  setExtent: (extent: Extent) => void
  /** Get extent array of bounding box in lat lon */
  extent: Extent
  /** Coordinate Unit to display */
  unit: Units.CoordinateUnit
}

type Editor = React.ComponentType<BBoxEditorProps>

const editorMap = (unit: Units.CoordinateUnit): Editor => {
  switch (unit) {
    case Units.LAT_LON:
      return LatLonBBoxEditor
    case Units.LAT_LON_DMS:
      return LatLonDMSBBoxEditor
    case Units.USNG:
      return USNGBBoxEditor
    case Units.UTM:
      return UTMBBoxEditor
    default:
      throw new Error(`Unit "${unit}" not supported!`)
  }
}

const BBoxEditor: React.FC<Props> = ({ setExtent, extent, unit }) => {
  const { north, south, east, west } = extentToBBox(extent)
  const EditorTag = editorMap(unit)
  return (
    <EditorTag
      north={north}
      south={south}
      east={east}
      west={west}
      setBBox={(bbox) => {
        setExtent(bboxToExtent(bbox))
      }}
    />
  )
}

export default BBoxEditor
