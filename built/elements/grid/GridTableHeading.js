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
const fp_1 = require("src/utils/fp");
exports.default = (0, styles_1.styled)((_a) => {
    var { sortingDisabled, width, children } = _a, props = __rest(_a, ["sortingDisabled", "width", "children"]);
    return (react_1.default.createElement("th", Object.assign({}, props), children));
})(({ theme, width = 'small', sortingDisabled }) => ({
    position: 'relative',
    border: 0,
    margin: 0,
    minWidth: (0, fp_1.switchCase)({
        small: 80,
        medium: 160,
        large: 340,
    }, width)(width),
    padding: theme.spacing(0.5, 1),
    cursor: sortingDisabled ? 'default' : 'pointer',
    color: theme.components.table.headColor,
    '&:first-child': {
        paddingLeft: 16,
    },
    '&:last-child': {
        paddingRight: 16,
    },
    '&.select-column': {
        width: 26,
        minWidth: 26,
        '&:after': {
            content: 'none',
        },
        '& > .checkbox': {
            padding: 4,
            marginLeft: -4,
            width: 16,
        },
    },
    '& > .grid_header-text': {
        color: theme.components.table.headColor,
    },
    '& > .grid_header-direction': {
        position: 'absolute',
        right: 0,
        top: '50%',
        fontSize: 12,
        transform: 'translate(0, -50%)',
        padding: theme.spacing(0, 0.5),
        '&:before': {
            height: 6,
            display: 'block',
        },
    },
}));
//# sourceMappingURL=GridTableHeading.js.map