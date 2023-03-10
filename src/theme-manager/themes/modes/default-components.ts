import colors from '../base/colors'
import { hexToRgbaCss } from '../../../utils/colorHelpers'

export const defaultAlertComponentStyles = {
  primary: {
    background: hexToRgbaCss(colors.blue[500], 0.05),
    border: colors.blue[500],
  },
  success: {
    background: hexToRgbaCss(colors.green[500], 0.05),
    border: colors.green[500],
  },
  warning: {
    background: hexToRgbaCss(colors.orange[500], 0.05),
    border: colors.orange[500],
  },
  error: {
    background: hexToRgbaCss(colors.red[500], 0.05),
    border: colors.red[500],
  },
}

export const defaultGraphComponentStyles = {
  unknown: colors.grey[300],

  primary: colors.blue[500],
  fadedPrimary: colors.blue[300],

  success: colors.green[500],
  fadedSuccess: colors.green[300],

  warning: colors.yellow[500],
  fadedWarning: colors.yellow[200],

  danger: colors.orange[500],
  fadedDanger: colors.yellow[300],

  error: colors.red[500],
  fadedError: colors.red[300],

  aws: colors.aws[500],
  azure: colors.azure[500],
  google: colors.googleYellow[500],
}

export const defaultCodeComponentStyles = {
  background: hexToRgbaCss(colors.codeBlue[500], 0.1),
  text: colors.codeBlue[500],
}
