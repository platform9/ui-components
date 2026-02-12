"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.External = exports.Disabled = exports.Collapsed = exports.Active = exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const NavItem_1 = __importDefault(require("../../elements/sidebar/NavItem"));
const meta = {
    title: 'Elements/Sidebar/NavItem',
    component: NavItem_1.default,
    decorators: [
        (Story) => (react_1.default.createElement(react_router_dom_1.MemoryRouter, null,
            react_1.default.createElement("div", { style: { width: 250, background: '#222', padding: 10 } },
                react_1.default.createElement("ul", { style: { listStyle: 'none', padding: 0, margin: 0 } },
                    react_1.default.createElement(Story, null))))),
    ],
    argTypes: {
        name: { control: 'text' },
        link: { control: 'object' },
        icon: { control: 'text' },
        isActive: { control: 'boolean' },
        open: { control: 'boolean' },
        compact: { control: 'boolean' },
        disableLink: { control: 'boolean' },
        tooltip: { control: 'boolean' },
    },
};
exports.default = meta;
const baseArgs = {
    name: 'Dashboard',
    link: { path: '/dashboard', onClick: () => { } },
    icon: 'tachometer-alt',
    open: true,
    nestedLinks: null,
};
exports.Default = {
    args: baseArgs,
};
exports.Active = {
    args: Object.assign(Object.assign({}, baseArgs), { isActive: true }),
};
exports.Collapsed = {
    args: Object.assign(Object.assign({}, baseArgs), { open: false }),
    decorators: [
        (Story) => (react_1.default.createElement("div", { style: { width: 72 } },
            react_1.default.createElement(Story, null)))
    ]
};
exports.Disabled = {
    args: Object.assign(Object.assign({}, baseArgs), { disableLink: true }),
};
exports.External = {
    args: Object.assign(Object.assign({}, baseArgs), { name: 'External Link', link: { url: 'https://example.com', external: true, onClick: () => { }, path: '' }, icon: 'external-link-alt' }),
};
//# sourceMappingURL=Sidebar.stories.js.map