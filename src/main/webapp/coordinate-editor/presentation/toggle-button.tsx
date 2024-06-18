import styled from 'styled-components'
import { Black, White } from './colors'

const ToggleButton = styled.div<{ isSelected: boolean; title: string }>`
  padding: ${(props) => props.theme.minimumSpacing};
  background-color: ${(props) =>
    props.isSelected ? props.theme.primaryColor : 'transparent'};
  cursor: pointer;
  color: ${Black};
  :hover {
    background-color: ${Black};
    color: ${White};
  }
`

export default ToggleButton
