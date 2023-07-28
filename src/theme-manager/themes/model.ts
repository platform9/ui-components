import { Theme as DefaultTheme } from '@material-ui/core'

interface AppTheme {
  components: Components
  palette: Palette
  typography: Typography
}
export interface Components {
  frame: Frame
  header: Header
  sidebar: Sidebar
  scrollbar: Scrollbar
  breadcrumb: Breadcrumb
  tab: Tab
  tooltip: TooltipComponent
  wizard: Wizard
  table: Table
  toggleSwitch: ToggleSwitch
  checkbox: Checkbox
  typography: TextTypography
  iconButton: IconButton
  button: Button
  input: Input
  dropdown: Dropdown
  card: Card
  selectableCard: Card
  alert: Alert
  accordion: Accordion
  badge: Badge
  graph: Graph
  code: Code
  stepper: Stepper
}

interface Palette {
  common: Common
  type: string
  themeKey: string
  primary: Record<string, string>
  secondary: Record<string, string>
  grey: Record<string, string>
  blue: Record<string, string>
  pink: Record<string, string>
  yellow: Record<string, string>
  k8sBlue: Record<string, string>
  green: Record<string, string>
  red: Record<string, string>
  orange: Record<string, string>
  aws: Record<string, string>
  azure: Record<string, string>
}

interface Card {
  background: string
  text: string
  shadow: string
  border: string
  passiveText: string
  activeBackground: string
  activeBorder: string
}

interface Alert {
  primary: AlertVariant
  success: AlertVariant
  warning: AlertVariant
  error: AlertVariant
}
interface AlertVariant {
  background: string
  border: string
}
interface Accordion {
  background: string
  activeBackground: string
  border: string
}

interface Badge {
  default: BadgeSwatch
  primary: BadgeSwatch
  secondary: BadgeSwatch
  success: BadgeSwatch
  warning: BadgeSwatch
  unknown: BadgeSwatch
  danger: BadgeSwatch
  error: BadgeSwatch
}

interface BadgeSwatch {
  color: string
  background: string
}

interface Graph {
  stroke: string
  tray: string
  default: string
  unknown: string

  primary: string
  fadedPrimary: string
  success: string
  fadedSuccess: string
  warning: string
  fadedWarning: string
  danger: string
  fadedDanger: string
  error: string
  fadedError: string

  aws: string
  azure: string
  google: string
}

interface Code {
  background: string
  text: string
}

interface Stepper {
  bubbleBackground: string
  bubbleActiveBackground: string
  bubbleText: string
  bubbleActiveText: string
  bubbleBorder: string
  line: string
}

interface Common {
  black: string
  white: string
}

interface Breadcrumb {
  text: string
  activeText: string
  disabledText: string
  hoverBackground: string
}

interface Tab {
  text: string
  activeText: string
  activeBackground: string
  border: string
}

interface Table {
  background: string
  hoverBackground: string
  border: string
  headColor: string
  toolbar: string
  toolbarColor: string
  activeToolbar: string
  activeToolbarColor: string
  toolbarPassiveColor: string
}

interface ToggleSwitch {
  activeHandle: string
  inactiveHandle: string
  disabledHandle: string
  activeTrack: string
  inactiveTrack: string
  disabledTrack: string
  label: string
  hoverLabel: string
  disabledLabel: string
}

interface Checkbox {
  border: string
  background: string
  color: string
  selectedBorder: string
  selectedBackground: string
  selectedColor: string
  hoverBackground: string
  disabledBackground: string
  disabledBorder: string
  disabledColor: string
}

interface TextTypography {
  default: string
  active: string
  passive: string
}

interface Button {
  primary: ButtonTypes
  secondary: ButtonTypes
  tertiary: ButtonTypes
  cta: ButtonTypes
}

interface ButtonTypes {
  background: string
  border: string
  color: string
  activeBackground: string
  activeBorder: string
  activeColor: string
  disabledBackground: string
  disabledBorder: string
  disabledColor: string
}

interface IconButton {
  background: string
  border: string
  color: string
  activeBackground: string
  activeBorder: string
  activeColor: string
  disabledBackground: string
  disabledBorder: string
  disabledColor: string
  badgeColor: string
  badgeTextColor: string
}

interface Input {
  label: {
    color: string
    disabled: string
    hint: string
  }
  frame: {
    background: string
    disabledBackground: string
    border: string
    activeBorder: string
    color: string
    placeholder: string
    disabledPlaceholder: string
  }
  error: string
  success: string
}

interface Dropdown {
  background: string
  color: string
  border: string
  selectedBackground: string
  activeBackground: string
  selectedColor: string
  error: string
}

interface Frame {
  background: string
  accentBackground: string
}
interface Header {
  background: string
}

interface Sidebar {
  disabledText?: string
  background: string
  border: string
  activeBackground: string
  text: string
  activeIcon: string
  activeText: string
  hoverText: string
  spinLogoFill: string
}

interface Scrollbar {
  track: string
  thumb: string
}

interface TooltipComponent {
  background: string
  border: string
  text: string
  copyBackground: string
}
interface Wizard {
  step: IWizardStep
  multiStep: IWizardMultiStep
}

interface IWizardStep {
  bubbleBackground: string
  bubbleActiveBackground: string
  bubbleText: string
  bubbleActiveText: string
  bubbleLabel: string
  bubbleActiveLabel: string
  bubbleBorder: string
}
interface IWizardMultiStep {
  bubbleBackground: string
  bubbleText: string
  bubbleBorder: string
}

export interface Typography {
  h1: TypographyModel
  h2: TypographyModel
  h3: TypographyModel
  subtitle1: TypographyModel
  inputPlaceholder: TypographyModel
  subtitle2: TypographyModel
  nav: TypographyModel
  buttonPrimary: TypographyModel
  body1: TypographyModel
  h4: TypographyModel
  caption1: TypographyModel
  buttonSecondary: TypographyModel
  inputTable: TypographyModel
  body2: TypographyModel
  sidenav: TypographyModel
  inputLabel: TypographyModel
  caption2: TypographyModel
  caption4: TypographyModel
  caption3: TypographyModel
}

export interface TypographyModel {
  fontFamily: string
  fontSize: string
  fontWeight: any
  fontStretch: string
  fontStyle: string
  lineHeight: string
  letterSpacing: string
  textAlign?: any
}

type Theme = DefaultTheme & AppTheme
export default Theme
