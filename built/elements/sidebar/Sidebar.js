"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const ramda_1 = require("ramda");
const styles_1 = require("@material-ui/styles");
const ListMenu_1 = __importDefault(require("../menu/ListMenu"));
const MenuItem_1 = __importDefault(require("../menu/MenuItem"));
const defaults_1 = require("../menu/defaults");
const fp_1 = require("../../utils/fp");
// import { clientActions, clientStoreKey, ClientState } from 'core/client/clientReducers'
// import { sessionStoreKey, SessionState } from 'core/session/sessionReducers'
const frame_provider_1 = __importDefault(require("../../providers/frame-provider"));
const useToggler_1 = __importDefault(require("../../hooks/useToggler"));
const usePluginRouter_1 = __importDefault(require("../../hooks/usePluginRouter"));
const route_helpers_1 = require("../../plugins/route-helpers");
const Text_1 = __importDefault(require("../Text"));
const tooltip_1 = __importDefault(require("../tooltip"));
const IconButton_1 = __importDefault(require("../button/IconButton"));
const clsx_1 = __importDefault(require("clsx"));
const NavItem_1 = __importDefault(require("./NavItem"));
const NavPane_1 = __importDefault(require("./NavPane"));
const SpinLogo_1 = __importDefault(require("./SpinLogo"));
const test_helpers_1 = __importDefault(require("../../utils/test-helpers"));
const iconProps = {
    solid: true,
};
// TODO setup reducers to be used in the consuming app for session and client
const sidebarState = 'expanded';
const features = {};
const sidebarPane = 'default';
const sidebarPaneRef = react_1.default.createRef();
const Sidebar = ({ setPluginId }) => {
    var _a;
    // const dispatch = useDispatch()
    const [menuOpen, toggleMenuOpen] = (0, useToggler_1.default)(false);
    // const { features = {} } = useSelector(prop<string, SessionState>(sessionStoreKey))
    // const { frame: { sidebarState = 'expanded', sidebarPane = 'default' } = {} } = useSelector(
    //   prop<string, ClientState>(clientStoreKey),
    // )
    const drawerOpen = sidebarState === 'expanded';
    const version = (0, fp_1.pathStrOr)('4', 'releaseVersion', features);
    const { sections, currentSection, currentLink, location, currentOptions } = (0, usePluginRouter_1.default)();
    const { singlePane = false } = currentOptions;
    const classes = useStyles({ drawerOpen, singlePane });
    const { pathname, hash } = location;
    const currentPath = `${pathname}${hash}`;
    const [currentSectionBottomLinks, currentSectionLinks] = (0, react_1.useMemo)(() => (0, ramda_1.partition)((link) => link.isBottomLink, currentSection.links), [currentSection]);
    // const toggleDrawer = useCallback(() => {
    //   dispatch(clientActions.setSidebarState(sidebarState === 'expanded' ? 'collapsed' : 'expanded'))
    // }, [sidebarState])
    const { setFrameContainerRef } = react_1.default.useContext(frame_provider_1.default);
    (0, react_1.useEffect)(() => {
        setFrameContainerRef({
            sidebarPaneContainer: sidebarPaneRef.current,
        });
    }, []);
    const handleChange = (0, react_1.useCallback)((newPluginId) => {
        setPluginId(newPluginId);
        // trackEvent('Changed Application Plugin', {
        //   application: newPluginId,
        // })
        toggleMenuOpen();
    }, [setPluginId]);
    const isPluginSelectorActive = Boolean(menuOpen);
    const menuOffset = (0, react_1.useMemo)(() => ({
        vertical: 8,
        horizontal: drawerOpen ? -(288 / 2) : -(72 / 2),
    }), [drawerOpen]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("aside", { className: (0, clsx_1.default)(classes.customNav, {
                [classes.customNavWidth]: sidebarPane === 'custom',
                [classes.openPane]: sidebarPane === 'custom',
                [classes.hiddenPane]: sidebarPane !== 'custom',
            }) },
            react_1.default.createElement("div", { className: "sidebarPanePortal", ref: sidebarPaneRef })),
        react_1.default.createElement("aside", { className: (0, clsx_1.default)(classes.customNav, classes.nav, {
                [classes.openPane]: sidebarPane === 'default',
                [classes.hiddenPane]: sidebarPane !== 'default',
            }) },
            react_1.default.createElement(ListMenu_1.default, { "data-testid": (0, test_helpers_1.default)('plugin', 'menu'), id: "plugin-menu", list: sections, onClose: toggleMenuOpen, open: isPluginSelectorActive, offset: menuOffset, align: defaults_1.bottomRight.align, origin: "left top", className: classes.pluginMenuContainer, render: (item) => (react_1.default.createElement(MenuItem_1.default, { key: item.id, textVariant: "subtitle2", onClick: () => handleChange(item.id), className: classes.pluginMenuItem, iconProps: iconProps, icon: typeof item.icon === 'string' ? item.icon : undefined },
                    typeof item.icon !== 'string' ? item.icon : null,
                    item.name)), anchor: react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.pluginSelector, { active: isPluginSelectorActive }), onClick: toggleMenuOpen },
                    react_1.default.createElement(SpinLogo_1.default, { active: isPluginSelectorActive }),
                    react_1.default.createElement(Text_1.default, { variant: "subtitle1", className: classes.pluginTitle }, currentSection.name)) }),
            sidebarPane !== 'custom' && (react_1.default.createElement(IconButton_1.default, { "data-testid": (0, test_helpers_1.default)('side', 'bar', 'arrow'), className: classes.toggleCaret, 
                // onClick={toggleDrawer}
                icon: drawerOpen ? 'chevron-left' : 'chevron-right', size: "md", solid: true })),
            react_1.default.createElement(NavPane_1.default, { className: classes.primaryPane, bottomContent: currentSectionBottomLinks.map((bLink, idx) => (react_1.default.createElement(NavItem_1.default, Object.assign({}, bLink, { key: idx, isActive: (0, route_helpers_1.matchesCurrentPath)(currentPath, bLink.link), open: singlePane && drawerOpen, tooltip: true, tooltipProps: { className: classes.navText } })))) }, currentSectionLinks === null || currentSectionLinks === void 0 ? void 0 : currentSectionLinks.map((navItem, idx) => (react_1.default.createElement(NavItem_1.default, Object.assign({}, navItem, { key: idx, isActive: (0, route_helpers_1.matchesCurrentPath)(currentPath, navItem === null || navItem === void 0 ? void 0 : navItem.link), open: singlePane && drawerOpen, tooltip: true, tooltipProps: { className: classes.navText } }))))),
            drawerOpen && !singlePane && (react_1.default.createElement(NavPane_1.default, { className: classes.secondaryPane, title: currentLink === null || currentLink === void 0 ? void 0 : currentLink.name, bottomContent: [
                    react_1.default.createElement("li", { key: version },
                        react_1.default.createElement(tooltip_1.default, { className: classes.navText, message: version, align: defaults_1.topMiddle.align, offset: defaults_1.topMiddle.offset },
                            react_1.default.createElement(Text_1.default, { variant: "body2", component: "h6", className: classes.version },
                                "Version ",
                                version))),
                ] }, (_a = currentLink === null || currentLink === void 0 ? void 0 : currentLink.nestedLinks) === null || _a === void 0 ? void 0 : _a.map((navItem, idx) => {
                const shouldShow = navItem.requiredFeatures
                    ? navItem.requiredFeatures(features)
                    : true;
                if (!shouldShow) {
                    return null;
                }
                return (react_1.default.createElement(NavItem_1.default, Object.assign({}, navItem, { key: idx, className: classes.textOnlyNavItem, isActive: (0, route_helpers_1.matchesCurrentPath)(currentPath, navItem === null || navItem === void 0 ? void 0 : navItem.link), activeDisplayType: "bar", open: true, compact: true })));
            }))))));
};
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    hiddenPane: {
        transform: ({ drawerOpen }) => `translate(-${drawerOpen ? '289' : '73'}px, 0px)`,
    },
    openPane: {
        transform: ({ drawerOpen }) => `translate(0px, 0px)`,
    },
    customNavWidth: {
        '&:after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '100%',
            bottom: 0,
            width: 128,
            backgroundColor: theme.components.sidebar.background,
        },
        '& ~section.content-main': {
            zIndex: 1000,
            padding: '80px 32px',
        },
    },
    customNav: {
        position: 'relative',
        width: ({ drawerOpen }) => (drawerOpen ? 288 : 72),
        zIndex: 100,
        height: '100vh',
        borderRight: `1px solid ${theme.components.sidebar.border}`,
        backgroundColor: theme.components.sidebar.background,
        display: 'grid',
        justifyContent: 'stretch',
        transition: 'width .2s ease',
    },
    nav: {
        gridTemplateRows: 'max-content 1fr',
        gridTemplateColumns: ({ singlePane }) => (singlePane ? '1fr' : '72px 1fr'),
        gridTemplateAreas: ({ singlePane }) => `"nav-header nav-header" "nav-primary-pane ${singlePane ? 'nav-primary-pane' : 'nav-secondary-pane'}"`,
    },
    pluginSelector: {
        display: 'grid',
        gridTemplateColumns: '72px 1fr',
        alignItems: 'center',
        justifyItems: 'stretch',
        height: 64,
        borderBottom: `1px solid ${theme.components.sidebar.border}`,
        cursor: 'pointer',
        '&:hover, &.active': {
            background: theme.components.sidebar.border,
        },
        '& #logoDefault': {
            justifySelf: 'center',
        },
    },
    pluginTitle: {
        color: theme.components.sidebar.activeText,
        textTransform: 'capitalize',
        display: ({ drawerOpen }) => (drawerOpen ? 'unset' : 'none'),
    },
    pluginMenuItem: {
        textTransform: 'capitalize',
        background: theme.components.sidebar.background,
        color: theme.components.sidebar.activeText,
        '&:hover': {
            background: theme.components.sidebar.border,
        },
        '& i': {
            fontSize: 22,
            width: 24,
            height: 24,
            color: theme.components.sidebar.activeText,
        },
    },
    pluginMenuContainer: {
        gridArea: 'nav-header',
        '& .menu-popover': {
            padding: 8,
            backgroundColor: theme.components.sidebar.background,
            borderColor: theme.components.sidebar.border,
        },
    },
    toggleCaret: {
        backgroundColor: theme.palette.grey['000'],
        boxShadow: '0 4px 24px 0 rgba(37, 37, 63, 0.25)',
        position: 'absolute',
        right: 0,
        top: 72,
        width: 24,
        height: 24,
        borderRadius: 24,
        border: 'none',
        transform: 'translate(50%, 0)',
        color: theme.palette.grey[900],
        outline: '0 !important',
        zIndex: 10,
        display: 'grid',
        alignItems: 'center',
        justifyItems: 'center',
        '&:hover': {
            color: theme.palette.grey[900],
            backgroundColor: theme.palette.grey[100],
        },
        '& i': {
            fontSize: 12,
            width: 'auto',
        },
    },
    primaryPane: {
        gridArea: 'nav-primary-pane',
        borderRight: ({ singlePane }) => singlePane ? 'none' : `1px solid ${theme.components.sidebar.border}`,
        '& ul': {
            listStyle: 'none',
            padding: 0,
            margin: 0,
        },
    },
    secondaryPane: {
        gridArea: 'nav-secondary-pane',
        paddingTop: 16,
        gap: 8,
        '& > h6': {
            marginLeft: 16,
        },
    },
    navText: {
        display: 'grid',
        width: '100%',
        gridAutoFlow: 'column',
        gridTemplateColumns: ({ singlePane }) => (singlePane ? '72px 1fr' : '1fr'),
    },
    textOnlyNavItem: {
        paddingLeft: 32,
    },
    version: {
        marginBottom: 14,
        color: theme.components.sidebar.text,
        textAlign: 'center',
    },
}));
exports.default = Sidebar;
//# sourceMappingURL=Sidebar.js.map