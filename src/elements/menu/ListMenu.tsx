import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Theme from 'src/theme-manager/themes/model'
import Menu, { IMenuProps } from './Menu'
import MenuItem from './MenuItem'

type Props = IMenuProps &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    list: { name: string; id: string; icon?: string }[]
    onMouseEnter?: any
    onMouseLeave?: any
    onClick?: (value: any) => any
    onClose: () => void
    render?: (item: any) => any
  }

export default function ListMenu({ anchor, list = [], onClick, render, ...props }: Props) {
  const classes = useStyles({})
  return (
    <Menu className={classes.menuContainer} anchor={anchor} {...props}>
      {list.map((item) =>
        typeof render === 'function' ? (
          render(item)
        ) : (
          <MenuItem
            key={item.id}
            onClick={() => onClick(item)}
            icon={typeof item.icon === 'string' ? item.icon : undefined}
          >
            {typeof item.icon !== 'string' ? item.icon : null}
            {item.name}
          </MenuItem>
        ),
      )}
    </Menu>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
  menuContainer: {
    '& .menu-popover': {
      padding: '8px',
    },
  },
}))
