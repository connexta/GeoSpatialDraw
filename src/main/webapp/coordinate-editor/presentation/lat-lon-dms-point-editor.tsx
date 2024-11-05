import * as React from 'react'
import { DMS, decimalToDMS, dmsToDecimal } from '../dms-formatting'
import { DMSLatitudeEditor, DMSLongitudeEditor } from './dms-value-editor'
import * as Common from './common-styles'
import Props from '../point-editor-props'

const Root = Common.Column
const TextGroup = Common.SpacedInputLabelRow
const Label = Common.Label

const LatLonDMSPointEditor: React.FC<Props> = ({ lat, lon, setCoordinate }) => {
  const dmsLat = decimalToDMS(lat)
  const dmsLon = decimalToDMS(lon)
  return (
    <Root>
      <TextGroup>
        <Label>Latitude</Label>
        <DMSLatitudeEditor
          value={dmsLat}
          setValue={(value: DMS) => {
            const decimalValue = dmsToDecimal(value)
            setCoordinate(decimalValue, lon)
          }}
        />
      </TextGroup>
      <TextGroup style={{ marginBottom: 0 }}>
        <Label>Longitude</Label>
        <DMSLongitudeEditor
          value={dmsLon}
          setValue={(value: DMS) => {
            const decimalValue = dmsToDecimal(value)
            setCoordinate(lat, decimalValue)
          }}
        />
      </TextGroup>
    </Root>
  )
}

export default LatLonDMSPointEditor
