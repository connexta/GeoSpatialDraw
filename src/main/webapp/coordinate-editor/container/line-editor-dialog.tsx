import * as React from 'react'
import { GeometryJSON } from '../../geometry'
import { geoEditorToDialog, FinalizeGeo } from './geo-editor-to-dialog'
import {
  FlatCoordinateListGeoEditor,
  Coordinates,
} from './flat-coordinate-list-geo-editor'
import { CoordinateUnit } from '../units'

const finalizeGeo: FinalizeGeo = (geo) => geo

type Props = {
  /** Geometry GeoJSON */
  geo: GeometryJSON
  /** Coordinate Unit */
  coordinateUnit: CoordinateUnit
  /** Called when GeoJSON changes */
  onUpdateGeo: (geo: GeometryJSON) => void
}

const LineGeoEditor: React.FC<Props> = (props) => (
  <FlatCoordinateListGeoEditor
    {...props}
    getCoordinatesFromGeo={(geo) => {
      const coordinates = (geo.geometry as GeoJSON.LineString)
        .coordinates as Coordinates
      return coordinates.length < 1 ? [[0, 0]] : coordinates
    }}
    updateGeoCoordinates={(geo, coordinates) => {
      const updated: GeometryJSON = { ...geo }
      if (coordinates.length < 1) {
        coordinates = [[0, 0]]
      }
      const lineGeo = geo.geometry as GeoJSON.LineString
      lineGeo.coordinates = coordinates
      return updated
    }}
  />
)
const LineEditorDialog = geoEditorToDialog(LineGeoEditor, 'Line', finalizeGeo)

export { LineGeoEditor, LineEditorDialog }