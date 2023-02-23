import { makeStyles } from '@material-ui/core/styles'
import Theme from './themes/model'
import store from 'src/store'

type StyleCreator = (theme: Theme) => Styles

interface Styles {
  [classNames: string]: Style
}

interface Style {
  [cssProperty: string]: string | number | CssPropertyGeneratorFn
}

type CssPropertyGeneratorFn = (props: Props) => string | number

interface Props {
  [key: string]: any
}

export const makeStylesWithTheme = (styleCreator: StyleCreator) => {
  const { theme } = store.getState()
  const customTheme = { ...theme.theme, components: theme.components }
  const styles = styleCreator(customTheme)
  return makeStyles<Theme>(styles)
}

export default makeStylesWithTheme
