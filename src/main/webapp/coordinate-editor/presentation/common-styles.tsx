import styled from 'styled-components'
import ToggleButton from './toggle-button'

const BBoxRoot = styled.div<{ flexDirection: 'column' | 'row' }>`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  min-width: 25rem;
  min-height: 9.5rem;
`
const Column = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`
const Row = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
`
const Label = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
  justify-content: flex-end;
  align-items: center;
  width: 6em;
  margin-right: ${(props) => props.theme.minimumSpacing};
  font-size: ${(props) => props.theme.minimumFontSize};
`

// @ts-ignore
const CompactLabel = styled(Label)`
  width: 4em;
`
const SpacedToggleButton = styled(ToggleButton)`
  margin: 0;
  margin-right: ${(props) => props.theme.minimumSpacing};
  font-size: ${(props) => props.theme.minimumFontSize};
  padding: 0 calc(${(props) => props.theme.minimumSpacing} / 2);
  height: auto;
`
const SpacedInputLabelRow = styled.label`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => props.theme.minimumSpacing};
`

export {
  Column,
  Row,
  Label,
  CompactLabel,
  SpacedToggleButton,
  SpacedInputLabelRow,
  BBoxRoot,
}
