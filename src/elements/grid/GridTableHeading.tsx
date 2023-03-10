import React, { PropsWithChildren } from 'react'
import { styled } from '@material-ui/styles'
import Theme from 'src/theme-manager/themes/model'
import { GridCellWidth } from 'src/elements/grid/hooks/useGridRows'
import { switchCase } from 'src/utils/fp'

export default styled(({ sortingDisabled, width, children, ...props }) => (
  <th {...props}>{children}</th>
))<Theme, PropsWithChildren<{ sortingDisabled: boolean; width: GridCellWidth }>>(
  ({ theme, width = 'small', sortingDisabled }) => ({
    position: 'relative',
    border: 0,
    margin: 0,
    minWidth: switchCase(
      {
        small: 80,
        medium: 160,
        large: 340,
      },
      width,
    )(width),
    padding: theme.spacing(0.5, 1),
    cursor: sortingDisabled ? 'default' : 'pointer',
    color: theme.components.table.headColor,
    '&:first-child': {
      paddingLeft: 16,
    },
    '&:last-child': {
      paddingRight: 16,
    },
    '&.select-column': {
      width: 26,
      minWidth: 26,
      '&:after': {
        content: 'none',
      },
      '& > .checkbox': {
        padding: 4,
        marginLeft: -4,
        width: 16,
      },
    },
    '& > .grid_header-text': {
      color: theme.components.table.headColor,
    },
    '& > .grid_header-direction': {
      position: 'absolute',
      right: 0,
      top: '50%',
      fontSize: 12,
      transform: 'translate(0, -50%)',
      padding: theme.spacing(0, 0.5),
      '&:before': {
        height: 6,
        display: 'block',
      },
    },
  }),
)
