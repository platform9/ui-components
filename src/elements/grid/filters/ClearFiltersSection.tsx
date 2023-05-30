import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Button from '../../button/Button'
import Theme from '../../../theme-manager/themes/model'

const useStyles = makeStyles<Theme>((theme) => ({
  clearFilters: {
    background: theme.components.table.hoverBackground,
    padding: 8,
  },
  clearButton: {
    width: '100%',
  },
}))

export default function ClearFiltersSection({ onChange }) {
  const classes = useStyles()

  return (
    <div className={classes.clearFilters}>
      <Button className={classes.clearButton} variant="secondary" onClick={() => onChange([])}>
        Clear Filters
      </Button>
    </div>
  )
}
