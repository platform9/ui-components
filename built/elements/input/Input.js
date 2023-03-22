"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
const FontAwesomeIcon_1 = __importDefault(require("../../components/FontAwesomeIcon"));
const ramda_1 = require("ramda");
const Text_1 = __importDefault(require("../Text"));
const clsx_1 = __importDefault(require("clsx"));
const styles_1 = require("@material-ui/styles");
const tooltip_1 = __importDefault(require("../../elements/tooltip"));
const defaults_1 = require("../../elements/menu/defaults");
const useToggler_1 = __importDefault(require("../../hooks/useToggler"));
const defaultIconProps = {
    placement: 'start',
};
const Input = (_a) => {
    var { className = undefined, compact = false, variant = 'light', mask = undefined, icon = undefined, iconProps = undefined, placeholder = '', label = '', info = '', children, value, onChange, disabled = false, error = '' } = _a, rest = __rest(_a, ["className", "compact", "variant", "mask", "icon", "iconProps", "placeholder", "label", "info", "children", "value", "onChange", "disabled", "error"]);
    const maskRef = (0, react_1.useRef)();
    const width = (0, react_1.useMemo)(() => {
        var _a, _b;
        return ((_b = (_a = maskRef === null || maskRef === void 0 ? void 0 : maskRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect()) === null || _b === void 0 ? void 0 : _b.width) || 0;
    }, [maskRef.current, mask]);
    const [focused, toggleFocused] = (0, useToggler_1.default)(false);
    const allIconProps = (0, react_1.useMemo)(() => (0, ramda_1.mergeRight)(defaultIconProps, iconProps || {}), [iconProps]);
    const handleChange = (0, react_1.useCallback)((event) => {
        if (onChange) {
            onChange(event);
        }
    }, [onChange]);
    const handleFocusOut = (event) => {
        var _a, _b;
        event.target.value = (_b = (_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.trim();
        onChange(event);
        toggleFocused();
    };
    const handleFocusToggle = (0, react_1.useCallback)(() => {
        toggleFocused();
    }, [toggleFocused]);
    const classes = useStyles({
        compact,
        variant,
        width,
        icon,
        disabled,
        error,
        focused,
        placement: allIconProps.placement,
        info: !!info,
    });
    let extraContent = null;
    if (mask && !!value) {
        extraContent = (react_1.default.createElement(Text_1.default, { variant: "inputPlaceholder", ref: maskRef, className: classes.maskText }, mask));
    }
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.wrapper, className) },
        label && (react_1.default.createElement(Text_1.default, { variant: "inputLabel", className: (0, clsx_1.default)(classes.label, 'label') }, label)),
        info && (react_1.default.createElement(tooltip_1.default, { message: info || label || placeholder, align: defaults_1.topMiddle.align, offset: defaults_1.topMiddle.offset, origin: "right center", className: classes.info },
            react_1.default.createElement(Text_1.default, { variant: "inputLabel", className: classes.hint },
                react_1.default.createElement(FontAwesomeIcon_1.default, null, "question-circle"),
                "Hint"))),
        react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.inputFrame, 'inputFrame') },
            icon && (react_1.default.createElement(FontAwesomeIcon_1.default, { className: (0, clsx_1.default)(classes.icon, 'icon'), onClick: allIconProps.onClick }, icon)),
            extraContent,
            react_1.default.createElement("input", Object.assign({}, rest, { onFocus: handleFocusToggle, onBlur: handleFocusOut, value: value, onChange: handleChange, placeholder: placeholder || label, className: (0, clsx_1.default)(classes.input, 'input', {
                    'input-disabled': disabled,
                }) }), children)),
        !!error && (react_1.default.createElement(Text_1.default, { variant: "body2", className: classes.error }, error))));
};
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    wrapper: {
        display: 'grid',
        maxWidth: 400,
        minWidth: 100,
        width: '100%',
        gridAutoRows: 'max-content',
        gridTemplateColumns: ({ info }) => (info ? '1fr minmax(0px, max-content)' : '1fr'),
        gridTemplateAreas: ({ error }) => `"input-label input-hint" "input-frame input-frame"${error ? ' "input-error input-error"' : ''}`,
        gap: ({ compact }) => (compact ? 0 : 8),
    },
    error: {
        marginLeft: 4,
        gridArea: 'input-error',
        color: theme.components.input.error,
        lineHeight: '16px',
    },
    label: {
        marginLeft: 4,
        gridArea: 'input-label',
        transition: 'color .2s ease',
        color: ({ disabled }) => disabled ? theme.components.input.label.disabled : theme.components.input.label.color,
    },
    info: {
        gridArea: 'input-hint',
        display: 'grid',
    },
    hint: {
        cursor: 'help',
        transition: 'color .2s ease',
        color: theme.components.input.label.hint,
        '& i': {
            cursor: 'help',
            marginRight: 8,
            transition: 'color .2s ease',
            color: theme.components.input.label.hint,
        },
    },
    inputFrame: {
        gridArea: 'input-frame',
        position: 'relative',
        borderWidth: ({ compact }) => (compact ? 0 : 1),
        borderStyle: 'solid',
        cursor: ({ disabled }) => (disabled ? 'not-allowed' : 'pointer'),
        pointerEvents: ({ disabled }) => (disabled ? 'none' : 'unset'),
        borderColor: ({ error, focused }) => {
            if (error) {
                return theme.components.input.error;
            }
            if (focused) {
                return theme.components.input.frame.activeBorder;
            }
            return theme.components.input.frame.border;
        },
        backgroundColor: ({ disabled }) => disabled
            ? theme.components.input.frame.disabledBackground
            : theme.components.input.frame.background,
        transition: 'border-color .2s ease',
        borderRadius: 4,
        display: 'grid',
        gridAutoFlow: 'column',
        alignItems: 'center',
        gridTemplateColumns: ({ icon, placement }) => icon ? (placement === 'end' ? '1fr max-content' : 'max-content 1fr') : 'unset',
        gap: 8,
        padding: ({ width }) => {
            const leftPaddDefault = 8;
            const leftPadd = width > 0 ? width + leftPaddDefault : leftPaddDefault;
            return `0 8px 0 ${leftPadd}px`;
        },
    },
    focused: {
        borderColor: theme.components.input.frame.activeBorder,
    },
    maskText: {
        position: 'absolute',
        top: '50%',
        left: ({ icon }) => (icon ? 32 : 8),
        zIndex: 1,
        transform: 'translate(0, -50%)',
        color: theme.components.input.frame.color,
        transition: 'color .2s ease',
    },
    icon: {
        fontSize: ({ compact }) => (compact ? 12 : 16),
        lineHeight: '16px',
        padding: 4,
        borderRadius: 4,
        color: ({ disabled }) => disabled
            ? theme.components.input.frame.disabledPlaceholder
            : theme.components.input.frame.color,
        transition: 'color .2s ease',
        order: ({ placement }) => (placement === 'end' ? 1 : -1),
    },
    input: Object.assign(Object.assign({}, theme.typography.inputPlaceholder), { transition: 'color .2s ease', minHeight: 36, outline: 0, padding: 0, margin: 0, width: '100%', color: ({ disabled }) => disabled
            ? theme.components.input.frame.disabledPlaceholder
            : theme.components.input.frame.color, caretColor: theme.components.input.frame.color, background: 'transparent', boxSizing: 'border-box', border: 'none' }),
    '@global': {
        // unfortunately globals wont combine
        'input::placeholder': {
            transition: 'color .2s ease',
            color: theme.components.input.frame.placeholder,
        },
        'input::-webkit-input-placeholder': {
            transition: 'color .2s ease',
            color: theme.components.input.frame.placeholder,
        },
        'input::-moz-placeholder': {
            transition: 'color .2s ease',
            color: theme.components.input.frame.placeholder,
        },
        'input:-ms-input-placeholder': {
            transition: 'color .2s ease',
            color: theme.components.input.frame.placeholder,
        },
        'input:-moz-placeholder': {
            transition: 'color .2s ease',
            color: theme.components.input.frame.placeholder,
        },
        'input.input-disabled::placeholder': {
            color: `${theme.components.input.frame.disabledPlaceholder} !important`,
        },
        'input.input-disabled::-webkit-input-placeholder': {
            color: `${theme.components.input.frame.disabledPlaceholder} !important`,
        },
        'input.input-disabled::-moz-placeholder': {
            color: `${theme.components.input.frame.disabledPlaceholder} !important`,
        },
        'input.input-disabled:-ms-input-placeholder': {
            color: `${theme.components.input.frame.disabledPlaceholder} !important`,
        },
        'input.input-disabled:-moz-placeholder': {
            color: `${theme.components.input.frame.disabledPlaceholder} !important`,
        },
        // 'input.input-disabled::placeholder': {
        //   color: [theme.components.input.frame.disabledPlaceholder, '!important'],
        // },
        // 'input.input-disabled::-webkit-input-placeholder': {
        //   color: [theme.components.input.frame.disabledPlaceholder, '!important'],
        // },
        // 'input.input-disabled::-moz-placeholder': {
        //   color: [theme.components.input.frame.disabledPlaceholder, '!important'],
        // },
        // 'input.input-disabled:-ms-input-placeholder': {
        //   color: [theme.components.input.frame.disabledPlaceholder, '!important'],
        // },
        // 'input.input-disabled:-moz-placeholder': {
        //   color: [theme.components.input.frame.disabledPlaceholder, '!important'],
        // },
        '*:-webkit-autofill': {
            transition: 'background-color 10000s',
            transitionDelay: '10000s',
            '-webkit-text-fill-color': theme.components.input.frame.color,
            '-webkit-box-shadow': `0 0 0 30px ${theme.components.input.frame.background} inset !important`,
        },
        '*:-webkit-autofill:hover': {
            transition: 'background-color 10000s',
            transitionDelay: '10000s',
            '-webkit-text-fill-color': theme.components.input.frame.color,
            '-webkit-box-shadow': `0 0 0 30px ${theme.components.input.frame.background} inset !important`,
        },
        '*:-webkit-autofill:focus': {
            transition: 'background-color 10000s',
            transitionDelay: '10000s',
            '-webkit-text-fill-color': theme.components.input.frame.color,
            '-webkit-box-shadow': `0 0 0 30px ${theme.components.input.frame.background} inset !important`,
        },
        '*:-webkit-autofill:active': {
            transition: 'background-color 10000s',
            transitionDelay: '10000s',
            '-webkit-text-fill-color': theme.components.input.frame.color,
            '-webkit-box-shadow': `0 0 0 30px ${theme.components.input.frame.background} inset !important`,
        },
    },
}));
exports.default = Input;
//# sourceMappingURL=Input.js.map