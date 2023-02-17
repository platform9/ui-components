import { generateTheme } from '../helpers'
import typography from '../base/typography'
import { Components } from '../model'
import colors from '../base/colors'
import {
  defaultAlertComponentStyles,
  defaultGraphComponentStyles,
  defaultCodeComponentStyles,
} from './default-components'

const components: Components = {
  frame: {
    background: colors.grey[800],
    accentBackground: colors.grey[900],
  },
  header: {
    background: 'transparent',
  },
  sidebar: {
    background: colors.grey[800],
    border: colors.grey[700],
    activeBackground: colors.grey[800],
    text: colors.grey[500],
    activeIcon: colors.grey['000'],
    activeText: colors.grey['000'],
    hoverText: colors.grey['000'],
    spinLogoFill: colors.grey['000'],
  },
  scrollbar: {
    track: 'transparent',
    thumb: colors.grey[500],
  },
  breadcrumb: {
    text: colors.grey[300],
    activeText: colors.grey['000'],
    disabledText: colors.grey[500],
    hoverBackground: colors.grey[650],
  },
  tab: {
    text: colors.grey[500],
    activeText: colors.grey[100],
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
    background: colors.grey[650],
    border: colors.grey[600],
    activeBackground: colors.grey[600],
  },
  wizard: {
    step: {
      bubbleBackground: colors.grey[700],
      bubbleActiveBackground: colors.blue[500],
      bubbleText: colors.grey[300],
      bubbleActiveText: colors.grey['000'],
      bubbleLabel: colors.grey[300],
      bubbleActiveLabel: colors.grey['000'],
      bubbleBorder: colors.grey[700],
    },
    multiStep: {
      bubbleBackground: 'transparent',
      bubbleText: colors.grey[200],
      bubbleBorder: colors.grey[600],
    },
  },
  table: {
    background: colors.grey[700],
    hoverBackground: colors.grey[650],
    border: colors.grey[800],
    headColor: colors.grey[200],
    toolbar: colors.grey[700],
    toolbarColor: colors.grey['000'],
    activeToolbar: colors.grey[600],
    activeToolbarColor: colors.grey['000'],
    toolbarPassiveColor: colors.grey[300],
  },
  toggleSwitch: {
    activeHandle: colors.blue[500],
    inactiveHandle: colors.grey[500],
    disabledHandle: colors.grey[500],
    activeTrack: colors.blue[900],
    inactiveTrack: colors.grey[200],
    disabledTrack: colors.grey[600],
    label: colors.grey[100],
    hoverLabel: colors.grey['000'],
    disabledLabel: colors.grey[500],
  },
  checkbox: {
    border: colors.grey[200],
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
    default: colors.grey[200],
    active: colors.grey['000'],
    passive: colors.grey[500],
  },
  iconButton: {
    background: colors.grey[800],
    border: colors.grey[600],
    color: colors.grey[200],
    activeBackground: colors.grey[650],
    activeBorder: colors.grey[600],
    activeColor: colors.grey[300],
    disabledBackground: colors.grey[600],
    disabledBorder: colors.grey[600],
    disabledColor: colors.grey[500],
    badgeColor: colors.red[500],
    badgeTextColor: colors.grey['000'],
  },
  button: {
    primary: {
      background: colors.blue[500],
      border: colors.blue[500],
      color: colors.grey['000'],
      activeBackground: colors.blue[700],
      activeBorder: colors.blue[700],
      activeColor: colors.grey['000'],
      disabledBackground: colors.grey[600],
      disabledBorder: colors.grey[600],
      disabledColor: colors.grey[300],
    },
    secondary: {
      background: colors.grey[700],
      border: colors.grey[600],
      color: colors.grey['000'],
      activeBackground: colors.grey[600],
      activeBorder: colors.grey[600],
      activeColor: colors.grey['000'],
      disabledBackground: colors.grey[700],
      disabledBorder: colors.grey[600],
      disabledColor: colors.grey[500],
    },
    tertiary: {
      background: colors.grey['000'],
      border: colors.grey['000'],
      color: colors.grey[700],
      activeBackground: colors.grey[300],
      activeBorder: colors.grey[300],
      activeColor: colors.grey[800],
      disabledBackground: colors.grey[300],
      disabledBorder: colors.grey[300],
      disabledColor: colors.grey['000'],
    },
    cta: {
      background: colors.pink[300],
      border: colors.pink[300],
      color: colors.grey[200],
      activeBackground: colors.pink[500],
      activeBorder: colors.pink[500],
      activeColor: colors.grey['000'],
      disabledBackground: colors.grey[600],
      disabledBorder: colors.grey[600],
      disabledColor: colors.grey[300],
    },
  },
  input: {
    label: {
      color: colors.grey['000'],
      disabled: colors.grey[500],
      hint: colors.grey[500],
    },
    frame: {
      background: 'transparent',
      disabledBackground: colors.grey[600],
      border: colors.grey[600],
      activeBorder: colors.grey[500],
      color: colors.grey['000'],
      placeholder: colors.grey[300],
      disabledPlaceholder: colors.grey[500],
    },
    error: colors.red[500],
    success: colors.blue[500],
  },
  dropdown: {
    background: colors.grey[700],
    color: colors.grey['000'],
    border: colors.grey[600],
    selectedBackground: colors.grey[800],
    activeBackground: colors.grey[800],
    selectedColor: colors.grey['000'],
    error: colors.red[500],
  },
  card: {
    background: colors.grey[700],
    text: colors.grey[200],
    shadow: colors.grey[100],
    border: colors.grey[800],
    passiveText: colors.grey[500],
    activeBackground: colors.grey[600],
    activeBorder: colors.grey[600],
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
    error: {
      color: colors.red[100],
      background: colors.red[500],
    },
    unknown: {
      color: colors.grey[100],
      background: colors.grey[500],
    },
    danger: {
      color: colors.orange[100],
      background: colors.orange[500],
    },
  },
  graph: {
    stroke: colors.grey[700],
    tray: colors.grey[800],
    default: colors.grey[200],
    ...defaultGraphComponentStyles,
  },
  code: defaultCodeComponentStyles,
  stepper: {
    bubbleBackground: colors.grey[800],
    bubbleActiveBackground: colors.blue[500],
    bubbleText: colors.grey[300],
    bubbleActiveText: colors.grey['000'],
    bubbleBorder: colors.grey[800],
    line: colors.grey[800],
  },
}

const darkTheme = {
  theme: generateTheme({
    palette: { colors, primary: 'blue', secondary: 'pink', type: 'dark', themeKey: 'dark' },
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

export default darkTheme
