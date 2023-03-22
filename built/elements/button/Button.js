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
const test_helpers_1 = __importDefault(require("../../utils/test-helpers"));
const Progress_1 = __importDefault(require("../../components/progress/Progress"));
const FontAwesomeIcon_1 = __importDefault(require("../../components/FontAwesomeIcon"));
const InfoTooltip_1 = require("../../components/InfoTooltip");
const fp_1 = require("../../utils/fp");
const Button = (_a) => {
    var { variant = 'primary', size = 'medium', className = undefined, children, disabled = false, loading = false, icon = undefined, rightIcon = undefined, onClick, solidIcon = false, iconBrand = false } = _a, rest = __rest(_a, ["variant", "size", "className", "children", "disabled", "loading", "icon", "rightIcon", "onClick", "solidIcon", "iconBrand"]);
    const hasRightIcon = !!rightIcon;
    const hasLeftIcon = !!icon;
    const isDropdown = rightIcon === 'angle-down';
    const classes = useStyles({ variant, size, hasLeftIcon, isDropdown, hasRightIcon });
    const spanTextVariant = size === 'large' ? 'buttonPrimary' : 'buttonSecondary';
    return (react_1.default.createElement("button", Object.assign({ "data-testid": test_helpers_1.default(children), className: clsx_1.default(classes.button, className, {
            disabled,
            loading,
            [classes.isDropdown]: !!isDropdown,
        }), disabled: disabled || loading, onClick: disabled || loading ? undefined : onClick }, rest),
        react_1.default.createElement(Text_1.default, { className: clsx_1.default('button-text', classes.buttonText, {
                [classes.iconText]: hasLeftIcon || hasRightIcon,
            }), component: "div", variant: spanTextVariant },
            !!icon && !loading && (react_1.default.createElement(FontAwesomeIcon_1.default, { size: "md", solid: solidIcon, className: "button-icon" }, icon)),
            loading ? (react_1.default.createElement(Progress_1.default, { inline: true, overlay: false, message: null, loading: true, inlineClassName: classes.inheritColors })) : (children),
            !!rightIcon && !loading && (react_1.default.createElement(FontAwesomeIcon_1.default, { size: "md", brand: iconBrand, className: "button-icon button-right-icon" }, rightIcon)))));
};
const useStyles = styles_1.makeStyles((theme) => ({
    isDropdown: {
        minWidth: 150,
    },
    inheritColors: {
        color: 'inherit',
        fontSize: 'inherit',
        fontWeight: 'inherit',
        fontStyle: 'inherit',
        fontFamily: 'inherit',
        lineHeight: 'inherit',
        fontStretch: 'inherit',
        letterSpacing: 'inherit',
    },
    iconText: {
        justifyContent: ({ hasLeftIcon }) => (!hasLeftIcon ? 'center' : 'start'),
        gridTemplateColumns: ({ hasLeftIcon, hasRightIcon }) => `${hasLeftIcon ? 'max-content ' : ''}max-content${hasRightIcon ? ' max-content' : ''}`,
        gridTemplateAreas: ({ isDropdown }) => isDropdown ? '"button-icon button-text button-right-icon"' : 'unset',
    },
    buttonText: {
        whiteSpace: 'nowrap',
        fontWeight: 'bold',
        display: 'grid',
        gridAutoFlow: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        fontSize: ({ size }) => (size === 'small' ? 12 : size === 'medium' ? 14 : 16),
        '& .loading-ellipsis-animation': {
            position: 'relative',
            top: -5,
        },
    },
    button: {
        cursor: 'pointer',
        outline: 0,
        height: ({ size }) => (size === 'medium' ? 36 : size === 'small' ? 32 : 40),
        transition: 'background 0.2s ease, color 0.2s ease, border-color 0.2s ease, border-radius 0.3s ease',
        padding: ({ size, hasLeftIcon, hasRightIcon }) => {
            const hasIcon = hasLeftIcon || hasRightIcon;
            const multiplier = size === 'small' ? 1 : size === 'medium' ? 2 : 3;
            const verticalPad = 2 * multiplier;
            const horizontalPad = 20;
            const horizontalOffset = hasIcon ? horizontalPad / 8 : 0;
            return `${verticalPad}px ${horizontalPad - horizontalOffset}px`;
        },
        border: ({ variant }) => `1px solid ${theme.components.button[variant].border}`,
        backgroundColor: ({ variant }) => theme.components.button[variant].background,
        color: ({ variant }) => theme.components.button[variant].color,
        borderRadius: 4,
        '& .button-icon': {
            marginTop: 2,
            gridArea: ({ isDropdown }) => (isDropdown ? 'button-icon' : 'unset'),
            fontWeight: 400,
        },
        '& .button-icon, & .button-text': {
            transition: 'color 0.2s ease',
            color: ({ variant }) => theme.components.button[variant].color,
        },
        '& .button-right-icon': {
            gridArea: ({ isDropdown }) => (isDropdown ? 'button-right-icon' : 'unset'),
            fontSize: ({ isDropdown }) => (isDropdown ? 18 : undefined),
        },
        '&:hover, &.hover, &:active, &.active, &:focus, &.focus': {
            backgroundColor: ({ variant }) => theme.components.button[variant].activeBackground,
            borderColor: ({ variant }) => theme.components.button[variant].activeBorder,
            color: ({ variant }) => theme.components.button[variant].activeColor,
            '& .button-icon, & .button-text': {
                color: ({ variant }) => theme.components.button[variant].activeColor,
            },
        },
        '&.disabled': {
            cursor: 'not-allowed',
            backgroundColor: ({ variant }) => `${theme.components.button[variant].disabledBackground} !important`,
            borderColor: ({ variant }) => `${theme.components.button[variant].disabledBorder} !important`,
            color: ({ variant }) => `${theme.components.button[variant].color} !important`,
            '& .button-icon, & .button-text': {
                color: ({ variant }) => theme.components.button[variant].color,
            },
        },
        '&.loading': {
            cursor: 'not-allowed',
            backgroundColor: ({ variant }) => `${theme.components.button[variant].background} !important`,
            borderColor: ({ variant }) => `${theme.components.button[variant].border} !important`,
            color: ({ variant }) => `${theme.components.button[variant].color} !important`,
        },
    },
}));
exports.default = fp_1.compose(InfoTooltip_1.withInfoTooltip)(Button);
//# sourceMappingURL=Button.js.map