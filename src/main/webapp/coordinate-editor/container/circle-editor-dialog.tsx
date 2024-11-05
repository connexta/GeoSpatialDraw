import * as React from 'react'
import { LengthUnit, GeometryJSON } from '../../geometry'
import { geoEditorToDialog, FinalizeGeo } from './geo-editor-to-dialog'
import { CircleEditor } from '../presentation/point-circle-editor'
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

class CircleGeoEditor extends React.Component<Props> {
  render() {
    const { geo, coordinateUnit, onUpdateGeo } = this.props
    const lon = (geo.geometry as GeoJSON.Point).coordinates[0]
    const lat = (geo.geometry as GeoJSON.Point).coordinates[1]
    const radius = geo.properties.buffer || 0
    const radiusUnit = geo.properties.bufferUnit
    return (
      <CircleEditor
        coordinateUnit={coordinateUnit}
        lat={lat}
        lon={lon}
        radius={radius}
        radiusUnit={radiusUnit}
        setCoordinate={(latValue: number, lonValue: number) => {
          onUpdateGeo(
            updateCircleGeo(geo, latValue, lonValue, radius, radiusUnit)
          )
        }}
        setRadius={(value: number) => {
          onUpdateGeo(updateCircleGeo(geo, lat, lon, value, radiusUnit))
        }}
        setRadiusUnit={(value: LengthUnit) => {
          onUpdateGeo(updateCircleGeo(geo, lat, lon, radius, value))
        }}
      />
    )
  }
}

const CircleEditorDialog = geoEditorToDialog(
  CircleGeoEditor,
  'Point Radius',
  finalizeGeo
)

export { CircleEditorDialog, CircleGeoEditor }
