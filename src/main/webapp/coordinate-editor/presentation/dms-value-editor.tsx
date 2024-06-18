import * as React from 'react'
import styled from 'styled-components'
import { DMS, dmsSign, dmsSetSign, SECONDS_PRECISION } from '../dms-formatting'
import NumberInput from './number-input'
import * as Common from './common-styles'

type BaseProps = {
  /** DMS value */
  value: DMS
  /** Called on change */
  setValue: (value: DMS) => void
}

type Props = BaseProps & {
  maxDegrees: number
  negativeHeadingTooltip: string
  positiveHeadingTooltip: string
  negativeHeadingName: string
  positiveHeadingName: string
}

const SmallInput = styled(NumberInput)`
  width: 3em;
  margin-right: ${(props) => props.theme.minimumSpacing};
`
SmallInput.displayName = 'SmallInput'
const WideInput = styled(NumberInput)`
  width: 5em;
  margin-right: ${(props) => props.theme.minimumSpacing};
`
WideInput.displayName = 'WideInput'
const HeadingButton = Common.SpacedToggleButton
HeadingButton.displayName = 'HeadingButton'

const DMSValueEditor: React.SFC<Props> = ({
  setValue,
  maxDegrees,
  negativeHeadingTooltip,
  positiveHeadingTooltip,
  negativeHeadingName,
  positiveHeadingName,
  ...rest
}) => {
  const display = dmsSetSign(rest.value, 1)
  const actual = rest.value
  const sign = dmsSign(actual)
  return (
    <React.Fragment>
      <SmallInput
        maxValue={maxDegrees}
        minValue={0}
        value={display.degree}
        decimalPlaces={0}
        placeholder="DD"
        onChange={(n: number) => {
          const degree = n * sign
          const minute = n < maxDegrees ? actual.minute : 0
          const second = n < maxDegrees ? actual.second : 0
          setValue({
            degree,
            minute,
            second,
          })
        }}
      />
      <SmallInput
        type="text"
        maxValue={display.degree >= maxDegrees ? 0 : 59}
        minValue={0}
        decimalPlaces={0}
        value={display.minute}
        placeholder="MM"
        onChange={(n: number) =>
          setValue({
            ...actual,
            minute: n,
          })
        }
      />
      <WideInput
        type="text"
        maxValue={display.degree >= maxDegrees ? 0 : 59}
        minValue={0}
        decimalPlaces={SECONDS_PRECISION}
        value={display.second}
        placeholder="SS"
        onChange={(n: number) =>
          setValue({
            ...actual,
            second: n,
          })
        }
      />
      <HeadingButton
        title={negativeHeadingTooltip}
        isSelected={sign === -1}
        onClick={() => setValue(dmsSetSign(actual, -1))}
      >
        {negativeHeadingName}
      </HeadingButton>
      <HeadingButton
        title={positiveHeadingTooltip}
        isSelected={sign === 1}
        onClick={() => setValue(dmsSetSign(actual, 1))}
      >
        {positiveHeadingName}
      </HeadingButton>
    </React.Fragment>
  )
}

const DMSLatitudeEditor: React.SFC<BaseProps> = (props) => (
  <DMSValueEditor
    maxDegrees={90}
    negativeHeadingName="S"
    negativeHeadingTooltip="Southern Hemisphere"
    positiveHeadingName="N"
    positiveHeadingTooltip="Northern Hemisphere"
    {...props}
  />
)

const DMSLongitudeEditor: React.SFC<BaseProps> = (props) => (
  <DMSValueEditor
    maxDegrees={180}
    negativeHeadingName="W"
    negativeHeadingTooltip="Western Hemisphere"
    positiveHeadingName="E"
    positiveHeadingTooltip="Eastern Hemisphere"
    {...props}
  />
)

export { DMSLatitudeEditor, DMSLongitudeEditor, DMSValueEditor }
