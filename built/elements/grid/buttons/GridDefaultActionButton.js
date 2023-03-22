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
const button_1 = __importDefault(require("../../../elements/button"));
const tooltip_1 = __importDefault(require("../../../elements/tooltip"));
const defaults_1 = require("../../../elements/menu/defaults");
const clsx_1 = __importDefault(require("clsx"));
function GridDefaultActionButton(_a) {
    var { className, disabled, children, onClick, icon, solidIcon = true, tooltip } = _a, rest = __rest(_a, ["className", "disabled", "children", "onClick", "icon", "solidIcon", "tooltip"]);
    const classes = useStyles({ disabled });
    const button = (react_1.default.createElement(button_1.default, Object.assign({}, rest, { className: clsx_1.default(classes.btn, className), icon: icon, variant: "secondary", disabled: disabled, onClick: onClick, solidIcon: solidIcon }), children));
    if (tooltip) {
        return (react_1.default.createElement(tooltip_1.default, { message: tooltip, align: defaults_1.topMiddle.align, offset: defaults_1.topMiddle.offset }, button));
    }
    return button;
}
exports.default = GridDefaultActionButton;
const useStyles = styles_1.makeStyles((theme) => ({
    btn: {
        opacity: ({ disabled = false }) => (disabled ? 0.5 : 1),
        '& > .button-text > .button-icon': {
            fontWeight: 'normal',
            fontSize: 12,
        },
        '& > .button-text': {
            fontWeight: 'normal',
        },
        '&:hover > .button-text': {
            fontWeight: 'normal',
        },
    },
}));
//# sourceMappingURL=GridDefaultActionButton.js.map