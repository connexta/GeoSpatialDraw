import * as React from 'react'
import styled from 'styled-components'
import { BBoxEditorProps as Props } from '../bbox-editor-props'
import { LatitudeInput, LongitudeInput } from './lat-lon-input'
import * as Common from './common-styles'

const Root = Common.BBoxRoot
const TextGroup = styled.label`
  margin: 0;
  padding: 0;
  display: flex;
`
const Label = Common.CompactLabel

const LatLonBBoxEditor: React.FC<Props> = ({
  north,
  south,
  east,
  west,
  setBBox,
}) => (
  <Root flexDirection="column">
    <TextGroup>
      <Label>North</Label>
      <LatitudeInput
        value={north}
        onChange={(value: number) => {
          setBBox({
            north: value,
            south,
            east,
            west,
          })
        }}
      />
    </TextGroup>
    <TextGroup>
      <Label>South</Label>
      <LatitudeInput
        value={south}
        onChange={(value: number) => {
          setBBox({
            north,
            south: value,
            east,
            west,
          })
        }}
      />
    </TextGroup>
    <TextGroup>
      <Label>East</Label>
      <LongitudeInput
        value={east}
        onChange={(value: number) => {
          setBBox({
            north,
            south,
            east: value,
            west,
          })
        }}
      />
    </TextGroup>
    <TextGroup>
      <Label>West</Label>
      <LongitudeInput
        value={west}
        onChange={(value: number) => {
          setBBox({
            north,
            south,
            east,
            west: value,
          })
        }}
      />
    </TextGroup>
  </Root>
)

export default LatLonBBoxEditor
