import makeStyles from '@material-ui/styles/makeStyles'
import { useSelector } from 'react-redux'
import { themeSelector } from './selector'

import Theme from './themes/model'

type StyleCreator = (theme: Theme) => StylesObject

interface StylesObject {
  [key: string]: any
}

interface StyleProps {
  [key: string]: string | boolean | number
}

const useStylesWithTheme = (styleCreator: StyleCreator, props = {} as StyleProps) => {
  const theme = useSelector(themeSelector)
  const styles = styleCreator(theme)
  const useStyles = makeStyles(styles)
  return useStyles(props)
}

export default useStylesWithTheme
