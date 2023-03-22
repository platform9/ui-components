import React from 'react'
import { withStyles } from '@material-ui/styles'
import Button from '../../elements/button'
import generateTestId from '../../utils/test-helpers'

const styles = (theme) => ({
  baseButton: {
    // margin: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
})

const NextButton = ({ children, classes, showForward = true, ...rest }) => {
  return (
    <Button
      data-testid={generateTestId('arrow', 'next')}
      className={classes.baseButton}
      {...rest}
      rightIcon={showForward ? 'arrow-right' : undefined}
      variant="tertiary"
      size="medium"
    >
      {children || 'Next'}
    </Button>
  )
}

export default withStyles(styles)(NextButton)
