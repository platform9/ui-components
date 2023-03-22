"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const colors_1 = __importDefault(require("../base/colors"));
const typography_1 = __importDefault(require("../base/typography"));
const colorHelpers_1 = require("../../../utils/colorHelpers");
const default_components_1 = require("./default-components");
const components = {
    frame: {
        background: colors_1.default.grey[100],
        accentBackground: colors_1.default.grey[50],
    },
    header: {
        background: 'transparent',
    },
    sidebar: {
        background: colors_1.default.grey[100],
        border: colors_1.default.grey[200],
        activeBackground: colors_1.default.grey[100],
        text: colors_1.default.grey[500],
        activeIcon: colors_1.default.blue[500],
        activeText: colors_1.default.grey[700],
        hoverText: colors_1.default.grey[700],
        spinLogoFill: colors_1.default.blue[500],
    },
    scrollbar: {
        track: 'transparent',
        thumb: colors_1.default.grey[300],
    },
    breadcrumb: {
        text: colors_1.default.grey[500],
        activeText: colors_1.default.grey[700],
        disabledText: colors_1.default.grey[300],
        hoverBackground: colors_1.default.grey[150],
    },
    tab: {
        text: colors_1.default.grey[500],
        activeText: colors_1.default.grey[700],
        activeBackground: colors_1.default.blue[500],
        border: colors_1.default.grey[200],
    },
    tooltip: {
        background: colors_1.default.grey[900],
        border: colors_1.default.grey[800],
        text: colors_1.default.grey['000'],
        copyBackground: colors_1.default.grey[600],
    },
    accordion: {
        background: colors_1.default.grey[50],
        border: colors_1.default.grey[200],
        activeBackground: colors_1.default.grey[150],
    },
    wizard: {
        step: {
            bubbleBackground: colors_1.default.grey['000'],
            bubbleActiveBackground: colors_1.default.blue[500],
            bubbleText: colors_1.default.grey[300],
            bubbleActiveText: colors_1.default.grey['000'],
            bubbleLabel: colors_1.default.grey[500],
            bubbleActiveLabel: colors_1.default.grey[700],
            bubbleBorder: colors_1.default.grey[200],
        },
        multiStep: {
            bubbleBackground: colors_1.default.grey[50],
            bubbleText: colors_1.default.grey[600],
            bubbleBorder: colors_1.default.grey[200],
        },
    },
    table: {
        background: colors_1.default.grey['000'],
        hoverBackground: colors_1.default.grey[50],
        border: colors_1.default.grey[200],
        headColor: colors_1.default.grey[600],
        toolbar: colors_1.default.grey['000'],
        toolbarColor: colors_1.default.grey[800],
        activeToolbar: colors_1.default.grey[800],
        activeToolbarColor: colors_1.default.grey['000'],
        toolbarPassiveColor: colors_1.default.grey[300],
    },
    toggleSwitch: {
        activeHandle: colors_1.default.blue[500],
        inactiveHandle: colors_1.default.grey[500],
        disabledHandle: colors_1.default.grey[300],
        activeTrack: colorHelpers_1.hexToRgbaCss(colors_1.default.blue[500], 0.1),
        inactiveTrack: colors_1.default.grey[200],
        disabledTrack: colors_1.default.grey[200],
        label: colors_1.default.grey[700],
        hoverLabel: colors_1.default.grey[800],
        disabledLabel: colors_1.default.grey[300],
    },
    checkbox: {
        border: colors_1.default.blue[500],
        background: 'transparent',
        color: colors_1.default.grey[700],
        selectedBorder: colors_1.default.blue[500],
        selectedBackground: colors_1.default.blue[500],
        selectedColor: colors_1.default.grey['000'],
        hoverBackground: colors_1.default.grey[100],
        disabledBackground: colors_1.default.grey[300],
        disabledBorder: colors_1.default.grey[300],
        disabledColor: colors_1.default.grey[300],
    },
    typography: {
        default: colors_1.default.grey[700],
        active: colors_1.default.grey[900],
        passive: colors_1.default.grey[500],
    },
    iconButton: {
        background: colors_1.default.grey['000'],
        border: colors_1.default.grey[200],
        color: colors_1.default.grey[600],
        activeBackground: colors_1.default.grey[50],
        activeBorder: colors_1.default.grey[200],
        activeColor: colors_1.default.grey[500],
        disabledBackground: colors_1.default.grey[200],
        disabledBorder: colors_1.default.grey[200],
        disabledColor: colors_1.default.grey[300],
        badgeColor: colors_1.default.red[500],
        badgeTextColor: colors_1.default.grey['000'],
    },
    button: {
        primary: {
            background: colors_1.default.blue[500],
            border: colors_1.default.blue[500],
            color: colors_1.default.grey[100],
            activeBackground: colors_1.default.blue[700],
            activeBorder: colors_1.default.blue[700],
            activeColor: colors_1.default.grey['000'],
            disabledBackground: colors_1.default.grey[300],
            disabledBorder: colors_1.default.grey[300],
            disabledColor: colors_1.default.grey['000'],
        },
        secondary: {
            background: colors_1.default.grey['000'],
            border: colors_1.default.grey[200],
            color: colors_1.default.grey[500],
            activeBackground: colors_1.default.grey[200],
            activeBorder: colors_1.default.grey[200],
            activeColor: colors_1.default.grey[600],
            disabledBackground: colors_1.default.grey['000'],
            disabledBorder: colors_1.default.grey[200],
            disabledColor: colors_1.default.grey[300],
        },
        tertiary: {
            background: colors_1.default.grey[600],
            border: colors_1.default.grey[600],
            color: colors_1.default.grey[200],
            activeBackground: colors_1.default.grey[700],
            activeBorder: colors_1.default.grey[700],
            activeColor: colors_1.default.grey['000'],
            disabledBackground: colors_1.default.grey[300],
            disabledBorder: colors_1.default.grey[300],
            disabledColor: colors_1.default.grey['000'],
        },
        cta: {
            background: colors_1.default.pink[300],
            border: colors_1.default.pink[300],
            color: colors_1.default.grey[200],
            activeBackground: colors_1.default.pink[500],
            activeBorder: colors_1.default.pink[500],
            activeColor: colors_1.default.grey['000'],
            disabledBackground: colors_1.default.grey[300],
            disabledBorder: colors_1.default.grey[300],
            disabledColor: colors_1.default.grey['000'],
        },
    },
    input: {
        label: {
            color: colors_1.default.grey[700],
            disabled: colors_1.default.grey[500],
            hint: colors_1.default.grey[300],
        },
        frame: {
            background: colors_1.default.grey['000'],
            disabledBackground: 'transparent',
            border: colors_1.default.grey[200],
            activeBorder: colors_1.default.grey[300],
            color: colors_1.default.grey[700],
            placeholder: colors_1.default.grey[500],
            disabledPlaceholder: colors_1.default.grey[300],
        },
        error: colors_1.default.red[500],
        success: colors_1.default.blue[500],
    },
    dropdown: {
        background: colors_1.default.grey['000'],
        color: colors_1.default.grey[700],
        border: colors_1.default.grey[300],
        selectedBackground: colors_1.default.grey[200],
        activeBackground: colors_1.default.grey[200],
        selectedColor: colors_1.default.grey[700],
        error: colors_1.default.red[500],
    },
    card: {
        background: colors_1.default.grey['000'],
        text: colors_1.default.grey[700],
        shadow: colors_1.default.grey[700],
        border: colors_1.default.grey[200],
        passiveText: colors_1.default.grey[500],
        activeBackground: colors_1.default.blue[100],
        activeBorder: colors_1.default.blue[500],
    },
    selectableCard: {
        background: colors_1.default.grey['000'],
        text: colors_1.default.grey[700],
        shadow: colors_1.default.grey[700],
        border: colors_1.default.grey[200],
        passiveText: colors_1.default.grey[500],
        activeBackground: colors_1.default.blue[500],
        activeBorder: colors_1.default.blue[500],
    },
    alert: default_components_1.defaultAlertComponentStyles,
    badge: {
        default: {
            color: colors_1.default.grey[700],
            background: colors_1.default.grey[150],
        },
        primary: {
            color: colors_1.default.blue[500],
            background: colors_1.default.blue[100],
        },
        secondary: {
            color: colors_1.default.pink[500],
            background: colors_1.default.pink[100],
        },
        success: {
            color: colors_1.default.green[500],
            background: colors_1.default.green[100],
        },
        warning: {
            color: colors_1.default.yellow[700],
            background: colors_1.default.yellow[100],
        },
        unknown: {
            color: colors_1.default.grey[500],
            background: colors_1.default.grey[100],
        },
        danger: {
            color: colors_1.default.orange[500],
            background: colors_1.default.orange[100],
        },
        error: {
            color: colors_1.default.red[500],
            background: colors_1.default.red[100],
        },
    },
    graph: Object.assign({ stroke: colors_1.default.grey['000'], tray: colors_1.default.grey[100], default: colors_1.default.grey[700] }, default_components_1.defaultGraphComponentStyles),
    code: default_components_1.defaultCodeComponentStyles,
    stepper: {
        bubbleBackground: colors_1.default.grey[100],
        bubbleActiveBackground: colors_1.default.blue[500],
        bubbleText: colors_1.default.grey[300],
        bubbleActiveText: colors_1.default.grey['000'],
        bubbleBorder: colors_1.default.grey[100],
        line: colors_1.default.grey[100],
    },
};
const serenityLightTheme = {
    theme: helpers_1.generateTheme({
        palette: { colors: colors_1.default, primary: 'blue', secondary: 'pink', type: 'light', themeKey: 'light' },
        typography: {
            fontFamily: '"Eina04"',
            fontSize: 14,
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 500,
            typography: typography_1.default,
        },
    }),
    components,
};
exports.default = serenityLightTheme;
//# sourceMappingURL=light.js.map