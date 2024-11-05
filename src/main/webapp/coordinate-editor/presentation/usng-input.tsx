import * as React from 'react'
import styled from 'styled-components'
import { HTMLAttributes } from '../../internal/html'
import { Converter } from 'usng.js'

type Props = HTMLAttributes & {
  /** USNG string */
  value: string
  /** Called on change */
  onChange: (value: string) => void
}

type State = {
  value: string
}

type FormEvent = React.FormEvent<HTMLInputElement>

const TextInput = styled.input<{ type: 'text' }>`
  width: 12em;
`
// @ts-ignore
TextInput.displayName = 'TextInput'

class USNGInput extends React.Component<Props, State> {
  unitConverter: {
    isUSNG: (usng: string) => 0 | string
  }
  constructor(props: Props) {
    super(props)
    this.state = {
      value: '',
    }
    this.unitConverter = new (Converter as any)()
  }
  componentDidMount() {
    const value = this.props.value
    if (this.state.value !== value) {
      this.setState({ value })
    }
  }
  componentDidUpdate(prevProps: Props) {
    if (
      prevProps.value !== this.props.value &&
      this.props.value !== this.state.value
    ) {
      this.setState({ value: this.props.value })
    }
  }
  render() {
    const { onChange, ...rest } = this.props
    return (
      <TextInput
        type="text"
        {...rest}
        value={this.state.value}
        onChange={({ currentTarget: { value } }: FormEvent) => {
          this.setState({ value })
        }}
        onBlur={() => {
          const value = this.state.value
          if (this.unitConverter.isUSNG(value) !== 0) {
            onChange(value)
          }
        }}
      />
    )
  }
}

export default USNGInput
