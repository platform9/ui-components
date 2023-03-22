import React, { PropsWithChildren } from 'react'
import { makeStyles } from '@material-ui/styles'
import Theme from '../../theme-manager/themes/model'
import Checkbox from '../../elements/input/Checkbox'
import generateTestId from '../../utils/test-helpers'

interface DropdownItemProps {
  isSelected?: boolean
  showCheckbox?: boolean
  onClick: () => void
  disabled?: boolean
  disableCheckbox?: boolean
}

const useStyles = makeStyles<Theme, DropdownItemProps>((theme) => ({
  dropdownItem: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    width: '100%',
    cursor: ({ disabled }) => (disabled ? 'not-allowed' : 'pointer'),
    border: 'none',
    padding: theme.spacing(1, 1),
    '&:hover': {
      background: theme.components.dropdown.selectedBackground,
    },
    '& > .checkbox': {
      marginRight: 8,
    },
    '& > span': {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
    background: ({ isSelected, showCheckbox }) =>
      isSelected && !showCheckbox ? theme.components.dropdown.selectedBackground : null,
  },
}))

export default React.forwardRef<HTMLLIElement, PropsWithChildren<DropdownItemProps>>(
  (props, ref) => {
    const classes = useStyles(props)
    const { children, isSelected, showCheckbox, disableCheckbox, ...rest } = props
    return (
      <li
        data-testid={generateTestId(classes.id, 'cluster', 'value')}
        ref={ref}
        className={classes.dropdownItem}
        {...rest}
      >
        {showCheckbox ? <Checkbox disabled={disableCheckbox} checked={isSelected} /> : null}
        {children}
      </li>
    )
  },
)
