import * as React from 'react'
import BBoxEditor from './bbox-editor'
import { extentToBBox } from '../bbox-editor-props'
import { GeometryJSON, Extent } from '../../geometry'
import { CoordinateUnit } from '../units'
import { geoEditorToDialog, FinalizeGeo } from './geo-editor-to-dialog'

type Props = {
  /** Geometry GeoJSON */
  geo: GeometryJSON
  /** Coordinate Unit */
  coordinateUnit: CoordinateUnit
  /** Called when GeoJSON changes */
  onUpdateGeo: (geo: GeometryJSON) => void
}

const updateGeoWithExtentBBox = (
  geo: GeometryJSON,
  extent: Extent
): GeometryJSON => {
  const { north, south, east, west } = extentToBBox(extent)
  const coordinates: number[][][] = [
    [
      [west, south],
      [west, north],
      [east, north],
      [east, south],
      [west, south],
    ],
  ]
  return {
    ...geo,
    bbox: extent,
    geometry: {
      ...geo.geometry,
      coordinates,
    } as GeoJSON.Polygon,
  }
}

const finalizeGeo: FinalizeGeo = (geo) => {
  const { north, south, east, west } = extentToBBox(geo.bbox)
  const orientationCorrectedBBox: Extent = [
    Math.min(east, west),
    Math.min(north, south),
    Math.max(east, west),
    Math.max(north, south),
  ]
  return updateGeoWithExtentBBox(geo, orientationCorrectedBBox)
}

/**
 * Some comment that should show up
 */
class BBoxGeoEditor extends React.Component<Props> {
  render() {
    const { geo, coordinateUnit, onUpdateGeo } = this.props
    const extent = geo.bbox
    return (
      <BBoxEditor
        setExtent={(extent) => {
          onUpdateGeo(updateGeoWithExtentBBox(geo, extent))
        }}
        extent={extent}
        unit={coordinateUnit}
      />
    )
  }
}

const BBoxEditorDialog = geoEditorToDialog(
  BBoxGeoEditor,
  'Bounding Box',
  finalizeGeo
)

export { BBoxGeoEditor, BBoxEditorDialog, updateGeoWithExtentBBox, finalizeGeo }
