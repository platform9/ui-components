"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@mui/material/styles");
const clsx_1 = __importDefault(require("clsx"));
const Text_1 = __importDefault(require("../elements/Text"));
const test_helpers_1 = __importDefault(require("../utils/test-helpers"));
const StyledAvatar = (0, styles_1.styled)(Text_1.default)(({ theme, diameter, fontSize, readOnly }) => ({
    borderRadius: '50%',
    border: `1px solid ${theme.components.iconButton.border}`,
    backgroundColor: theme.components.iconButton.background,
    color: theme.components.iconButton.color,
    transition: 'all .2s ease',
    '&:not(.read-only):hover, &.read-only': {
        backgroundColor: theme.components.iconButton.activeBackground,
        borderColor: theme.components.iconButton.activeBorder,
        color: theme.components.iconButton.activeColor,
    },
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    overflow: 'hidden',
    lineHeight: fontSize,
    height: diameter,
    width: diameter,
    fontSize: fontSize,
    cursor: readOnly ? 'default' : 'pointer',
}));
const Avatar = ({ displayName = '', diameter = 48, fontSize = 18, onClick, className }) => {
    const readOnly = !onClick;
    return (react_1.default.createElement(StyledAvatar, { component: "div", variant: "body1", "data-testid": (0, test_helpers_1.default)('user', 'menu'), className: (0, clsx_1.default)(className, { 'read-only': readOnly }), onClick: onClick, diameter: diameter, fontSize: fontSize, readOnly: readOnly }, displayName.charAt(0)));
};
exports.default = Avatar;
//# sourceMappingURL=Avatar.js.map