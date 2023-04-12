"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const styles_1 = require("@material-ui/styles");
const FontAwesomeIcon_1 = __importDefault(require("../../components/FontAwesomeIcon"));
const clsx_1 = __importDefault(require("clsx"));
const tooltip_1 = __importDefault(require("../tooltip"));
const Text_1 = __importDefault(require("../Text"));
const test_helpers_1 = __importDefault(require("../../utils/test-helpers"));
function NavItem({ name, link, icon, className = undefined, open = false, isActive = false, compact = false, tooltip = false, tooltipProps = {}, activeDisplayType = 'background', }) {
    const classes = useStyles({ isActive, compact, activeDisplayType });
    return (react_1.default.createElement(react_router_dom_1.Link, { to: link.path },
        react_1.default.createElement("li", { className: (0, clsx_1.default)(classes.navItem, className) },
            react_1.default.createElement(tooltip_1.default, Object.assign({ message: tooltip ? name : '' }, tooltipProps),
                icon && (react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.navIcon) },
                    react_1.default.createElement(FontAwesomeIcon_1.default, { "data-testid": (0, test_helpers_1.default)(name), className: "nav-icon", title: name, size: "lg" }, icon))),
                open && (react_1.default.createElement(Text_1.default, { className: (0, clsx_1.default)('nav-text', classes.navText), "data-testid": (0, test_helpers_1.default)(name), variant: compact ? 'sidenav' : 'subtitle2' }, name))))));
}
exports.default = NavItem;
const getBackgroundImage = (isActive, displayType) => {
    if (displayType === 'background' && isActive) {
        return 'linear-gradient(to right, rgba(0, 171, 232, 0.5) 0%, rgba(0, 171, 232, 0) 100%)';
    }
    if (displayType === 'bar' && isActive) {
        return 'linear-gradient(rgba(0, 171, 232, 1), rgba(0, 171, 232, 1))';
    }
    return 'unset';
};
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    navItem: {
        transition: 'background .2s ease',
        position: 'relative',
        height: ({ compact }) => (compact ? 40 : 48),
        display: 'grid',
        alignItems: 'center',
        '& .nav-text, & .nav-icon': {
            transition: 'color .2s ease',
        },
        '&:hover .nav-text, &:hover .nav-icon': {
            color: theme.components.sidebar.hoverText,
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            top: 0,
            left: 0,
            right: ({ activeDisplayType }) => (activeDisplayType === 'background' ? 0 : 'unset'),
            width: ({ activeDisplayType }) => (activeDisplayType === 'bar' ? 4 : 'unset'),
            backgroundImage: ({ isActive, activeDisplayType }) => getBackgroundImage(isActive, activeDisplayType),
        },
    },
    navIcon: {
        minWidth: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: ({ isActive }) => { var _a; return (_a = theme.components.sidebar) === null || _a === void 0 ? void 0 : _a[isActive ? 'activeIcon' : 'text']; },
        '& > i': {
            width: '23px',
            height: '18.5px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: ({ isActive }) => { var _a; return (_a = theme.components.sidebar) === null || _a === void 0 ? void 0 : _a[isActive ? 'activeIcon' : 'text']; },
        },
    },
    navText: {
        color: ({ isActive }) => { var _a; return (_a = theme.components.sidebar) === null || _a === void 0 ? void 0 : _a[isActive ? 'activeText' : 'text']; },
    },
}));
//# sourceMappingURL=NavItem.js.map