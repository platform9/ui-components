"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderMainContent = exports.getSections = exports.renderRawComponents = exports.renderPluginComponents = exports.renderPlugins = exports.renderPluginRoutes = exports.determineCurrentStack = exports.initData = exports.parseNavItem = void 0;
const react_1 = __importDefault(require("react"));
const ramda_1 = require("ramda");
const react_router_1 = require("react-router");
const fp_1 = require("../utils/fp");
const misc_1 = require("../utils/misc");
const route_1 = require("./route");
const parseNavItem = (basePath) => (navItem) => (Object.assign(Object.assign({}, navItem), { link: Object.assign(Object.assign({}, navItem.link), { path: navItem.link.external ? navItem.link.path : (0, misc_1.pathJoin)(basePath, navItem.link.path), definition: navItem.link.definition ? (0, misc_1.pathJoin)(basePath, navItem.link.definition) : null, defaultPath: navItem.link.defaultPath ? (0, misc_1.pathJoin)(basePath, navItem.link.defaultPath) : null }), nestedLinks: navItem.nestedLinks ? navItem.nestedLinks.map((0, exports.parseNavItem)(basePath)) : null }));
exports.parseNavItem = parseNavItem;
const defaultOptions = {
    showFooter: false,
    showNavMenu: true,
    showSidebar: false,
};
const initData = (frame = null) => ({
    frame,
    components: [],
    routes: [],
    navItems: [],
    secondaryHeader: null,
    options: Object.assign({}, defaultOptions),
});
exports.initData = initData;
exports.determineCurrentStack = (0, misc_1.memoize)((location, appPlugins, lastStack) => {
    const currentRoute = route_1.Route.getCurrentRoute();
    const handleReturn = () => {
        if (lastStack) {
            return lastStack;
        }
        return 'default';
    };
    if (!currentRoute)
        return handleReturn();
    const match = currentRoute.pattern.match(location.pathname);
    if (!match)
        return handleReturn();
    if (appPlugins.includes(match.plugin)) {
        return match.plugin;
    }
    return handleReturn();
});
// TODO
// const handlePluginChange = (newPluginId) => {
//   const pluginToShow = plugins[newPluginId]
//   const defaultRoute = pluginToShow.getDefaultRoute()
//   history.push(defaultRoute)
// }
const renderPluginRoutes = (role) => (id, plugin) => {
    const defaultRoute = plugin.getDefaultRoute();
    const genericRoutes = [
        {
            link: { path: (0, misc_1.pathJoin)(plugin.basePath, '') },
            // TODO: Implement 404 page
            render: () => react_1.default.createElement(react_router_1.Redirect, { to: defaultRoute || '/ui/404' }),
        },
    ];
    const filteredRoutes = plugin
        .getRoutes()
        .filter(({ requiredRoles }) => (0, fp_1.isNilOrEmpty)(requiredRoles) || (0, fp_1.ensureArray)(requiredRoles).includes(role));
    const RouteComponent = plugin.routeComponent || react_router_1.Route;
    return [...filteredRoutes, ...genericRoutes].map((route) => {
        const { component: Component, render, link } = route;
        return (react_1.default.createElement(RouteComponent, { key: link.path, path: link.path, exact: link.exact || false, render: render, component: Component }));
    });
};
exports.renderPluginRoutes = renderPluginRoutes;
exports.renderPlugins = (0, misc_1.memoize)((plugins, role) => (0, ramda_1.toPairs)(plugins)
    .map((0, ramda_1.apply)((0, exports.renderPluginRoutes)(role)))
    .flat());
const renderPluginComponents = (id, plugin) => {
    const pluginComponents = plugin.getComponents();
    return (react_1.default.createElement(react_router_1.Route, { key: plugin.basePath, path: plugin.basePath, exact: false }, pluginComponents.map((PluginComponent, idx) => (react_1.default.createElement(PluginComponent, { key: idx })))));
};
exports.renderPluginComponents = renderPluginComponents;
exports.renderRawComponents = (0, misc_1.memoize)((plugins) => (0, ramda_1.toPairs)(plugins).map((0, ramda_1.apply)(exports.renderPluginComponents)).flat());
exports.getSections = (0, misc_1.memoize)((plugins, role, features) => (0, ramda_1.toPairs)(plugins).map(([id, plugin]) => ({
    id,
    name: plugin.name,
    icon: plugin.icon,
    isDefault: plugin.isDefault,
    links: plugin
        .getNavItems()
        .filter(({ requiredRoles }) => (0, fp_1.isNilOrEmpty)(requiredRoles) || (0, fp_1.ensureArray)(requiredRoles).includes(role))
        .filter(({ requiredFeatures }) => (0, fp_1.isNilOrEmpty)(requiredFeatures) || requiredFeatures(features)),
})));
exports.renderMainContent = (0, misc_1.memoize)((plugins, role) => (react_1.default.createElement(react_1.default.Fragment, null,
    (0, exports.renderRawComponents)(plugins),
    react_1.default.createElement(react_router_1.Switch, null, (0, exports.renderPlugins)(plugins, role)))));
//# sourceMappingURL=helpers.js.map