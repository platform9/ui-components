import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Theme from '../../theme-manager/themes/model'
import Text from '../../elements/Text'
import generateTestId from '../../utils/test-helpers'

interface Props {
  value: string
  label: string
  isActive: boolean
  onClick: (value: string) => void
}

export default function TabPreview({ label, value, isActive, onClick }: Props) {
  const classes = useStyles({ isActive })
  return (
    <div className={classes.tabPreview} onClick={() => onClick(value)}>
      <Text
        className={classes.tabText}
        data-testid={generateTestId(label, 'tab')}
        variant="subtitle2"
      >
        {label}
      </Text>
      {isActive && <span className={classes.activeBorder} />}
    </div>
  )
}

interface StyleProps {
  isActive: boolean
}
const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  tabPreview: {
    height: 35,
    display: 'grid',
    gap: 8,
    gridAutoFlow: 'row',
    cursor: 'pointer',
  },
  tabText: {
    padding: '0 16px',
    color: ({ isActive }) => theme.components.tab[isActive ? 'activeText' : 'text'],
    '&:hover': {
      color: theme.components.tab.activeText,
    },
  },
  activeBorder: {
    height: 4,
    display: 'grid',
    borderRadius: 1.5,
    margin: 0,
    padding: 0,
    background: theme.components.tab.activeBackground,
  },
}))
