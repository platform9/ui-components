import defaultTheme from 'src/theme-manager/themes/modes/default'
import lightTheme from 'src/theme-manager/themes/modes/light'
import darkTheme from 'src/theme-manager/themes/modes/dark'
import ultraDarkTheme from 'src/theme-manager/themes/modes/ultraDark'

export { default } from './default'

export enum ThemeLabels {
  default = 'Default',
  light = 'Light',
  dark = 'Dark',
  'ultra-dark' = 'Ultra Dark',
}

export const themesByKey: Record<keyof typeof ThemeLabels, typeof defaultTheme> = {
  light: lightTheme,
  default: defaultTheme,
  dark: darkTheme,
  'ultra-dark': ultraDarkTheme,
}
