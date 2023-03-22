"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const react_1 = __importStar(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const styles_1 = require("@material-ui/styles");
const Tooltip_1 = __importDefault(require("../../elements/tooltip/Tooltip"));
const FontAwesomeIcon_1 = __importDefault(require("../../components/FontAwesomeIcon"));
const defaults_1 = require("../../elements/menu/defaults");
const defaultTooltipProps = Object.assign(Object.assign({}, defaults_1.bottomMiddle), { origin: 'right top' });
exports.default = react_1.forwardRef((_a, ref) => {
    var { className = undefined, onClick, icon = undefined, info = undefined, children, disabled = false, size = '2x', solid = true, tooltipProps = defaultTooltipProps } = _a, props = __rest(_a, ["className", "onClick", "icon", "info", "children", "disabled", "size", "solid", "tooltipProps"]);
    const classes = useStyles({});
    const content = (react_1.default.createElement("button", Object.assign({ className: clsx_1.default(classes.button, className, { disabled }), onClick: disabled ? undefined : onClick, ref: ref }, props),
        react_1.default.createElement(FontAwesomeIcon_1.default, { className: classes.icon, size: size, solid: solid }, icon || children)));
    if (!info) {
        return content;
    }
    return (react_1.default.createElement(Tooltip_1.default, Object.assign({ message: info }, tooltipProps), content));
});
/**
 *
 *
 badgeColor
 badgeTextColor
 */
const useStyles = styles_1.makeStyles((theme) => ({
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
        padding: '0 8px',
        borderRadius: 4,
        border: `1px solid ${theme.components.iconButton.border}`,
        backgroundColor: theme.components.iconButton.background,
        color: theme.components.iconButton.color,
        cursor: 'pointer',
        transition: 'all .2s ease',
        '&:hover': {
            backgroundColor: theme.components.iconButton.activeBackground,
            borderColor: theme.components.iconButton.activeBorder,
            color: theme.components.iconButton.activeColor,
        },
        '&.disabled': {
            cursor: 'not-allowed',
            backgroundColor: theme.components.iconButton.disabledBackground,
            borderColor: theme.components.iconButton.disabledBorder,
            color: theme.components.iconButton.disabledColor,
        },
    },
    icon: {
        cursor: 'pointer',
        color: 'inherit',
        fontSize: 20,
    },
}));
//# sourceMappingURL=IconButton.js.map