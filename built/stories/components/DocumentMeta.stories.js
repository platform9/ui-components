"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreadcrumbsExample = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const DocumentMeta_1 = __importDefault(require("../../components/DocumentMeta"));
const plugin_1 = __importDefault(require("../../plugins/plugin"));
const pluginManager_1 = __importDefault(require("../../plugins/pluginManager"));
const route_1 = require("../../plugins/route");
const meta = {
    title: 'Components/DocumentMeta',
    component: DocumentMeta_1.default,
    argTypes: {
        title: { control: 'text' },
        breadcrumbs: { control: 'boolean' },
    },
};
exports.default = meta;
const baseArgs = {
    title: 'Page Title',
    breadcrumbs: true,
};
// Since DocumentMeta uses a portal that depends on FrameProvider context, 
// and also manages head tags, visualization is limited.
// We primarily test that it renders breadcrumbs if enabled.
const mockRoutes = [
    {
        url: '/my-plugin/page1',
        name: 'Page 1',
        breadcrumbs: new Map([['My Plugin', '/my-plugin'], ['Page 1', '/my-plugin/page1']]),
        link: {
            path: '/my-plugin/page1',
            name: 'Page 1',
            icon: 'my-icon',
        },
        component: () => react_1.default.createElement("div", null),
    },
];
class MockPlugin extends plugin_1.default {
    constructor() {
        super('my-plugin', 'My Plugin', '/my-plugin', 'my-icon', true);
        this.registerRoutes(mockRoutes);
    }
}
const mockPluginInstance = new MockPlugin();
pluginManager_1.default.registerPlugin(mockPluginInstance);
const route = new route_1.Route(mockRoutes[0]);
// @ts-ignore
route_1.Route.currentRoute = route;
const MockFrameProvider = ({ children }) => {
    // We can simulate the context if needed, but for now we just wrap it
    return react_1.default.createElement("div", null, children);
};
exports.BreadcrumbsExample = {
    args: baseArgs,
    render: (args) => (react_1.default.createElement(react_router_dom_1.MemoryRouter, { initialEntries: ['/my-plugin/page1'] },
        react_1.default.createElement(MockFrameProvider, null,
            react_1.default.createElement("div", { style: { border: '1px dashed #ccc', padding: 10 } },
                react_1.default.createElement("strong", null, "Portal Content (Breadcrumbs):"),
                react_1.default.createElement("div", { id: "header-title-container" },
                    react_1.default.createElement(DocumentMeta_1.default, Object.assign({}, args)))),
            react_1.default.createElement("div", { style: { marginTop: 10, fontSize: 12, color: '#666' } }, "Note: This component also updates document.title and meta tags. Check the browser tab title."))))
};
//# sourceMappingURL=DocumentMeta.stories.js.map