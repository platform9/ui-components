import { mergeDeepRight, mergeRight } from 'ramda'
import { generatePf9ComponentColors } from './helpers'
import colors from './themes/base/colors'
import typography from './themes/base/typography'
import { generateTheme, ThemeColors } from './themes/helpers'
import { Components, Typography } from './themes/model'

type ComponentsStyleGenerator = (colors: ThemeColors) => CustomComponentStyles

interface CustomComponentStyles {
  [componentName: string]: any
}

interface ColorPaletteOptions<T> {
  primary: keyof T
  secondary: keyof T
  type: 'light' | 'dark'
  themeKey: 'default' | 'light' | 'dark' | 'ultra-dark' | 'custom'
}

const defaultColorPaletteOptions = {
  primary: 'blue',
  secondary: 'pink',
  themeKey: 'default' as const,
  type: 'light' as const,
}

interface TypographyOptions {
  fontFamily?: string
  fontSize?: number
  fontWeightLight?: number
  fontWeightRegular?: number
  fontWeightMedium?: number
}

const defaultTypographyOptions = {
  fontFamily: '"Eina04"',
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
}

export default class CustomThemeHelper {
  private colorPaletteOptions: ColorPaletteOptions<ThemeColors> = defaultColorPaletteOptions
  private typographyOptions: TypographyOptions = defaultTypographyOptions

  private colorsDefinition: ThemeColors
  private typographyDefinition: Typography
  private components: Components

  constructor(
    colorsDefinition: ThemeColors = colors,
    typographyDefinition: Typography = typography,
  ) {
    this.colorsDefinition = mergeRight(colors, colorsDefinition)
    this.typographyDefinition = mergeRight(typography, typographyDefinition)
    this.components = generatePf9ComponentColors(this.colorsDefinition)
  }

  setColorPaletteOptions({
    primary = defaultColorPaletteOptions.primary,
    secondary = defaultColorPaletteOptions.secondary,
    type = defaultColorPaletteOptions.type,
    themeKey = defaultColorPaletteOptions.themeKey,
  }) {
    this.colorPaletteOptions = mergeDeepRight(this.colorPaletteOptions, {
      primary,
      secondary,
      type,
      themeKey,
    })
  }

  setTypography({
    fontFamily = defaultTypographyOptions.fontFamily,
    fontSize = defaultTypographyOptions.fontSize,
    fontWeightLight = defaultTypographyOptions.fontWeightLight,
    fontWeightRegular = defaultTypographyOptions.fontWeightRegular,
    fontWeightMedium = defaultTypographyOptions.fontWeightMedium,
  }) {
    this.typographyOptions = {
      fontFamily,
      fontSize,
      fontWeightLight,
      fontWeightRegular,
      fontWeightMedium,
    }
  }

  setComponentsTheme(componentsStyleGenerator: ComponentsStyleGenerator) {
    this.components = mergeDeepRight(
      this.components,
      componentsStyleGenerator(this.colorsDefinition),
    )
  }

  generateCustomTheme() {
    return {
      theme: generateTheme({
        palette: { colors: this.colorsDefinition, ...this.colorPaletteOptions },
        typography: { typography: this.typographyDefinition, ...this.typographyOptions },
      }),
      components: this.components,
    }
  }
}
