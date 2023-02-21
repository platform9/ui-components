import { useState, useEffect, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { themeSelector } from './selector'
import Theme from './themes/model'

export const makeStylesWithTheme = (styleCreator) => {
  const useStyles = (props = {}) => {
    const theme = useSelector(themeSelector)
    const styles = styleCreator(theme)
    return makeStyles(styles)(props)
  }
  return useStyles
}

export default makeStylesWithTheme
