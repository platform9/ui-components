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
const styles_1 = require("@material-ui/styles");
const FontAwesomeIcon_1 = __importDefault(require("../../components/FontAwesomeIcon"));
const clsx_1 = __importDefault(require("clsx"));
exports.default = (0, styles_1.styled)(react_1.default.forwardRef((_a, ref) => {
    var { className } = _a, rest = __rest(_a, ["className"]);
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)(className, 'input') },
        react_1.default.createElement(FontAwesomeIcon_1.default, { solid: true, size: "sm" }, "magnifying-glass"),
        react_1.default.createElement("input", Object.assign({}, rest, { ref: ref }))));
}))(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    color: theme.components.input.frame.color,
    padding: '0 8px',
    '& > input': {
        margin: '2px 10px 0 0',
        transition: 'color .2s ease',
        outline: 0,
        flexGrow: 1,
        caretColor: theme.components.input.frame.color,
        background: 'transparent',
        color: 'inherit',
        boxSizing: 'border-box',
        border: 'none',
        lineHeight: 2.4,
        display: 'inline-block',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
    '& > i': {
        color: theme.components.input.frame.placeholder,
        marginRight: 8,
    },
}));
//# sourceMappingURL=DropdownInput.js.map