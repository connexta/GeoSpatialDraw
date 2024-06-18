import * as React from 'react'
import styled from 'styled-components'

type PropDefinition = {
  required?: boolean
  propType?: string
  defaultValue?: string
  description?: string
}

interface PropTypes {
  [key: string]: PropDefinition
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: monospace;
  white-space: pre;
  thead tr {
    text-align: left;
    border-bottom: 1px solid black;
  }
`
const Required = styled.span`
  color: red;
`

const tableComponentFactory =
  (propTypes: PropTypes): React.SFC =>
  () => {
    const propNames = Object.keys(propTypes)
    let tableBody = propNames.map((property) => {
      const {
        required = false,
        propType = '-',
        defaultValue = '',
        description = '',
      } = propTypes[property]
      return (
        <tr key={property}>
          <td>
            {property}
            {required ? <Required>*</Required> : null}
          </td>
          <td>{propType}</td>
          <td>{defaultValue}</td>
          <td>{description}</td>
        </tr>
      )
    })
    return (
      <Table>
        <thead>
          <tr>
            <th>name</th>
            <th>type</th>
            <th>default</th>
            <th>description</th>
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </Table>
    )
  }

export default tableComponentFactory
