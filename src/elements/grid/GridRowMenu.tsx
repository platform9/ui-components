import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import React, { useCallback, useMemo } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'
import {
  GridRowMenuItemsProps,
  GridRowMenuOffset,
  isGridRowMenuHeader,
} from '../../elements/grid/hooks/useGridRowMenu'
import { middleLeft } from '../../elements/menu/defaults'
import MenuItem from '../../elements/menu/MenuItem'
import PortalMenu from '../../elements/menu/PortalMenu'
import Text from '../../elements/Text'
import useToggler from '../../hooks/useToggler'
import Theme from '../../theme-manager/themes/model'

interface GridRowMenuProps<T> extends GridRowMenuItemsProps<T> {
  item: T
  rowMenuOffset?: GridRowMenuOffset
  // Default behavior is that when there is only one row action for an item,
  // display just a button instead of a menu/dropdown. Set this to false if you
  // still want the menu to show instead of a single action button
  showRowMenuForSingleRowActions?: boolean
  maxRowMenuHeight?: number
  expandRow?: () => void
  toggleRow?: () => void
}

export default function GridRowMenu<T>({
  item,
  rowMenuItems,
  rowMenuDisabled,
  rowMenuOffset = {},
  showRowMenuForSingleRowActions = false,
  maxRowMenuHeight,
  expandRow,
  toggleRow,
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
    // Workaround for clicking anchor causing row to be toggled
    // Retoggle the row back if clicking on anchor
    toggleRow && toggleRow()
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
            onClick={() => triggerAction(item, expandRow)}
          >
            {label}
          </RowMenuButton>
        ) : (
          <FontAwesomeIcon
            disabled={getIsDisabled(item)}
            onClick={() => triggerAction(item, expandRow)}
          >
            {icon}
          </FontAwesomeIcon>
        )}
      </div>
    )
  }
  return (
    <PortalMenu
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
              {menuItem?.title && (
                <div className={classes.header}>
                  <Text variant="caption2">{menuItem.title}</Text>
                </div>
              )}
            </>
          )
        }
        return (
          <MenuItem
            key={menuItem?.key}
            readonly={menuItem?.getIsDisabled(item)}
            icon={menuItem?.icon}
            onClick={() => menuItem?.triggerAction(item, expandRow)}
            className={classes.menuItem}
          >
            {menuItem?.label}
          </MenuItem>
        )
      })}
    </PortalMenu>
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
    position: 'relative',
    marginTop: 1,
    // inset: '0 0 0 auto',
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
    // If we want to add spacing back in the future for menu subsections, we should use paddingLeft
    // marginLeft: '8px',
  },
}))
