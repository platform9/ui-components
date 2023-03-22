import React, { PropsWithChildren } from 'react'
import { makeStyles } from '@material-ui/styles'
import Theme from '../../theme-manager/themes/model'
import clsx from 'clsx'

type DropdownMenuProps = {
  isOpen: boolean
  width: number
  compact?: boolean
}

const useStyles = makeStyles<Theme, DropdownMenuProps>((theme) => ({
  dropdownMenu: {
    opacity: ({ isOpen }) => (isOpen ? 1 : 0),
    maxHeight: ({ isOpen }) => (isOpen ? '20rem' : '1rem'),
    transition: 'opacity .2s ease, max-height .2s ease',
    zIndex: 10,
    color: theme.components.dropdown.color,
    backgroundColor: theme.components.dropdown.background,
    right: -1,
    padding: 0,
    marginTop: 0,
    position: 'absolute',
    width: ({ compact }) => (compact ? null : '100%'),
    minWidth: 150,
    maxWidth: ({ compact }) => (compact ? 300 : '100%'),
    overflowY: 'auto',
    overflowX: 'hidden',
    outline: '0',
    borderRadius: 4,
    borderColor: theme.components.dropdown.border,
    borderWidth: 1,
    borderStyle: 'solid',
    border: ({ isOpen }) => (isOpen ? null : 'none'),
  },
}))

export default React.forwardRef<HTMLUListElement, PropsWithChildren<DropdownMenuProps>>(
  (props, ref) => {
    const { isOpen, children, compact, ...rest } = props
    const classes = useStyles(props)
    return (
      <ul className={clsx(classes.dropdownMenu, 'dropdownMenu')} {...rest} ref={ref}>
        {children}
      </ul>
    )
  },
)
