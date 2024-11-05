import * as React from 'react'
import * as Units from '../units'
import LatLonDMSPointEditor from '../presentation/lat-lon-dms-point-editor'
import LatLonPointEditor from '../presentation/lat-lon-point-editor'
import USNGPointEditor from '../presentation/usng-point-editor'
import UTMPointEditor from '../presentation/utm-point-editor'
import EditorProps from '../point-editor-props'

type Props = {
  /** Latitude degrees */
  lat: number
  /** Longitude degrees */
  lon: number
  /** Called when the coordinates change (should update lat & lon) */
  setCoordinate: (lat: number, lon: number) => void
  /** Coordinate Unit to display */
  unit: Units.CoordinateUnit
}

type Editor = React.ComponentType<EditorProps>

const editorMap = (unit: Units.CoordinateUnit): Editor => {
  switch (unit) {
    case Units.LAT_LON:
      return LatLonPointEditor
    case Units.LAT_LON_DMS:
      return LatLonDMSPointEditor
    case Units.USNG:
      return USNGPointEditor
    case Units.UTM:
      return UTMPointEditor
    default:
      throw new Error(`Unit "${unit}" not supported!`)
  }
}

const PointEditor: React.FC<Props> = ({ lat, lon, setCoordinate, unit }) => {
  const EditorTag = editorMap(unit)
  return <EditorTag lat={lat} lon={lon} setCoordinate={setCoordinate} />
}

export default PointEditor
