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
const styles_1 = require("@material-ui/styles");
const Text_1 = __importDefault(require("../../elements/Text"));
const FontAwesomeIcon_1 = __importDefault(require("../../components/FontAwesomeIcon"));
const SimpleLink_1 = __importDefault(require("../../components/SimpleLink"));
const clsx_1 = __importDefault(require("clsx"));
const test_helpers_1 = __importDefault(require("../../utils/test-helpers"));
function MenuItem(_a) {
    var { component = 'li', textVariant = 'body2', icon = undefined, iconPlacement = 'start', iconProps = {}, src = undefined, onClick, className, readonly = false, children } = _a, props = __rest(_a, ["component", "textVariant", "icon", "iconPlacement", "iconProps", "src", "onClick", "className", "readonly", "children"]);
    const classes = useStyles({ iconPlacement, readonly });
    const handleClick = (0, react_1.useCallback)((e) => {
        if (readonly) {
            e.stopPropagation();
            return;
        }
        onClick(e);
    }, [onClick, readonly]);
    const content = (react_1.default.createElement(Text_1.default, Object.assign({ "data-testid": (0, test_helpers_1.default)(children[1]), variant: textVariant, component: component, className: (0, clsx_1.default)(classes.menuItem, className), onClick: !src ? handleClick : undefined }, props),
        icon && (react_1.default.createElement(FontAwesomeIcon_1.default, Object.assign({ size: "md" }, iconProps), icon)),
        children));
    if (src) {
        return (react_1.default.createElement(SimpleLink_1.default, { src: src, onClick: onClick, className: classes.link }, content));
    }
    return content;
}
exports.default = MenuItem;
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    menuItem: {
        display: 'grid',
        // gridTemplateColumns: ({ iconPlacement }) =>
        //   iconPlacement === 'start' ? 'max-content 1fr' : 'max-content max-content',
        gridTemplateColumns: 'max-content max-content',
        justifyContent: ({ iconPlacement }) => iconPlacement === 'start' ? 'start' : 'space-between',
        gap: 16,
        minHeight: 48,
        alignItems: 'center',
        paddingLeft: 8,
        borderRadius: 4,
        backgroundColor: theme.components.checkbox.background,
        transition: 'background .2s ease, color .2s ease',
        color: ({ readonly }) => readonly ? theme.components.checkbox.disabledColor : theme.components.checkbox.color,
        cursor: ({ readonly }) => (readonly ? 'default' : 'pointer'),
        '&:hover': {
            backgroundColor: ({ readonly }) => readonly ? 'inherit' : theme.components.checkbox.hoverBackground,
        },
        '& i': {
            transition: 'color .2s ease',
            marginTop: 1,
            fontSize: ({ iconPlacement }) => (iconPlacement === 'start' ? 18 : 14),
            width: 20,
            height: 20,
            display: 'grid',
            alignItems: 'center',
            justifyContent: 'center',
            order: ({ iconPlacement }) => (iconPlacement === 'start' ? 0 : 1),
        },
    },
    link: {
        textDecoration: 'none !important',
        display: 'grid',
    },
}));
//# sourceMappingURL=MenuItem.js.map