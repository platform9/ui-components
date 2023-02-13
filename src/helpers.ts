import { generateTheme, IPalette, ITypography, ThemeColors } from './theme-manager/themes/helpers'
import { Components, Typography } from './theme-manager/themes/model'

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
