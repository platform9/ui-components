import React from 'react'
import Theme from '../../theme-manager/themes/model'
import { makeStyles } from '@material-ui/styles'
import Button from '../../elements/button'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // backgroundColor: '#f3f3f4',
    minHeight: 36,
    height: 36,
    borderRadius: 4,
    margin: theme.spacing(0, 1),
    '&:hover': {
      // backgroundColor: '#FFFFFF',
    },
  },
}))

const BannerButton = ({ children, ...rest }) => {
  const classes = useStyles({})
  return (
    <Button className={classes.root} {...rest}>
      {children}
    </Button>
  )
}

export default BannerButton
