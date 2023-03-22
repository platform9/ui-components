import React from 'react'
import { withStyles } from '@material-ui/styles'
import Button from '../../elements/button'
import generateTestId from '../../utils/test-helpers'

const styles = (theme) => ({
  baseButton: {
    // margin: theme.spacing(1),
  },
})

const SubmitButton = ({ children, classes, ...rest }) => (
  <Button
    data-testid={generateTestId(children, 'submitbtn')}
    className={classes.baseButton}
    type="submit"
    {...rest}
  >
    {children || 'Submit'}
  </Button>
)

export default withStyles(styles)(SubmitButton)
