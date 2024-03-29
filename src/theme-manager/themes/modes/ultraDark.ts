import { generateTheme } from '../helpers'
import colors from '../base/colors'
import typography from '../base/typography'
import { Components } from '../model'
import {
  defaultAlertComponentStyles,
  defaultGraphComponentStyles,
  defaultCodeComponentStyles,
} from './default-components'

const components: Components = {
  frame: {
    background: colors.grey[900],
    accentBackground: colors.grey[900],
  },
  header: {
    background: 'transparent',
  },
  sidebar: {
    background: colors.grey[900],
    border: colors.grey[800],
    activeBackground: colors.grey[800],
    text: colors.grey[500],
    activeIcon: colors.grey[100],
    activeText: colors.grey[100],
    hoverText: colors.grey[100],
    spinLogoFill: colors.grey[100],
    disabledText: colors.grey[600],
  },
  scrollbar: {
    track: 'transparent',
    thumb: colors.grey[700],
  },
  breadcrumb: {
    text: colors.grey[300],
    activeText: colors.grey['000'],
    disabledText: colors.grey[600],
    hoverBackground: colors.grey[750],
  },
  tab: {
    text: colors.grey[500],
    activeText: colors.grey[200],
    activeBackground: colors.blue[500],
    border: colors.grey[700],
  },
  tooltip: {
    background: colors.grey['000'],
    border: colors.grey[200],
    text: colors.grey[900],
    copyBackground: colors.grey[300],
  },
  accordion: {
    background: colors.grey[750],
    border: colors.grey[650],
    activeBackground: colors.grey[700],
  },
  wizard: {
    step: {
      bubbleBackground: colors.grey[800],
      bubbleActiveBackground: colors.blue[500],
      bubbleText: colors.grey[500],
      bubbleActiveText: colors.grey[100],
      bubbleLabel: colors.grey[500],
      bubbleActiveLabel: colors.grey[100],
      bubbleBorder: colors.grey[800],
    },
    multiStep: {
      bubbleBackground: 'transparent',
      bubbleText: colors.grey[300],
      bubbleBorder: colors.grey[700],
    },
  },
  table: {
    background: colors.grey[800],
    hoverBackground: colors.grey[750],
    border: colors.grey[900],
    headColor: colors.grey[300],
    toolbar: colors.grey[800],
    toolbarColor: colors.grey['000'],
    activeToolbar: colors.grey[700],
    activeToolbarColor: colors.grey['000'],
    toolbarPassiveColor: colors.grey[300],
  },
  toggleSwitch: {
    activeHandle: colors.blue[500],
    inactiveHandle: colors.grey[500],
    disabledHandle: colors.grey[500],
    activeTrack: colors.blue[900],
    inactiveTrack: colors.grey[200],
    disabledTrack: colors.grey[700],
    label: colors.grey[100],
    hoverLabel: colors.grey['000'],
    disabledLabel: colors.grey[700],
  },
  checkbox: {
    border: colors.grey[500],
    background: 'transparent',
    color: colors.grey[100],
    selectedBorder: colors.blue[500],
    selectedBackground: colors.blue[500],
    selectedColor: colors.grey['000'],
    hoverBackground: colors.grey[700],
    disabledBackground: colors.grey[500],
    disabledBorder: colors.grey[500],
    disabledColor: colors.grey[500],
  },
  typography: {
    default: colors.grey[300],
    active: colors.grey[100],
    passive: colors.grey[500],
  },
  iconButton: {
    background: colors.grey[900],
    border: colors.grey[700],
    color: colors.grey[300],
    activeBackground: colors.grey[750],
    activeBorder: colors.grey[700],
    activeColor: colors.grey[200],
    disabledBackground: colors.grey[700],
    disabledBorder: colors.grey[700],
    disabledColor: colors.grey[600],
    badgeColor: colors.red[500],
    badgeTextColor: colors.grey['000'],
  },
  button: {
    primary: {
      background: colors.blue[500],
      border: colors.blue[500],
      color: colors.grey[100],
      activeBackground: colors.blue[700],
      activeBorder: colors.blue[700],
      activeColor: colors.grey[100],
      disabledBackground: colors.grey[700],
      disabledBorder: colors.grey[700],
      disabledColor: colors.grey[500],
    },
    secondary: {
      background: colors.grey[800],
      border: colors.grey[700],
      color: colors.grey[100],
      activeBackground: colors.grey[800],
      activeBorder: colors.grey[600],
      activeColor: colors.grey[100],
      disabledBackground: colors.grey[800],
      disabledBorder: colors.grey[700],
      disabledColor: colors.grey[500],
    },
    tertiary: {
      background: colors.grey[200],
      border: colors.grey[200],
      color: colors.grey[800],
      activeBackground: colors.grey['000'],
      activeBorder: colors.grey['000'],
      activeColor: colors.grey[800],
      disabledBackground: colors.grey[700],
      disabledBorder: colors.grey[700],
      disabledColor: colors.grey[500],
    },
    cta: {
      background: colors.pink[300],
      border: colors.pink[300],
      color: colors.grey[200],
      activeBackground: colors.pink[300],
      activeBorder: colors.pink[300],
      activeColor: colors.grey['000'],
      disabledBackground: colors.grey[700],
      disabledBorder: colors.grey[700],
      disabledColor: colors.grey[500],
    },
  },
  input: {
    label: {
      color: colors.grey[100],
      disabled: colors.grey[600],
      hint: colors.grey[500],
    },
    frame: {
      background: 'transparent',
      disabledBackground: colors.grey[700],
      border: colors.grey[700],
      activeBorder: colors.grey[200],
      color: colors.grey[100],
      placeholder: colors.grey[300],
      disabledPlaceholder: colors.grey[600],
    },
    error: colors.red[500],
    success: colors.blue[500],
  },
  dropdown: {
    background: colors.grey[800],
    color: colors.grey[100],
    border: colors.grey[700],
    selectedBackground: colors.grey[900],
    activeBackground: colors.grey[900],
    selectedColor: colors.grey[100],
    error: colors.red[500],
  },
  card: {
    background: colors.grey[800],
    text: colors.grey[300],
    shadow: colors.grey[100],
    border: colors.grey[900],
    passiveText: colors.grey[500],
    activeBackground: colors.grey[700],
    activeBorder: colors.grey[700],
  },
  selectableCard: {
    background: 'transparent',
    text: colors.grey[200],
    shadow: colors.grey[100],
    border: colors.grey[600],
    passiveText: colors.grey[500],
    activeBackground: colors.blue[500],
    activeBorder: colors.blue[500],
  },
  alert: defaultAlertComponentStyles,
  badge: {
    default: {
      color: colors.grey[100],
      background: colors.grey[600],
    },
    primary: {
      color: colors.blue[100],
      background: colors.blue[500],
    },
    secondary: {
      color: colors.pink[100],
      background: colors.pink[500],
    },
    success: {
      color: colors.green[100],
      background: colors.green[500],
    },
    warning: {
      color: colors.yellow[100],
      background: colors.yellow[700],
    },
    unknown: {
      color: colors.grey[100],
      background: colors.grey[500],
    },
    danger: {
      color: colors.orange[100],
      background: colors.orange[500],
    },
    error: {
      color: colors.red[100],
      background: colors.red[500],
    },
  },
  graph: {
    stroke: colors.grey[800],
    tray: colors.grey[900],
    default: colors.grey[300],
    ...defaultGraphComponentStyles,
  },
  code: defaultCodeComponentStyles,
  stepper: {
    bubbleBackground: colors.grey[900],
    bubbleActiveBackground: colors.blue[500],
    bubbleText: colors.grey[300],
    bubbleActiveText: colors.grey[100],
    bubbleBorder: colors.grey[900],
    line: colors.grey[900],
  },
}

const ultraDarkTheme = {
  theme: generateTheme({
    palette: { colors, primary: 'blue', secondary: 'pink', type: 'dark', themeKey: 'ultra-dark' },
    typography: {
      fontFamily: '"Eina04"',
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      typography,
    },
  }),
  components,
}

export default ultraDarkTheme
