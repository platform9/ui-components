"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/styles");
const clsx_1 = __importDefault(require("clsx"));
const test_helpers_1 = __importDefault(require("../utils/test-helpers"));
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    avatar: {
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
        lineHeight: ({ fontSize }) => fontSize,
        height: ({ diameter }) => diameter,
        width: ({ diameter }) => diameter,
        fontSize: ({ fontSize }) => fontSize,
        cursor: ({ readOnly }) => (!readOnly ? 'pointer' : 'default'),
    },
}));
const Avatar = ({ displayName = '', diameter = 48, fontSize = 18, onClick, className }) => {
    const readOnly = !onClick;
    const { avatar } = useStyles({ diameter, fontSize, readOnly });
    return (react_1.default.createElement("div", { "data-testid": (0, test_helpers_1.default)('user', 'menu'), className: (0, clsx_1.default)(avatar, className, { 'read-only': readOnly }), onClick: onClick }, displayName.charAt(0)));
};
exports.default = Avatar;
//# sourceMappingURL=Avatar.js.map