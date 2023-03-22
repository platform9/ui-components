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
const Menu_1 = __importDefault(require("./Menu"));
const MenuItem_1 = __importDefault(require("./MenuItem"));
function ListMenu(_a) {
    var { anchor, list = [], onClick, render } = _a, props = __rest(_a, ["anchor", "list", "onClick", "render"]);
    const classes = useStyles({});
    return (react_1.default.createElement(Menu_1.default, Object.assign({ className: classes.menuContainer, anchor: anchor }, props), list.map((item) => typeof render === 'function' ? (render(item)) : (react_1.default.createElement(MenuItem_1.default, { key: item.id, onClick: () => onClick(item), icon: typeof item.icon === 'string' ? item.icon : undefined },
        typeof item.icon !== 'string' ? item.icon : null,
        item.name)))));
}
exports.default = ListMenu;
const useStyles = styles_1.makeStyles((theme) => ({
    menuContainer: {
        '& .menu-popover': {
            padding: '8px',
        },
    },
}));
//# sourceMappingURL=ListMenu.js.map