import React from 'react'
import Menu from 'src/elements/menu/Menu'
import useToggler from 'src/hooks/useToggler'
import { makeStyles } from '@material-ui/styles'
import Theme from 'src/theme-manager/themes/model'
import Text from 'src/elements/Text'
import Checkbox from 'src/elements/input/Checkbox'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'
import { styled } from '@material-ui/styles'
import { GridManagedColumnsProps } from './hooks/useGridManagedColumns'

const menuOffset = {
  vertical: 0,
  horizontal: -100,
}

const GridColumnsButton = styled(({ className, onClick }) => (
  <Text noWrap onClick={onClick} component="div" className={className}>
    <FontAwesomeIcon>gear</FontAwesomeIcon>
    Customize
  </Text>
))<Theme>(({ theme }) => ({
  ...theme.typography.inputTable,
  display: 'grid',
  gridAutoFlow: 'column',
  cursor: 'pointer',
  alignItems: 'center',
  padding: theme.spacing(1, 2),
  borderRadius: 4,
  gap: 8,
  '&:hover': {
    backgroundColor: theme.components.table.hoverBackground,
  },
}))

export default function GridColumnsPopover({ columnTogglers }: GridManagedColumnsProps) {
  const classes = useStyles({})
  const [isOpen, toggleIsOpen] = useToggler()
  return (
    <Menu
      id="grid-columns-menu"
      origin="top right"
      offset={menuOffset}
      className={classes.menu}
      anchor={<GridColumnsButton onClick={toggleIsOpen} />}
      open={isOpen}
      onClose={toggleIsOpen}
    >
      {columnTogglers.map(({ key, label, visible, disabled, toggleColumn }) => (
        <Checkbox
          key={key}
          label={label}
          disabled={disabled}
          checked={visible}
          onChange={toggleColumn}
        />
      ))}
    </Menu>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
  menu: {
    '& .menu-popover': {
      minWidth: 150,
      padding: '8px',
    },
  },
}))
