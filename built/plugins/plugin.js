"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const DefaultFrame_1 = __importDefault(require("../containers/DefaultFrame"));
const route_1 = require("./route");
class Plugin {
    constructor(pluginId, name, basePath, icon, isDefault = false, data = (0, helpers_1.initData)(DefaultFrame_1.default), prependBasePath = (0, helpers_1.parseNavItem)(basePath)) {
        this.pluginId = pluginId;
        this.name = name;
        this.basePath = basePath;
        this.icon = icon;
        this.isDefault = isDefault;
        this.data = data;
        this.prependBasePath = prependBasePath;
    }
    setAsDefault() {
        this.isDefault = true;
    }
    setDefaultRouteComponent(component) {
        this.routeComponent = component;
    }
    clearAll() {
        this.data = (0, helpers_1.initData)();
    }
    registerFrame(component) {
        this.data.frame = component;
    }
    registerComponent(component) {
        this.data.components.push(component);
    }
    registerRoutes(components = []) {
        this.data.routes = [...this.data.routes, ...components.map(this.prependBasePath)];
    }
    registerNavItems(items = []) {
        this.data.navItems = [...this.data.navItems, ...items.map(this.prependBasePath)];
    }
    registerSecondaryHeader(component) {
        this.data.secondaryHeader = component;
    }
    getFrame() {
        return this.data.frame;
    }
    getComponents() {
        return this.data.components;
    }
    getRoutes() {
        return this.data.routes;
    }
    getNavItems() {
        return this.data.navItems;
    }
    getSecondaryHeader() {
        return this.data.secondaryHeader;
    }
    getOptions() {
        return this.data.options;
    }
    getOption(key) {
        return this.data.options[key];
    }
    setOption(key, value) {
        this.data.options[key] = value;
    }
    getDefaultRoute() {
        // TODO once these routes are actual Route instances, we can just return defaultRoute.path()
        const defaultRoute = this.data.routes.find((r) => { var _a; return (_a = r === null || r === void 0 ? void 0 : r.link) === null || _a === void 0 ? void 0 : _a.default; });
        if (!defaultRoute) {
            return '';
        }
        const { defaultParams = {}, path } = defaultRoute.link;
        return (0, route_1.createUrlWithQueryString)(path, defaultParams);
    }
    render() {
        return null;
    }
}
exports.default = Plugin;
//# sourceMappingURL=plugin.js.map