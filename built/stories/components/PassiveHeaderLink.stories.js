"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithClickHandler = exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const passive_header_link_1 = __importDefault(require("../../components/passive-header-link"));
const react_router_dom_1 = require("react-router-dom");
const meta = {
    title: 'Components/PassiveHeaderLink',
    component: passive_header_link_1.default,
    decorators: [
        (Story) => (react_1.default.createElement(react_router_dom_1.MemoryRouter, null,
            react_1.default.createElement(Story, null))),
    ],
    argTypes: {
        text: {
            control: { type: 'text' },
            description: 'Link text',
        },
        icon: {
            control: { type: 'text' },
            description: 'Icon name',
        },
        url: {
            control: { type: 'text' },
            description: 'Link URL',
        },
        onClick: { action: 'clicked' },
    },
};
exports.default = meta;
const baseArgs = {
    text: 'Documentation',
    icon: 'book',
    url: '/docs',
};
exports.Default = {
    args: baseArgs,
};
exports.WithClickHandler = {
    args: Object.assign(Object.assign({}, baseArgs), { url: undefined, onClick: () => console.log('Clicked') }),
};
//# sourceMappingURL=PassiveHeaderLink.stories.js.map