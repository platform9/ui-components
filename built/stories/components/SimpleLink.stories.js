"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomContent = exports.ErrorVariant = exports.WithIconRight = exports.WithIconLeft = exports.InternalLink = exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const SimpleLink_1 = __importDefault(require("../../components/SimpleLink"));
const react_router_dom_1 = require("react-router-dom");
const meta = {
    title: 'Components/SimpleLink',
    component: SimpleLink_1.default,
    decorators: [
        (Story) => (react_1.default.createElement(react_router_dom_1.MemoryRouter, null,
            react_1.default.createElement(Story, null))),
    ],
    argTypes: {
        src: {
            control: { type: 'text' },
            description: 'Link URL or path',
        },
        icon: {
            control: { type: 'text' },
            description: 'FontAwesome icon name',
        },
        variant: {
            control: { type: 'select' },
            options: ['primary', 'secondary', 'error'],
            description: 'Link color variant',
        },
        textVariant: {
            control: { type: 'select' },
            options: ['body1', 'body2', 'subtitle1', 'subtitle2', 'caption1', 'caption2'],
            description: 'Typography variant',
        },
        textDecoration: {
            control: { type: 'text' },
            description: 'CSS text-decoration on hover',
        },
        iconPosition: {
            control: { type: 'radio' },
            options: ['left', 'right'],
            description: 'Icon position relative to text',
        },
        onClick: { action: 'clicked' },
    },
};
exports.default = meta;
const baseArgs = {
    src: 'https://example.com',
    children: 'Example Link',
    variant: 'primary',
    textVariant: 'body2',
};
exports.Default = {
    args: baseArgs,
};
exports.InternalLink = {
    args: Object.assign(Object.assign({}, baseArgs), { src: '/dashboard', children: 'Go to Dashboard' }),
};
exports.WithIconLeft = {
    args: Object.assign(Object.assign({}, baseArgs), { icon: 'external-link-alt', iconPosition: 'left' }),
};
exports.WithIconRight = {
    args: Object.assign(Object.assign({}, baseArgs), { icon: 'arrow-right', iconPosition: 'right' }),
};
exports.ErrorVariant = {
    args: Object.assign(Object.assign({}, baseArgs), { variant: 'error', children: 'Delete Item', icon: 'trash' }),
};
exports.CustomContent = {
    args: Object.assign(Object.assign({}, baseArgs), { children: react_1.default.createElement("strong", null, "Bold Link") }),
};
//# sourceMappingURL=SimpleLink.stories.js.map