"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gallery = exports.Disabled = exports.Active = exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Crumb_1 = __importDefault(require("../../elements/breadcrumbs/Crumb"));
// Since Breadcrumbs container is tightly coupled to global Router state,
// we create stories for the Crumb component which is the visual building block.
const meta = {
    title: 'Elements/Breadcrumbs/Crumb',
    component: Crumb_1.default,
    decorators: [
        (Story) => (react_1.default.createElement(react_router_dom_1.MemoryRouter, null,
            react_1.default.createElement("ul", { style: { listStyle: 'none', display: 'flex', gap: 8, padding: 0 } },
                react_1.default.createElement(Story, null)))),
    ],
    argTypes: {
        name: {
            control: { type: 'text' },
            description: 'Breadcrumb label',
        },
        path: {
            control: { type: 'text' },
            description: 'Navigation path',
        },
        active: {
            control: { type: 'boolean' },
            description: 'Is the current active crumb',
        },
        icon: {
            control: { type: 'text' },
            description: 'Separator icon (e.g. chevron-right)',
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Disabled state',
        },
    },
};
exports.default = meta;
const baseArgs = {
    name: 'Section',
    path: '/section',
    active: false,
    icon: 'chevron-right',
};
exports.Default = {
    args: baseArgs,
};
exports.Active = {
    args: Object.assign(Object.assign({}, baseArgs), { active: true, name: 'Current Page' }),
};
exports.Disabled = {
    args: Object.assign(Object.assign({}, baseArgs), { disabled: true }),
};
exports.Gallery = {
    args: baseArgs,
    render: (args) => (react_1.default.createElement("div", { style: { display: 'grid', gap: '20px' } },
        react_1.default.createElement("div", null,
            react_1.default.createElement("strong", null, "Breadcrumb Sequence:"),
            react_1.default.createElement("ul", { style: { listStyle: 'none', display: 'flex', gap: 8, padding: 0, alignItems: 'center' } },
                react_1.default.createElement(Crumb_1.default, Object.assign({}, args, { name: "Home", path: "/", active: false, icon: "chevron-right" })),
                react_1.default.createElement(Crumb_1.default, Object.assign({}, args, { name: "Section", path: "/section", active: false, icon: "chevron-right" })),
                react_1.default.createElement(Crumb_1.default, Object.assign({}, args, { name: "Subsection", path: "/section/sub", active: false, icon: "chevron-right" })),
                react_1.default.createElement(Crumb_1.default, Object.assign({}, args, { name: "Current Page", path: "/section/sub/page", active: true, icon: "chevron-right" })))))),
};
//# sourceMappingURL=Breadcrumbs.stories.js.map