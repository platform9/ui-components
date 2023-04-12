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
function NavPane(_a) {
    var { className, title, children, bottomContent = undefined } = _a, rest = __rest(_a, ["className", "title", "children", "bottomContent"]);
    const hasTitle = !!title;
    const classes = useStyles({ title: hasTitle });
    return (react_1.default.createElement("nav", Object.assign({ className: (0, clsx_1.default)(classes.navPane, className) }, rest),
        hasTitle && (react_1.default.createElement(Text_1.default, { variant: "subtitle2", component: "h6", className: classes.navPaneTitle }, title)),
        react_1.default.createElement("ul", null, children),
        !!bottomContent && react_1.default.createElement("ul", null, bottomContent)));
}
exports.default = NavPane;
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    navPane: {
        display: 'grid',
        gridTemplateRows: ({ title }) => (title ? 'max-content 1fr max-content' : '1fr max-content'),
        paddingBottom: 16,
        '& ul': {
            listStyle: 'none',
            padding: 0,
            margin: 0,
        },
    },
    navPaneTitle: {
        color: theme.components.sidebar.activeText,
    },
}));
//# sourceMappingURL=NavPane.js.map