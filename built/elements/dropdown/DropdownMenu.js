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
const clsx_1 = __importDefault(require("clsx"));
const useStyles = styles_1.makeStyles((theme) => ({
    dropdownMenu: {
        opacity: ({ isOpen }) => (isOpen ? 1 : 0),
        maxHeight: ({ isOpen }) => (isOpen ? '20rem' : '1rem'),
        transition: 'opacity .2s ease, max-height .2s ease',
        zIndex: 10,
        color: theme.components.dropdown.color,
        backgroundColor: theme.components.dropdown.background,
        right: -1,
        padding: 0,
        marginTop: 0,
        position: 'absolute',
        width: ({ compact }) => (compact ? null : '100%'),
        minWidth: 150,
        maxWidth: ({ compact }) => (compact ? 300 : '100%'),
        overflowY: 'auto',
        overflowX: 'hidden',
        outline: '0',
        borderRadius: 4,
        borderColor: theme.components.dropdown.border,
        borderWidth: 1,
        borderStyle: 'solid',
        border: ({ isOpen }) => (isOpen ? null : 'none'),
    },
}));
exports.default = react_1.default.forwardRef((props, ref) => {
    const { isOpen, children, compact } = props, rest = __rest(props, ["isOpen", "children", "compact"]);
    const classes = useStyles(props);
    return (react_1.default.createElement("ul", Object.assign({ className: clsx_1.default(classes.dropdownMenu, 'dropdownMenu') }, rest, { ref: ref }), children));
});
//# sourceMappingURL=DropdownMenu.js.map