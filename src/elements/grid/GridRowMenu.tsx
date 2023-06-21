import React, { useCallback, useMemo } from 'react'
import {
  GridRowMenuItemsProps,
  GridRowMenuOffset,
  isGridRowMenuHeader,
} from '../../elements/grid/hooks/useGridRowMenu'
import clsx from 'clsx'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'
import useToggler from '../../hooks/useToggler'
import { middleLeft } from '../../elements/menu/defaults'
import Menu from '../../elements/menu/Menu'
import MenuItem from '../../elements/menu/MenuItem'
import { makeStyles } from '@material-ui/styles'
import Theme from '../../theme-manager/themes/model'
import Text from '../../elements/Text'

interface GridRowMenuProps<T> extends GridRowMenuItemsProps<T> {
  item: T
  rowMenuOffset?: GridRowMenuOffset
  // Default behavior is that when there is only one row action for an item,
  // display just a button instead of a menu/dropdown. Set this to false if you
  // still want the menu to show instead of a single action button
  showRowMenuForSingleRowActions?: boolean
  maxRowMenuHeight?: number
}

export default function GridRowMenu<T>({
  item,
  rowMenuItems,
  rowMenuDisabled,
  rowMenuOffset = {},
  showRowMenuForSingleRowActions = false,
  maxRowMenuHeight,
}: GridRowMenuProps<T>) {
  const filteredRowMenuItems = rowMenuItems.filter((rowItem) => {
    if (isGridRowMenuHeader(rowItem)) return true
    if (rowItem?.hideIfDisabled) {
      return !rowItem?.getIsDisabled(item)
    }
    return true
  })

  const hasHeaders = useMemo(
    () => !!filteredRowMenuItems.find((i) => isGridRowMenuHeader(i)),
    [filteredRowMenuItems],
  )

  const classes = useStyles({ maxRowMenuHeight, hasHeaders })
  const [isOpen, toggleIsOpen] = useToggler()
  const handleMenuClick = useCallback((e) => {
    toggleIsOpen()
  }, [])

  if (rowMenuDisabled || !filteredRowMenuItems.length) {
    return null
  }

  if (
    !showRowMenuForSingleRowActions &&
    filteredRowMenuItems.length === 1 &&
    !isGridRowMenuHeader(filteredRowMenuItems[0])
  ) {
    const [{ RowMenuButton, icon, label, getIsDisabled, triggerAction }] = filteredRowMenuItems
    return (
      <div className={clsx('rowMenu', classes.gridRowMenu)}>
        {label ? (
          <RowMenuButton
            disabled={getIsDisabled(item)}
            icon={icon}
            onClick={() => triggerAction(item)}
          >
            {label}
          </RowMenuButton>
        ) : (
          <FontAwesomeIcon disabled={getIsDisabled(item)} onClick={() => triggerAction(item)}>
            {icon}
          </FontAwesomeIcon>
        )}
      </div>
    )
  }

  return (
    <Menu
      align={middleLeft.align}
      offset={{
        ...middleLeft.offset,
        ...rowMenuOffset,
      }}
      origin="top left"
      onClick={handleMenuClick}
      className={clsx('rowMenu', classes.gridRowMenu)}
      anchor={<FontAwesomeIcon>ellipsis-vertical</FontAwesomeIcon>}
      open={isOpen}
      onClose={toggleIsOpen}
    >
      {filteredRowMenuItems.map((menuItem, idx) => {
        if (isGridRowMenuHeader(menuItem)) {
          return (
            <>
              {idx !== 0 && <hr className={classes.divider} />}
              <div className={classes.header}>
                {menuItem?.title && <Text variant="caption2">{menuItem.title}</Text>}
              </div>
            </>
          )
        }
        return (
          <MenuItem
            key={menuItem?.key}
            readonly={menuItem?.getIsDisabled(item)}
            icon={menuItem?.icon}
            onClick={() => menuItem?.triggerAction(item)}
            className={classes.menuItem}
          >
            {menuItem?.label}
          </MenuItem>
        )
      })}
    </Menu>
  )
}

interface StyleProps extends Partial<GridRowMenuProps<any>> {
  hasHeaders?: boolean
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  gridRowMenu: {
    cursor: 'pointer',
    '& > i': {
      fontWeight: 'bold',
    },
    textAlign: 'center',
    lineHeight: '56px',
    // visibility: 'hidden',
    position: 'absolute',
    marginTop: 1,
    inset: '0 0 0 auto',
    padding: theme.spacing(0, 1),
    minWidth: 20,
    backgroundColor: 'inherit',
    transition: 'visibility 150ms ease',
    '& .menu-popover': {
      minWidth: 60,
      maxHeight: ({ maxRowMenuHeight }) => (maxRowMenuHeight ? maxRowMenuHeight : undefined),
      overflow: ({ maxRowMenuHeight }) => (maxRowMenuHeight ? 'auto' : undefined),
      paddingBottom: '8px',
    },
  },
  warning: {
    color: theme.palette.red[500],
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    cursor: 'default',
    minWidth: 'max-content',
    padding: '8px 16px',
  },
  divider: {
    height: 1,
    background: theme.palette.grey[200],
    border: 0,
    width: '100%',
    margin: '8px 0',
  },
  menuItem: {
    minHeight: ({ hasHeaders }) => (hasHeaders ? 'unset' : '48px'),
    marginLeft: '8px',
  },
}))
