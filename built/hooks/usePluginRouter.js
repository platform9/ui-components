"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const use_react_router_1 = __importDefault(require("use-react-router"));
// import { SessionState, sessionStoreKey } from 'core/session/sessionReducers'
const helpers_1 = require("../plugins/helpers");
const pluginManager_1 = __importDefault(require("../plugins/pluginManager"));
const route_helpers_1 = require("../plugins/route-helpers");
const usePluginRouter = (initialPlugin, appPlugins) => {
    const plugins = pluginManager_1.default.getPlugins();
    const { location } = (0, use_react_router_1.default)();
    const { pathname, hash } = location;
    // const session = useSelector<RootState, SessionState>(prop(sessionStoreKey))
    // const {
    //   userDetails: { role },
    //   features,
    // } = session
    const pluginId = (0, helpers_1.determineCurrentStack)(location, appPlugins, initialPlugin);
    const currentPath = `${pathname}${hash}`;
    // const sections = getSections(plugins, role, features)
    const sections = (0, helpers_1.getSections)(plugins);
    let currentSection = (0, react_1.useMemo)(() => sections.find((section, idx) => (pluginId === 'default' && section.isDefault) || pluginId === section.id), [pluginId, sections]);
    const currentLink = (0, react_1.useMemo)(() => currentSection.links.find((0, route_helpers_1.matchLinkToPath)(currentPath)), [currentSection, currentPath]);
    const currentOptions = (0, react_1.useMemo)(() => {
        var _a, _b;
        return (_b = (_a = plugins === null || plugins === void 0 ? void 0 : plugins[pluginId]) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.options;
    }, [pluginId, plugins]);
    return {
        plugins,
        currentPluginId: pluginId,
        sections,
        currentSection,
        currentLink,
        location,
        currentOptions,
    };
};
exports.default = usePluginRouter;
//# sourceMappingURL=usePluginRouter.js.map