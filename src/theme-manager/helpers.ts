import { generateTheme, IPalette, ITypography, ThemeColors } from './themes/helpers'
import { Components, Typography } from './themes/model'

export const createTheme = (
  palette: IPalette<ThemeColors>,
  typography: ITypography<Typography>,
  components: Components,
) => {
  return {
    theme: generateTheme({
      palette,
      typography,
    }),
    components,
  }
}
