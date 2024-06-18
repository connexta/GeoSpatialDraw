import * as React from 'react'
import * as turf from '@turf/turf'
import { GeometryJSON } from '../../geometry'
import { geoEditorToDialog, FinalizeGeo } from './geo-editor-to-dialog'
import {
  FlatCoordinateListGeoEditor,
  Coordinates,
} from './flat-coordinate-list-geo-editor'
import { CoordinateUnit } from '../units'

const MIN_POLYGON_COORDINATE_LENGTH = 2
const finalizeGeo: FinalizeGeo = (geo) => geo

type Props = {
  /** Geometry GeoJSON */
  geo: GeometryJSON
  /** Coordinate Unit */
  coordinateUnit: CoordinateUnit
  /** Called when GeoJSON changes */
  onUpdateGeo: (geo: GeometryJSON) => void
}

const PolygonGeoEditor: React.SFC<Props> = (props) => (
  <FlatCoordinateListGeoEditor
    {...props}
    getCoordinatesFromGeo={(geo) => {
      const coordinates = (geo.geometry as turf.Polygon)
        .coordinates[0] as Coordinates
      return coordinates.length < MIN_POLYGON_COORDINATE_LENGTH
        ? [[0, 0]]
        : coordinates.slice(0, coordinates.length - 1)
    }}
    updateGeoCoordinates={(geo, coordinates) => {
      const updated: GeometryJSON = { ...geo }
      if (coordinates.length < 1) {
        coordinates = [[0, 0]]
      }
      coordinates.push(coordinates[0])
      const polyGeo = geo.geometry as turf.Polygon
      polyGeo.coordinates = [coordinates]
      return updated
    }}
  />
)

const PolygonEditorDialog = geoEditorToDialog(
  PolygonGeoEditor,
  'Polygon',
  finalizeGeo
)
PolygonEditorDialog.displayName = 'PolygonEditorDialog'

export { PolygonGeoEditor, PolygonEditorDialog }
