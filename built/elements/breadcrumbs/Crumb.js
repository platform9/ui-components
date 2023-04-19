"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ramda_1 = require("ramda");
const clsx_1 = __importDefault(require("clsx"));
const styles_1 = require("@material-ui/styles");
const Text_1 = __importDefault(require("../../elements/Text"));
const SimpleLink_1 = __importDefault(require("../../components/SimpleLink"));
const FontAwesomeIcon_1 = __importDefault(require("../../components/FontAwesomeIcon"));
function Crumb({ icon, name, path, active, leftIcon, disabled = false, }) {
    const isLink = !(0, ramda_1.isNil)(path) && !active;
    const classes = useStyles({
        active,
        disabled,
        selectable: isLink,
        hideEllipsis: !!leftIcon || active,
    });
    const textContent = (react_1.default.createElement(Text_1.default, { variant: "subtitle2", noWrap: true, className: (0, clsx_1.default)('breadcrumb-text', classes.crumbText) },
        leftIcon && leftIcon,
        react_1.default.createElement("span", null, name)));
    return (react_1.default.createElement("li", { className: classes.breadcrumbItem },
        isLink ? (react_1.default.createElement(SimpleLink_1.default, { src: path, textDecoration: "none", className: classes.crumbLink }, textContent)) : (textContent),
        !active && (react_1.default.createElement(FontAwesomeIcon_1.default, { solid: true, className: classes.icon }, icon))));
}
exports.default = Crumb;
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    breadcrumbItem: {
        display: 'grid',
        alignItems: 'center',
        justifyItems: 'start',
        gap: 8,
        padding: 0,
        margin: 0,
        gridTemplateColumns: ({ hideEllipsis }) => hideEllipsis ? 'max-content max-content' : 'minmax(36px, max-content) max-content',
        cursor: ({ selectable }) => (selectable ? 'pointer' : 'unset'),
        '&:hover .breadcrumb-text': {
            backgroundColor: `${theme.components.breadcrumb.hoverBackground} !important`,
        },
    },
    icon: {
        fontSize: 14,
        color: theme.components.breadcrumb.text,
        height: 12,
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
    },
    crumbLink: {
        display: 'grid',
        '& .simple-link-text': {
            display: 'grid',
        },
    },
    crumbText: {
        width: '100%',
        padding: 8,
        borderRadius: 4,
        boxSizing: 'border-box',
        lineHeight: 1.25,
        color: ({ active, disabled }) => {
            const key = disabled ? 'disabledText' : active ? 'activeText' : 'text';
            return theme.components.breadcrumb[key];
        },
        '& > i': {
            marginRight: 8,
        },
    },
}));
//# sourceMappingURL=Crumb.js.map