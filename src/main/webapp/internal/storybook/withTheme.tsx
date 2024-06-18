import * as React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import themes, { ColorMode, SpacingMode } from './themes'

import './fonts.css'

const { select } = require('@connexta/ace/@storybook/addon-knobs')

type Story = () => any

const Table = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  font-size: 14pt;
  font-family: 'Open Sans', arial, sans-serif;
`

const TableColumn = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`

const TableData = styled.div<any>`
  padding: 20px;
  box-sizing: border-box;
  flex: 1;
  background: ${(props) => props.theme.backgroundContent};
`

const withTheme = (story: Story) => {
  const colors = select(
    'Color Scheme',
    {
      Dark: ['dark'],
      Light: ['light'],
      Sea: ['sea'],
      All: ['dark', 'light', 'sea'],
    },
    ['dark']
  ) as ColorMode[]

  const spacing = select(
    'Spacing',
    {
      Comfortable: ['comfortable'],
      Cozy: ['cozy'],
      Compact: ['compact'],
      All: ['comfortable', 'cozy', 'compact'],
    },
    ['comfortable']
  ) as SpacingMode[]

  const el = story()

  return (
    <Table>
      <style>{'body {margin: 0;}'}</style>
      {colors.map((c) => {
        return (
          <TableColumn>
            {spacing.map((s) => {
              const theme = themes({ colors: c, spacing: s })
              return (
                <ThemeProvider theme={theme}>
                  <TableData>{el}</TableData>
                </ThemeProvider>
              )
            })}
          </TableColumn>
        )
      })}
    </Table>
  )
}

export default withTheme
