import * as React from 'react'
import * as turf from '@turf/turf'
import { METERS, GeometryJSON } from '../../geometry'
import { geoEditorToDialog, FinalizeGeo } from './geo-editor-to-dialog'
import { FixedHeightPointEditor } from '../presentation/point-circle-editor'
import { updateCircleGeo } from '../circle-geo-writer'
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

class PointGeoEditor extends React.Component<Props> {
  render() {
    const { geo, coordinateUnit, onUpdateGeo } = this.props
    const lon = (geo.geometry as turf.Point).coordinates[0]
    const lat = (geo.geometry as turf.Point).coordinates[1]
    return (
      <FixedHeightPointEditor
        coordinateUnit={coordinateUnit}
        lat={lat}
        lon={lon}
        setCoordinate={(latValue: number, lonValue: number) => {
          onUpdateGeo(updateCircleGeo(geo, latValue, lonValue, 0, METERS))
        }}
      />
    )
  }
}

const PointEditorDialog = geoEditorToDialog(
  PointGeoEditor,
  'Point',
  finalizeGeo
)
PointEditorDialog.displayName = 'PointEditorDialog'

export { PointGeoEditor, PointEditorDialog }
