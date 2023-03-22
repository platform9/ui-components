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
const button_1 = __importDefault(require("../../elements/button"));
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    root: {
        // backgroundColor: '#f3f3f4',
        minHeight: 36,
        height: 36,
        borderRadius: 4,
        margin: theme.spacing(0, 1),
        '&:hover': {
        // backgroundColor: '#FFFFFF',
        },
    },
}));
const BannerButton = (_a) => {
    var { children } = _a, rest = __rest(_a, ["children"]);
    const classes = useStyles({});
    return (react_1.default.createElement(button_1.default, Object.assign({ className: classes.root }, rest), children));
};
exports.default = BannerButton;
//# sourceMappingURL=BannerButton.js.map