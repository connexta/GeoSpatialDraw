import * as React from 'react'
import * as Units from '../../geometry'
import styled from 'styled-components'
import NumberInput from './number-input'
import * as Common from './common-styles'

const LENGTH_PRECISION = 3

type LengthUnit = Units.LengthUnit

type Props = {
  /** Length value */
  length: number
  /** Length unit of measure */
  unit: LengthUnit
  /** Called when length changes (should update length) */
  setLength: (length: number) => void
  /** Called when unit changes (should update unit) */
  setUnit: (unit: LengthUnit) => void
}

const Root = Common.Row
const LengthValue = styled(NumberInput)`
  margin-right: ${(props) => props.theme.minimumSpacing};
  width: 8rem;
`
const UnitContainer = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
  font-size: ${(props) => props.theme.minimumFontSize};
`

type SelectEvent = React.FormEvent<HTMLSelectElement>

const renderLengthUnitOption = (unit: LengthUnit) => (
  <option value={unit} key={unit}>
    {unit}
  </option>
)

const LengthEditor: React.SFC<Props> = ({
  length,
  unit,
  setLength,
  setUnit,
}) => (
  <Root>
    <LengthValue
      type="text"
      value={length}
      decimalPlaces={LENGTH_PRECISION}
      onChange={(value: number) => setLength(value)}
    />
    <UnitContainer>
      <select
        onChange={({ currentTarget: { value } }: SelectEvent) =>
          setUnit(value as LengthUnit)
        }
        value={unit}
      >
        {renderLengthUnitOption(Units.METERS)}
        {renderLengthUnitOption(Units.KILOMETERS)}
        {renderLengthUnitOption(Units.MILES)}
        {renderLengthUnitOption(Units.NAUTICAL_MILES)}
        {renderLengthUnitOption(Units.YARDS)}
        {renderLengthUnitOption(Units.FEET)}
      </select>
    </UnitContainer>
  </Root>
)

export default LengthEditor
