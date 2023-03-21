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
const Text_1 = __importDefault(require("../Text"));
const tooltip_1 = __importDefault(require("src/elements/tooltip"));
const test_helpers_1 = __importDefault(require("src/utils/test-helpers"));
function Checkbox(_a) {
    var { id, type = 'checkbox', textWeight = 'heavy', checked, disabled = false, onChange, label = undefined, info = undefined, className = undefined, indeterminate = false, containerComponent = 'div' } = _a, props = __rest(_a, ["id", "type", "textWeight", "checked", "disabled", "onChange", "label", "info", "className", "indeterminate", "containerComponent"]);
    const classes = useStyles({ checked, indeterminate, disabled });
    const handleClick = () => {
        if (!disabled && onChange) {
            onChange(!checked);
        }
    };
    const children = [
        react_1.default.createElement("input", Object.assign({ key: `${id}-input`, "data-testid": (0, test_helpers_1.default)(label, 'checkbox', 'selection'), className: classes.input, type: "checkbox" }, props)),
        react_1.default.createElement(Text_1.default, { key: `${id}-label`, "data-testid": (0, test_helpers_1.default)(label), variant: textWeight === 'heavy' ? 'caption1' : 'body2', component: "label", className: classes.label },
            react_1.default.createElement("span", { className: (0, clsx_1.default)(`${type}-frame`, classes.displayContainer, {
                    'fa-regular': type === 'checkbox',
                    'fa-check': type === 'checkbox' && !indeterminate,
                    'fa-dash': type === 'checkbox' && indeterminate,
                    [classes.checkbox]: type === 'checkbox',
                    [classes.radio]: type === 'radio',
                    [classes.indeterminate]: indeterminate,
                }) }),
            label ? react_1.default.createElement("span", { className: classes.text }, label) : null),
    ];
    const element = react_1.default.createElement(containerComponent, {
        className: (0, clsx_1.default)(classes.container, className, 'checkbox'),
        onClick: handleClick,
    }, children);
    if (info) {
        return react_1.default.createElement(tooltip_1.default, { message: info }, element);
    }
    return element;
}
exports.default = Checkbox;
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    container: {
        position: 'relative',
        cursor: ({ disabled }) => (disabled ? 'not-allowed' : 'pointer'),
        padding: '6px',
        borderRadius: 4,
        height: 16,
        minWidth: 16,
        width: 'max-content',
        transition: 'background .2s ease',
        '&:hover': {
            background: theme.components.checkbox.hoverBackground,
        },
    },
    input: {
        position: 'absolute',
        left: 0,
        opacity: 0.01,
        pointerEvents: 'none',
        borderRadius: 4,
    },
    label: {
        position: 'relative',
        paddingLeft: 8,
        cursor: ({ disabled }) => (disabled ? 'not-allowed' : 'pointer'),
        display: 'grid',
        alignItems: 'center',
    },
    text: {
        minHeight: 16,
        display: 'inline-block',
        lineHeight: '16px',
        marginLeft: 18,
        color: ({ disabled }) => {
            const key = disabled ? 'disabledColor' : 'color';
            return theme.components.checkbox[key];
        },
    },
    displayContainer: {
        position: 'absolute',
        left: 0,
        top: 8,
        width: 14,
        height: 14,
        border: ({ checked, disabled }) => {
            const key = disabled ? 'disabledBorder' : checked ? 'selectedBorder' : 'border';
            return `1px solid ${theme.components.checkbox[key]}`;
        },
        transform: 'translate(0%, -50%)',
    },
    radio: {
        borderRadius: 100,
        '&:before': {
            // plug
            content: '""',
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 10,
            height: 10,
            background: ({ disabled }) => {
                const key = disabled ? 'disabledBackground' : 'selectedBackground';
                return theme.components.checkbox[key];
            },
            borderRadius: 100,
            transform: 'translate(-50%, -50%)',
            transition: 'opacity .2s ease',
            opacity: ({ checked }) => (checked ? 1 : 0),
        },
    },
    checkbox: {
        borderRadius: 2,
        transition: 'background .2s ease',
        background: ({ checked, disabled }) => {
            const key = disabled && checked
                ? 'disabledBackground'
                : !disabled && checked
                    ? 'selectedBackground'
                    : 'background';
            return theme.components.checkbox[key];
        },
        '&:before': {
            color: theme.components.checkbox.selectedColor,
            fontSize: 12,
            position: 'absolute',
            top: 1.5,
            left: 1,
            fontWeight: 600,
            opacity: ({ checked }) => (checked ? 1 : 0),
        },
    },
    indeterminate: {
        '&.checkbox-frame:before': {
            top: 2.5,
            left: 2.5,
            fontSize: 9,
            fontWeight: 'bold',
        },
    },
}));
//# sourceMappingURL=Checkbox.js.map