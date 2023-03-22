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
const core_1 = require("@material-ui/core");
const use_react_router_1 = __importDefault(require("use-react-router"));
const styles_1 = require("@material-ui/styles");
const clsx_1 = __importDefault(require("clsx"));
const FontAwesomeIcon_1 = __importDefault(require("./FontAwesomeIcon"));
const Text_1 = __importDefault(require("../elements/Text"));
const test_helpers_1 = __importDefault(require("../utils/test-helpers"));
const getColor = (variant, theme) => {
    if (variant === 'error') {
        return theme.components.graph.error;
    }
    else if (variant === 'secondary') {
        return theme.palette.secondary.main;
    }
    else {
        return theme.palette.primary.main;
    }
};
const useStyles = styles_1.makeStyles((theme) => ({
    root: {
        cursor: 'pointer',
        '&:hover': {
            textDecoration: ({ textDecoration }) => textDecoration || 'underline',
        },
        color: ({ variant }) => getColor(variant, theme),
    },
    icon: {
        fontSize: theme.typography.subtitle2.fontSize,
        marginRight: ({ iconPosition }) => (iconPosition === 'left' ? '8px' : '0px'),
        marginLeft: ({ iconPosition }) => (iconPosition === 'right' ? '8px' : '0px'),
    },
    text: {
        color: ({ variant }) => getColor(variant, theme),
    },
}));
// We need to destructure staticContext even though we are not using it in order to
// work around this issue: https://github.com/ReactTraining/react-router/issues/4683
// We need to use `forwardRef` as a workaround of an issue with material-ui Tooltip https://github.com/gregnb/mui-datatables/issues/595
const SimpleLink = react_1.forwardRef((_a, ref) => {
    var { onClick, src, children, staticContext, className, icon, variant, textVariant = 'body2', textDecoration = 'underline', label, lineClamp, iconPosition = 'right' } = _a, rest = __rest(_a, ["onClick", "src", "children", "staticContext", "className", "icon", "variant", "textVariant", "textDecoration", "label", "lineClamp", "iconPosition"]);
    const classes = useStyles({ variant, textDecoration, iconPosition });
    const { history } = use_react_router_1.default();
    const handleClick = react_1.useCallback((e) => {
        // Prevent links inside of a table row from triggering row selection.
        e.stopPropagation();
        if (onClick) {
            e.preventDefault();
            onClick(e);
        }
        // If there is no provided onClick, just use the `src` as a normal link.
        if (src && !src.startsWith('http')) {
            // local paths should use the History's push state
            e.preventDefault();
            return history.push(src);
        }
        // Any path that starts with http should be treated as an external link
    }, [src, history, onClick]);
    return (react_1.default.createElement(core_1.Link, Object.assign({ className: clsx_1.default(className, classes.root), ref: ref, href: src || null, onClick: handleClick, "data-testid": test_helpers_1.default(children) }, rest),
        !!icon && iconPosition === 'left' && (react_1.default.createElement(FontAwesomeIcon_1.default, { className: clsx_1.default(classes.icon, 'icon') }, icon)),
        textVariant ? (react_1.default.createElement(Text_1.default, { variant: textVariant, lineClamp: lineClamp, component: "span", className: clsx_1.default('simple-link-text', classes.text) }, children || src)) : (children || src),
        !!icon && iconPosition === 'right' && (react_1.default.createElement(FontAwesomeIcon_1.default, { className: clsx_1.default(classes.icon, 'icon') }, icon))));
});
exports.default = SimpleLink;
//# sourceMappingURL=SimpleLink.js.map