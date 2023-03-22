import React from 'react'
import { withStyles } from '@material-ui/styles'
import Button from '../../elements/button'
import generateTestId from '../../utils/test-helpers'

const styles = (theme) => ({
  baseButton: {
    // margin: theme.spacing(1),
    // borderRadius: 2,
    // textTransform: 'none',
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
})

const PrevButton = ({ children, classes, disabled, ...rest }) => (
  <Button
    {...rest}
    data-testid={generateTestId('arrow', 'previous')}
    className={classes.baseButton}
    disabled={disabled}
    variant="secondary"
    icon="arrow-left"
  >
    {children || 'Back'}
  </Button>
)

export default withStyles(styles)(PrevButton)
