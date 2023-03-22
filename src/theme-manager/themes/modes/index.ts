import defaultTheme from './default'
import lightTheme from './light'
import darkTheme from './dark'
import ultraDarkTheme from './ultraDark'

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
