import { create } from '@storybook/theming'
import colors from '../src/theme-manager/themes/base/colors'

export default create({
  base: 'light',

  colorPrimary: colors.blue[300],
  colorSecondary: colors.blue[700],

  // UI
  appBg: colors.grey[800],
  appContentBg: colors.grey[100],
  appBorderColor: colors.grey[100],
  appBorderRadius: 6,

  // Typography
  fontBase: 'Eina04-SemiBold',
  fontCode: 'monospace',

  // Text colors
  textColor: colors.grey[700],
  textInverseColor: colors.grey[100],
  textMutedColor: colors.grey[300],

  // Toolbar default and active colors
  barTextColor: colors.grey[800],
  barSelectedColor: colors.blue[700],
  barBg: colors.grey[100],

  // Form colors
  inputBg: colors.grey['000'],
  inputBorder: colors.grey[800],
  inputTextColor: colors.grey[800],
  inputBorderRadius: 4,

  //   brandTitle: 'Platform9 Components',
  //   brandUrl: 'https://platform9.com',
  //   // TODO: find a better image location
  //   brandImage: 'https://du-ui-dev-decco.platform9.horse/ui/images/primary-logo.png',
})
