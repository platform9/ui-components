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
const styles_1 = require("@material-ui/styles");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importStar(require("react"));
const FontAwesomeIcon_1 = __importDefault(require("../FontAwesomeIcon"));
function Accordion(_a) {
    var { id, title, children, open = undefined, className, onClick, icon = 'chevron-right' } = _a, props = __rest(_a, ["id", "title", "children", "open", "className", "onClick", "icon"]);
    const [active, toggleActive] = (0, react_1.useState)(open || false);
    const [height, setHeight] = (0, react_1.useState)(0);
    const isControlledComponent = open !== undefined && onClick !== undefined;
    const content = (0, react_1.useRef)(null);
    const classes = useStyles({ active, open, height });
    const titleComponent = (0, react_1.useMemo)(() => (typeof title === 'string' ? react_1.default.createElement("p", { className: classes.accordionTitle }, title) : title), [title]);
    (0, react_1.useEffect)(() => {
        if (isControlledComponent) {
            toggleActive(open);
        }
    }, [open, isControlledComponent]);
    (0, react_1.useEffect)(() => {
        if (content.current) {
            const contentHeight = content.current.scrollHeight;
            setHeight(active ? contentHeight : 0);
        }
    }, [active, children]);
    const handleToggleClick = () => {
        isControlledComponent ? onClick() : toggleActive(!active);
    };
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.accordionContainer, className), id: id },
        react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.accordionTopBar, 'accordionTopBar'), onClick: handleToggleClick },
            titleComponent,
            react_1.default.createElement(FontAwesomeIcon_1.default, { solid: true, size: "xs", className: (0, clsx_1.default)(classes.icon, 'toggleIcon') }, icon)),
        react_1.default.createElement("div", Object.assign({ ref: content, className: (0, clsx_1.default)(classes.accordionContent, 'accordionContent'), style: { maxHeight: `${height}px` } }, props), children)));
}
exports.default = Accordion;
const useStyles = (0, styles_1.makeStyles)((theme) => {
    var _a, _b;
    return ({
        accordionContainer: {
            display: 'flex',
            flexDirection: 'column',
            minWidth: 400,
        },
        accordionTopBar: {
            backgroundColor: ({ active }) => active
                ? `${theme.components.accordion.activeBackground}`
                : `${theme.components.accordion.background}`,
            borderTop: `1px solid  ${theme.components.accordion.border}`,
            color: `${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.components) === null || _a === void 0 ? void 0 : _a.typography) === null || _b === void 0 ? void 0 : _b.default}`,
            cursor: 'pointer',
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: 'none',
            transition: 'background-color 0.6s ease',
        },
        accordionTitle: {
            fontWeight: 600,
            fontSize: 14,
            textAlign: 'left',
        },
        accordionContent: {
            overflow: ({ active }) => (active ? 'visible' : 'hidden'),
            transition: 'max-height 0.6s ease',
            maxHeight: 0,
        },
        icon: {
            transition: 'transform 0.6s ease',
            transform: ({ active }) => (active ? 'rotate(90deg)' : 'rotate(0deg)'),
        },
    });
});
//# sourceMappingURL=Accordion.js.map