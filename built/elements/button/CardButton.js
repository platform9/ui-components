"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const styles_1 = require("@material-ui/styles");
const Text_1 = __importDefault(require("../../elements/Text"));
const FontAwesomeIcon_1 = __importDefault(require("../../components/FontAwesomeIcon"));
const colorHelpers_1 = require("../../utils/colorHelpers");
const CardButton = (_a) => {
    var { onClick, title, message, icon = undefined, disabled = false, className = undefined } = _a, props = __rest(_a, ["onClick", "title", "message", "icon", "disabled", "className"]);
    const classes = useStyles({});
    return (react_1.default.createElement("button", Object.assign({ className: clsx_1.default(classes.button, className, { disabled }), onClick: disabled ? undefined : onClick }, props),
        react_1.default.createElement(FontAwesomeIcon_1.default, { className: classes.icon, solid: true }, icon),
        react_1.default.createElement(Text_1.default, { variant: "subtitle2", className: classes.title }, title),
        react_1.default.createElement(Text_1.default, { variant: "body1", className: classes.body }, message)));
};
const useStyles = styles_1.makeStyles((theme) => ({
    button: {
        boxSizing: 'border-box',
        padding: '16px 16px 16px 24px',
        textAlign: 'start',
        display: 'grid',
        alignItems: 'center',
        justifyItems: 'start',
        gridTemplateAreas: `
      "card-button-icon card-button-title"
      "card-button-icon card-button-body"
    `,
        gridTemplateColumns: 'max-content 1fr',
        columnGap: 16,
        borderRadius: 4,
        border: `1px solid ${theme.components.iconButton.border}`,
        backgroundColor: theme.components.iconButton.background,
        // color: theme.components.iconButton.color,
        cursor: 'pointer',
        transition: 'all .2s ease',
        '&:hover': {
            backgroundColor: theme.components.iconButton.activeBackground,
            borderColor: theme.components.iconButton.activeBorder,
        },
        '&.disabled': {
            cursor: 'not-allowed',
            backgroundColor: theme.components.iconButton.disabledBackground,
            borderColor: theme.components.iconButton.disabledBorder,
        },
    },
    icon: {
        fontSize: 18,
        width: 32,
        height: 32,
        borderRadius: '100%',
        display: 'grid',
        gridArea: 'card-button-icon',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorHelpers_1.hexToRgbaCss(theme.components.button.primary.background, 0.1),
        color: theme.components.button.primary.background,
    },
    title: {
        gridArea: 'card-button-title',
    },
    body: {
        gridArea: 'card-button-body',
        color: theme.components.typography.passive,
    },
}));
exports.default = CardButton;
//# sourceMappingURL=CardButton.js.map