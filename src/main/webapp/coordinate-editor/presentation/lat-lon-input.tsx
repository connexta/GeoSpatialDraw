import * as React from 'react'
import styled from 'styled-components'
import { HTMLAttributes } from '../../internal/html'
import NumberInput from './number-input'
import { DECIMAL_DEGREES_PRECISION } from '../coordinate-converter'

type Props = HTMLAttributes & {
  /** Decimal value */
  value: number
  /** Called on change */
  onChange: (value: number) => void
}
const DegreeInput = styled(NumberInput)`
  width: 8rem;
`
const LatitudeInput: React.SFC<Props> = (props) => (
  <DegreeInput
    maxValue={90}
    minValue={-90}
    decimalPlaces={DECIMAL_DEGREES_PRECISION}
    {...props}
  />
)
const LongitudeInput: React.SFC<Props> = (props) => (
  <DegreeInput
    maxValue={180}
    minValue={-180}
    decimalPlaces={DECIMAL_DEGREES_PRECISION}
    {...props}
  />
)

export { LatitudeInput, LongitudeInput }
