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
const card_1 = __importDefault(require("../elements/card"));
const FontAwesomeIcon_1 = __importDefault(require("./FontAwesomeIcon"));
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    selectableCard: {
        position: 'relative',
    },
    card: {
        cursor: 'pointer',
        border: ({ active }) => active
            ? `1px solid ${theme.components.card.activeBorder}`
            : `1px solid ${theme.components.card.border}`,
        backgroundColor: ({ active }) => active ? theme.components.card.activeBackground : theme.components.card.background,
        '&:hover': {
            border: `1px solid ${theme.components.card.activeBorder}`,
        },
    },
    circle: {
        background: theme.components.card.activeBorder,
        position: 'absolute',
        right: '-7px',
        top: '-8px',
        borderRadius: '50%',
        width: '27px',
        height: '27px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkIcon: {
        color: 'white',
    },
}));
const SelectableCard = (props) => {
    const { id, onClick, children, active = false, className = undefined, showCheckmarkIcon = false } = props, rest = __rest(props, ["id", "onClick", "children", "active", "className", "showCheckmarkIcon"]);
    const classes = useStyles({ active });
    const handleClick = () => {
        if (onClick)
            return onClick(id);
    };
    return (react_1.default.createElement("div", { className: classes.selectableCard, onClick: handleClick },
        react_1.default.createElement(card_1.default, Object.assign({}, rest, { className: (0, clsx_1.default)(classes.card, className) }), children),
        active && showCheckmarkIcon && (react_1.default.createElement("div", { className: classes.circle },
            react_1.default.createElement(FontAwesomeIcon_1.default, { className: classes.checkIcon, solid: true, size: "sm" }, "check")))));
};
exports.default = SelectableCard;
//# sourceMappingURL=SelectableCard.js.map