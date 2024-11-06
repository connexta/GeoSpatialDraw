import * as React from 'react'
import styled from 'styled-components'
import { CoordinateUnit } from '../units'
import * as Units from '../units'
import { dmsValueToString } from '../dms-formatting'
import { utmToString } from '../utm-formatting'
import {
  latLonTo,
  USNG_CONVERSION_PRECISION,
  DECIMAL_DEGREES_PRECISION,
} from '../coordinate-converter'
import * as Common from './common-styles'

type Props = {
  /** Lattitude */
  lat: number
  /** Longitude */
  lon: number
  /** Coordinate unit */
  unit: CoordinateUnit
}

const Row = Common.Row

const Cell = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: flex-start;
  margin: 0;
  padding: 0;
  margin-right: ${(props) => props.theme.minimumSpacing};
`

const CoordinateValue: React.FC<Props> = ({ lat, lon, unit }) => {
  let cells: React.ReactNode
  switch (unit) {
    case Units.LAT_LON:
      {
        cells = (
          <React.Fragment>
            <Cell>
              {Math.abs(lat).toFixed(DECIMAL_DEGREES_PRECISION)}
              &deg; {lat < 0 ? 'S' : 'N'}
            </Cell>
            <Cell>
              {Math.abs(lon).toFixed(DECIMAL_DEGREES_PRECISION)}
              &deg; {lon < 0 ? 'W' : 'E'}
            </Cell>
          </React.Fragment>
        )
      }
      break
    case Units.LAT_LON_DMS:
      {
        const dmsPoint = latLonTo.LatLonDMS(lat, lon)
        cells = (
          <React.Fragment>
            <Cell>{dmsValueToString(dmsPoint.lat, false)}</Cell>
            <Cell>{dmsValueToString(dmsPoint.lon, true)}</Cell>
          </React.Fragment>
        )
      }
      break
    case Units.USNG:
      {
        cells = latLonTo.USNG(lat, lon, USNG_CONVERSION_PRECISION)
      }
      break
    case Units.UTM:
      {
        cells = utmToString(latLonTo.UTM(lat, lon))
      }
      break
  }
  return <Row>{cells}</Row>
}

export default CoordinateValue