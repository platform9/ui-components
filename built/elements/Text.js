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
const clsx_1 = __importDefault(require("clsx"));
const styles_1 = require("@material-ui/styles");
const variantMap = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    subtitle1: 'h5',
    subtitle2: 'h6',
    body1: 'p',
    body2: 'p',
};
// forwardRef required for mask from Input component to work
const Text = (0, react_1.forwardRef)((props, ref) => {
    const { className, variant = 'body1', component = variantMap[variant] || 'span', noWrap = false, lineClamp = undefined, maxWidth, children } = props, rest = __rest(props, ["className", "variant", "component", "noWrap", "lineClamp", "maxWidth", "children"]);
    const classes = useStyles({ variant, lineClamp, maxWidth });
    return react_1.default.createElement(component, Object.assign({ variant: variant, className: (0, clsx_1.default)(classes.text, className, {
            [classes.noWrap]: noWrap,
            [classes.lineClamp]: lineClamp,
        }), ref: ref }, rest), children);
});
exports.default = Text;
const useStyles = (0, styles_1.makeStyles)((theme) => {
    var _a, _b;
    return ({
        lineClamp: {
            display: '-webkit-box',
            '-webkit-line-clamp': ({ lineClamp }) => lineClamp,
            '-webkit-box-orient': 'vertical',
            overflow: 'hidden',
            wordBreak: 'break-word',
        },
        noWrap: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        },
        text: {
            // these need to use optional chaining as the theme isn't loaded on first render.
            // this would throw an exception
            fontFamily: ({ variant }) => { var _a, _b; return (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _a === void 0 ? void 0 : _a[variant]) === null || _b === void 0 ? void 0 : _b.fontFamily; },
            fontSize: ({ variant }) => { var _a, _b; return (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _a === void 0 ? void 0 : _a[variant]) === null || _b === void 0 ? void 0 : _b.fontSize; },
            fontWeight: ({ variant }) => { var _a, _b; return (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _a === void 0 ? void 0 : _a[variant]) === null || _b === void 0 ? void 0 : _b.fontWeight; },
            fontStretch: ({ variant }) => { var _a, _b; return (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _a === void 0 ? void 0 : _a[variant]) === null || _b === void 0 ? void 0 : _b.fontStretch; },
            fontStyle: ({ variant }) => { var _a, _b; return (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _a === void 0 ? void 0 : _a[variant]) === null || _b === void 0 ? void 0 : _b.fontStyle; },
            lineHeight: ({ variant }) => { var _a, _b; return (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _a === void 0 ? void 0 : _a[variant]) === null || _b === void 0 ? void 0 : _b.lineHeight; },
            letterSpacing: ({ variant }) => { var _a, _b; return (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _a === void 0 ? void 0 : _a[variant]) === null || _b === void 0 ? void 0 : _b.letterSpacing; },
            textAlign: ({ variant }) => { var _a, _b; return (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _a === void 0 ? void 0 : _a[variant]) === null || _b === void 0 ? void 0 : _b.textAlign; },
            color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.components) === null || _a === void 0 ? void 0 : _a.typography) === null || _b === void 0 ? void 0 : _b.default,
            margin: 0,
            maxWidth: ({ maxWidth }) => (maxWidth ? maxWidth : 'unset'),
        },
    });
});
//# sourceMappingURL=Text.js.map