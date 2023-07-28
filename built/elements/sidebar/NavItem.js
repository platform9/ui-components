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
const colorHelpers_1 = require("../../utils/colorHelpers");
const ExternalLink_1 = __importDefault(require("../../components/ExternalLink"));
function NavItem({ name, link, icon, className = undefined, open = false, isActive = false, compact = false, tooltip = false, tooltipProps = {}, activeDisplayType = 'background', disableLink = false, }) {
    const classes = useStyles({ isActive, compact, activeDisplayType, disableLink });
    return (link === null || link === void 0 ? void 0 : link.external) ? (react_1.default.createElement(ExternalLink_1.default, { url: link.path, textDecoration: "none", onClick: link.onClick },
        react_1.default.createElement("li", { className: (0, clsx_1.default)(classes.navItem, className) },
            react_1.default.createElement(tooltip_1.default, Object.assign({ message: tooltip ? name : '' }, tooltipProps),
                react_1.default.createElement("div", { className: classes.externalLinkBody },
                    open && (react_1.default.createElement(Text_1.default, { className: (0, clsx_1.default)('nav-text', classes.navText), variant: compact ? 'sidenav' : 'subtitle2' }, name)),
                    react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.navIcon) },
                        react_1.default.createElement(FontAwesomeIcon_1.default, { className: "nav-icon", title: name, size: "lg" }, "arrow-up-right-from-square"))))))) : (react_1.default.createElement(react_router_dom_1.Link, { to: disableLink ? null : link.path },
        react_1.default.createElement("li", { className: (0, clsx_1.default)(classes.navItem, className) },
            react_1.default.createElement(tooltip_1.default, Object.assign({ message: tooltip ? name : '' }, tooltipProps),
                icon && (react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.navIcon) },
                    react_1.default.createElement(FontAwesomeIcon_1.default, { "data-testid": (0, test_helpers_1.default)(name), className: "nav-icon", title: name, size: "lg" }, icon))),
                open && (react_1.default.createElement(Text_1.default, { className: (0, clsx_1.default)('nav-text', classes.navText), "data-testid": (0, test_helpers_1.default)(name), variant: compact ? 'sidenav' : 'subtitle2' }, name))))));
}
exports.default = NavItem;
const getBackgroundImage = (isActive, displayType, sidebarColors) => {
    if (displayType === 'background' && isActive) {
        return `linear-gradient(to right, ${(0, colorHelpers_1.hexToRgbaCss)(sidebarColors.activeBackground, 0.5)} 0%, ${(0, colorHelpers_1.hexToRgbaCss)(sidebarColors.activeBackground, 0)} 100%)`;
    }
    if (displayType === 'bar' && isActive) {
        return `linear-gradient(${sidebarColors.activeBackground}, ${sidebarColors.activeBackground})`;
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
            color: ({ disableLink }) => disableLink ? theme.components.sidebar.disabledText : theme.components.sidebar.hoverText,
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            bottom: ({ activeDisplayType }) => (activeDisplayType === 'bar' ? 'unset' : 0),
            top: ({ activeDisplayType }) => (activeDisplayType === 'bar' ? '50%' : 0),
            left: 0,
            right: ({ activeDisplayType }) => (activeDisplayType === 'background' ? 0 : 'unset'),
            width: ({ activeDisplayType }) => (activeDisplayType === 'bar' ? 3 : 'unset'),
            height: ({ activeDisplayType }) => (activeDisplayType === 'bar' ? 24 : 'unset'),
            transform: ({ activeDisplayType }) => activeDisplayType === 'bar' ? 'translate(0px, -50%)' : 'unset',
            backgroundImage: ({ isActive, activeDisplayType }) => getBackgroundImage(isActive, activeDisplayType, theme.components.sidebar),
        },
        '&:after': {
            content: ({ activeDisplayType }) => (activeDisplayType === 'bar' ? '""' : ''),
            position: 'absolute',
            bottom: 0,
            top: 0,
            left: 0,
            width: 1,
            backgroundColor: theme.components.sidebar.border,
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
        color: ({ isActive, disableLink }) => { var _a; return (_a = theme.components.sidebar) === null || _a === void 0 ? void 0 : _a[isActive ? 'activeText' : disableLink ? 'disabledText' : 'text']; },
    },
    externalLinkBody: {
        display: 'flex',
        gap: theme.spacing(1),
        alignItems: 'baseline',
    },
}));
//# sourceMappingURL=NavItem.js.map